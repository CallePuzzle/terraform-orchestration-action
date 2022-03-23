import * as fs from 'fs'
import path from 'path'
import { difference, compact, uniq } from 'lodash'
import { LogInterface } from './main'

export const getDirectories = (source: string): Array<string> =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter((dirent: fs.Dirent) => dirent.isDirectory())
        .map((dirent: fs.Dirent) => path.join(source, dirent.name))

export const getDirectoriesToRun = (paths: Array<string>, workingDirectory: string, commonModules: Array<string>, excludeDirectories: Array<string>, log: LogInterface): Array<any> => {
    let ret = Array<string>()
    for (const path of paths) {
        const isCommonModule = commonModules.filter(commonModule => {
            const re = new RegExp('^' + commonModule)
            return path.match(re)
        })
        if (isCommonModule) {
            log.info('Common modules has been modified, searching for all componentes...')
            const allComponents = difference(getDirectories(workingDirectory), commonModules, excludeDirectories)
            
            for (const component of allComponents) {
                ret.push(component)
            }
        break
        } else {
            ret.push(path)
        }
    }
    ret = difference(uniq(compact(ret)), ['.git'])
    log.info(`Components: ${ret}`)
    return ret
}
