import * as fs from 'fs'

export const getDirectories = (source: string) =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter((dirent: fs.Dirent) => dirent.isDirectory())
        .map((dirent: fs.Dirent) => dirent.name);
