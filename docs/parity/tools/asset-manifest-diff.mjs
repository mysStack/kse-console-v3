#!/usr/bin/env node
/**
 * Diff two v3dist directories (sealed vs rebuild) without source maps.
 * Usage: node asset-manifest-diff.mjs <oldDir> <newDir> [outJson]
 */
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function walk(root) {
  const out = {}
  const stack = ['']
  while (stack.length) {
    const rel = stack.pop()
    const abs = path.join(root, rel)
    for (const name of fs.readdirSync(abs)) {
      if (name === '.' || name === '..') continue
      const r = rel ? `${rel}/${name}` : name
      const p = path.join(root, r)
      const st = fs.statSync(p)
      if (st.isDirectory()) stack.push(r)
      else {
        const buf = fs.readFileSync(p)
        out[r.replace(/\\/g, '/')] = {
          size: st.size,
          sha256: crypto.createHash('sha256').update(buf).digest('hex').slice(0, 16),
        }
      }
    }
  }
  return out
}

function loadManifest(dir) {
  const p = path.join(dir, 'manifest.json')
  if (!fs.existsSync(p)) return null
  return JSON.parse(fs.readFileSync(p, 'utf8'))
}

const oldDir = process.argv[2]
const newDir = process.argv[3]
const outJson =
  process.argv[4] ||
  path.join(__dirname, '../gate-a-evidence/asset-manifest-diff.json')

if (!oldDir || !newDir) {
  console.error('Usage: node asset-manifest-diff.mjs <oldDir> <newDir> [outJson]')
  process.exit(2)
}

const oldFiles = walk(oldDir)
const newFiles = walk(newDir)
const oldKeys = new Set(Object.keys(oldFiles))
const newKeys = new Set(Object.keys(newFiles))
const onlyOld = [...oldKeys].filter((k) => !newKeys.has(k)).sort()
const onlyNew = [...newKeys].filter((k) => !oldKeys.has(k)).sort()
const common = [...oldKeys].filter((k) => newKeys.has(k)).sort()
const sizeChanged = common
  .filter((k) => oldFiles[k].size !== newFiles[k].size)
  .map((k) => ({
    file: k,
    old: oldFiles[k].size,
    neu: newFiles[k].size,
    delta: newFiles[k].size - oldFiles[k].size,
  }))
  .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))

const oldMan = loadManifest(oldDir) || {}
const newMan = loadManifest(newDir) || {}
const oldAliases = Object.keys(oldMan).filter(
  (k) => k !== 'entrypoints' && !String(k).startsWith('/assets/')
)
const newAliases = Object.keys(newMan).filter(
  (k) => k !== 'entrypoints' && !String(k).startsWith('/assets/')
)
const aliasOnlyOld = oldAliases.filter((k) => !newAliases.includes(k)).sort()
const aliasOnlyNew = newAliases.filter((k) => !oldAliases.includes(k)).sort()

const report = {
  tool: 'asset-manifest-diff',
  oldDir,
  newDir,
  counts: {
    oldFiles: oldKeys.size,
    newFiles: newKeys.size,
    onlyOld: onlyOld.length,
    onlyNew: onlyNew.length,
    sizeChanged: sizeChanged.length,
    oldAliases: oldAliases.length,
    newAliases: newAliases.length,
  },
  onlyOld: onlyOld.slice(0, 80),
  onlyNew: onlyNew.slice(0, 80),
  sizeChangedTop: sizeChanged.slice(0, 40),
  aliasOnlyOld: aliasOnlyOld.slice(0, 80),
  aliasOnlyNew: aliasOnlyNew.slice(0, 80),
  note: 'Hash/filename drift expected; Gate A cares about alias/behavior, not identical SHA.',
  generatedAt: new Date().toISOString(),
}

fs.mkdirSync(path.dirname(outJson), { recursive: true })
fs.writeFileSync(outJson, JSON.stringify(report, null, 2))
console.log(JSON.stringify({ out: outJson, counts: report.counts }, null, 2))
