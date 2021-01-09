import * as fs from 'fs'
import path from 'path'

export const getDirectories = (source: string): Array<string> =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter((dirent: fs.Dirent) => dirent.isDirectory())
        .map((dirent: fs.Dirent) => path.join(source, dirent.name))
