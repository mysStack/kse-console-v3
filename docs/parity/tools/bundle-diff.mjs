#!/usr/bin/env node
/**
 * Wrapper around webpack-bundle-diff (Webpack 4 → package 0.7.x).
 * Usage: node bundle-diff.mjs <old-stats.json> <new-stats.json> [outDir]
 *
 * Produce stats with:
 *   STATS=1 ANALYZE=1 yarn build:client
 * → dist/webpack-stats.json (+ webpack-bundle-report.html)
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const wbd = require('webpack-bundle-diff')

const oldStatsPath = process.argv[2]
const newStatsPath = process.argv[3]
const outDir =
  process.argv[4] || path.join(__dirname, '../gate-a-evidence/bundle-diff')

if (!oldStatsPath || !newStatsPath) {
  console.error(
    'Usage: node bundle-diff.mjs <old-stats.json> <new-stats.json> [outDir]'
  )
  process.exit(2)
}

const oldStats = JSON.parse(fs.readFileSync(oldStatsPath, 'utf8'))
const newStats = JSON.parse(fs.readFileSync(newStatsPath, 'utf8'))

// API differs slightly across 0.7.x; support common shapes
let diff
if (typeof wbd.diff === 'function') {
  diff = wbd.diff(oldStats, newStats)
} else if (typeof wbd.default?.diff === 'function') {
  diff = wbd.default.diff(oldStats, newStats)
} else {
  // fallback: derive named chunk group sizes
  const sizes = (stats) => {
    const assets = stats.assets || []
    return {
      totalBytes: assets.reduce((s, a) => s + (a.size || 0), 0),
      assetCount: assets.length,
      assets: assets.map((a) => ({ name: a.name, size: a.size })),
    }
  }
  diff = { mode: 'fallback-asset-sum', old: sizes(oldStats), neu: sizes(newStats) }
}

let reportMd = ''
if (typeof wbd.generateReport === 'function') {
  reportMd = wbd.generateReport(diff)
} else if (typeof wbd.report === 'function') {
  reportMd = wbd.report(diff)
} else {
  reportMd = `# Bundle diff\n\n\`\`\`json\n${JSON.stringify(diff, null, 2).slice(0, 20000)}\n\`\`\`\n`
}

fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'diff.json'), JSON.stringify(diff, null, 2))
fs.writeFileSync(path.join(outDir, 'report.md'), reportMd)
console.log(
  JSON.stringify(
    { outDir, files: ['diff.json', 'report.md'], hint: 'from webpack-stats.json' },
    null,
    2
  )
)
