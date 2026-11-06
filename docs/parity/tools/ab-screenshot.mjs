#!/usr/bin/env node
/**
 * Gate A visual A/B: open the same paths on baseline vs parity, screenshot, pixel-diff.
 *
 * Env:
 *   BASE81 / BASE83  (default http://192.168.2.131:30881 / :30883)
 *   KS_TEST_USERNAME / KS_TEST_PASSWORD  (from ~/.bashrc)
 *   AB_PATHS  comma-separated paths (optional)
 *   AB_OUT    output dir (default ../gate-a-evidence/screenshots-ab/tooling)
 *   AB_MAX_DIFF_RATIO  fail threshold 0-1 (default 0.02)
 */
import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outRoot =
  process.env.AB_OUT ||
  path.join(__dirname, '../gate-a-evidence/screenshots-ab/tooling')
const base81 = process.env.BASE81 || 'http://192.168.2.131:30881'
const base83 = process.env.BASE83 || 'http://192.168.2.131:30883'
const maxDiffRatio = Number(process.env.AB_MAX_DIFF_RATIO || '0.02')
const user = process.env.KS_TEST_USERNAME
const pass = process.env.KS_TEST_PASSWORD

// Prefer workspace-prefixed project routes. Bare /clusters/host/projects/...
// list URLs currently 404 on both 30881 and 30883 (identical empty shells),
// which falsely passes pixel A/B.
const DEFAULT_PATHS = [
  '/dev-workspace/clusters/host/projects/dev-wms/deployments',
  '/dev-workspace/clusters/host/projects/dev-wms/pods',
  '/dev-workspace/clusters/host/projects/dev-wms/configmaps',
  '/dev-workspace/clusters/host/projects/dev-wms/secrets',
  '/dev-workspace/clusters/host/projects/dev-wms/services',
  '/dev-workspace/clusters/host/projects/dev-wms/composing',
  '/extensions/management',
  '/extensions/marketplace',
]

const paths = (process.env.AB_PATHS || DEFAULT_PATHS.join(','))
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

function writeNetscapeCookies(jarPath, tokenJson, host = '192.168.2.131') {
  const expire = Date.now() + Number(tokenJson.expires_in || 7200) * 1000
  const line = (n, v) =>
    [host, 'FALSE', '/', 'FALSE', Math.floor(expire / 1000) + 3600, n, v].join(
      '\t'
    )
  fs.writeFileSync(
    jarPath,
    [
      '# Netscape HTTP Cookie File',
      line('token', tokenJson.access_token),
      line('refreshToken', tokenJson.refresh_token || ''),
      line('expire', String(expire)),
      line('lang', 'zh'),
    ].join('\n') + '\n'
  )
}

function parseNetscape(file) {
  return fs
    .readFileSync(file, 'utf8')
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith('#'))
    .map((line) => {
      const p = line.split('\t')
      if (p.length < 7) return null
      return {
        name: p[5],
        value: p[6],
        domain: p[0],
        path: p[2],
        expires: Number(p[4]) || undefined,
        httpOnly: false,
        secure: false,
      }
    })
    .filter(Boolean)
}

async function fetchToken(base) {
  const body = new URLSearchParams({
    grant_type: 'password',
    username: user,
    password: pass,
    client_id: 'kubesphere',
    client_secret: 'kubesphere',
  })
  const res = await fetch(`${base}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  const json = await res.json()
  if (!json.access_token) throw new Error(`oauth failed for ${base}`)
  return json
}

function diffPng(aPath, bPath, diffPath) {
  const a = PNG.sync.read(fs.readFileSync(aPath))
  const b = PNG.sync.read(fs.readFileSync(bPath))
  const w = Math.min(a.width, b.width)
  const h = Math.min(a.height, b.height)
  if (a.width !== b.width || a.height !== b.height) {
    // crop to common box
  }
  const diff = new PNG({ width: w, height: h })
  const clip = (img) => {
    if (img.width === w && img.height === h) return img.data
    const out = Buffer.alloc(w * h * 4)
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const si = (y * img.width + x) * 4
        const di = (y * w + x) * 4
        out[di] = img.data[si]
        out[di + 1] = img.data[si + 1]
        out[di + 2] = img.data[si + 2]
        out[di + 3] = img.data[si + 3]
      }
    }
    return out
  }
  const mismatched = pixelmatch(clip(a), clip(b), diff.data, w, h, {
    threshold: 0.1,
  })
  fs.writeFileSync(diffPath, PNG.sync.write(diff))
  return { mismatched, total: w * h, ratio: mismatched / (w * h) }
}

async function shotSide(browser, base, cookies, label, routePaths) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  })
  await context.addCookies(cookies)
  const page = await context.newPage()
  const files = {}
  for (const p of routePaths) {
    const safe = p.replace(/\//g, '_').replace(/^_/, '') || 'root'
    const file = path.join(outRoot, `${label}__${safe}.png`)
    await page.goto(base + p, { waitUntil: 'domcontentloaded', timeout: 60000 })
    const settleMs = Number(process.env.AB_SETTLE_MS || '3500')
    await page.waitForTimeout(settleMs)
    await page.screenshot({ path: file, fullPage: false })
    files[p] = file
  }
  await context.close()
  return files
}

if (!user || !pass) {
  console.error('KS_TEST_USERNAME / KS_TEST_PASSWORD required')
  process.exit(2)
}

fs.mkdirSync(outRoot, { recursive: true })
const tok81 = await fetchToken(base81)
const tok83 = await fetchToken(base83)
writeNetscapeCookies('/tmp/ks-cookies-base.txt', tok81)
writeNetscapeCookies('/tmp/ks-cookies-exp.txt', tok83)

const browser = await chromium.launch({ headless: true })
const files81 = await shotSide(
  browser,
  base81,
  parseNetscape('/tmp/ks-cookies-base.txt'),
  '30881',
  paths
)
const files83 = await shotSide(
  browser,
  base83,
  parseNetscape('/tmp/ks-cookies-exp.txt'),
  '30883',
  paths
)
await browser.close()

const compare = []
for (const p of paths) {
  const a = files81[p]
  const b = files83[p]
  const safe = p.replace(/\//g, '_').replace(/^_/, '') || 'root'
  const diffPath = path.join(outRoot, `diff__${safe}.png`)
  const d = diffPng(a, b, diffPath)
  compare.push({
    path: p,
    ...d,
    pass: d.ratio <= maxDiffRatio,
    files: { baseline: a, parity: b, diff: diffPath },
  })
}

const report = {
  tool: 'ab-screenshot',
  base81,
  base83,
  maxDiffRatio,
  pass: compare.every((c) => c.pass),
  compare,
  generatedAt: new Date().toISOString(),
}
fs.writeFileSync(
  path.join(outRoot, 'ab-screenshot-report.json'),
  JSON.stringify(report, null, 2)
)
console.log(
  JSON.stringify(
    {
      pass: report.pass,
      failed: compare.filter((c) => !c.pass).map((c) => ({ path: c.path, ratio: c.ratio })),
      out: outRoot,
    },
    null,
    2
  )
)
process.exit(report.pass ? 0 : 1)
