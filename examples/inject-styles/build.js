import { injectLayoutStyles } from '@openlab/alembic'
import fs from 'fs/promises'

async function main() {
  const inputPath = new URL('../openlab-website/index.html', import.meta.url)
  const inputFile = await fs.readFile(inputPath, 'utf8')

  console.log(injectLayoutStyles(inputFile))
}

main().catch((error) => {
  console.error('Fatal error')
  console.error(error)
  process.exit(1)
})
