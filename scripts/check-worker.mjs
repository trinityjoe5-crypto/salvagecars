import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'

if (!existsSync('.open-next/worker.js')) {
  throw new Error('Missing .open-next/worker.js. Run npm run build:cloudflare first.')
}
const result = spawnSync('npx', ['--no-install', 'wrangler', 'deploy', '--dry-run'], {
  encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' }, maxBuffer: 20 * 1024 * 1024,
})
const output = `${result.stdout || ''}\n${result.stderr || ''}`
process.stdout.write(output)
if (result.error) throw result.error
if (result.status !== 0) process.exit(result.status || 1)
const size = output.match(/gzip:\s*([\d.]+)\s*KiB/i)
if (!size) throw new Error('Wrangler did not report compressed size; Free plan compatibility is unverified.')
if (Number(size[1]) > 3072) throw new Error(`Worker is ${size[1]} KiB compressed; Workers Free allows 3072 KiB.`)
console.log(`Worker fits the 3 MiB Free plan size limit: ${size[1]} KiB. Live CPU and request limits still need testing.`)
