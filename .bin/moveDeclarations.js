const { join, basename } = require('path')
const { copyFileSync, unlinkSync, readdirSync, rmSync, mkdirSync } = require('fs')

function getDeclarations (directory) {
    return readdirSync(directory, { withFileTypes: true })
        .filter(entry => entry.isDirectory() || (entry.isFile() && `${entry.name}`.toLowerCase().endsWith('.d.ts')))
        .map(entry => {
            if (entry.isDirectory()) {
                return getDeclarations(join(directory, entry.name))
            }
            return `${directory}/${entry.name}`
        }).reduce((prev, current) => {
            if (Array.isArray(current)) {
                return [...prev, ...current]
            }
            return [...prev, current]
        }, [])
}

const target = join(process.cwd(), 'dist', 'types')

try {
    rmSync(target, { force: true, recursive: true })
} catch {}

try {
    mkdirSync(target, { force: true, recursive: true })
} catch {}

for (const entry of getDeclarations(join(process.cwd(), 'src'))) {
    copyFileSync(entry, join(target, basename(entry)))
    unlinkSync(entry)
}

process.exit(0)
