import { copyFile, readFile, writeFile } from 'node:fs/promises'

const sourceDeclaration = new URL('../dist/index.d.ts', import.meta.url)
const sourceMap = new URL('../dist/index.d.ts.map', import.meta.url)
const esmDeclaration = new URL('../dist/index.d.mts', import.meta.url)
const esmMap = new URL('../dist/index.d.mts.map', import.meta.url)

const declaration = await readFile(sourceDeclaration, 'utf8')

await writeFile(
    esmDeclaration,
    declaration.replace('//# sourceMappingURL=index.d.ts.map', '//# sourceMappingURL=index.d.mts.map')
)
await copyFile(sourceMap, esmMap)
