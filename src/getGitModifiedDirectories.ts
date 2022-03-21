import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git'
import path from 'path'
import { LogInterface } from './main'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getGitModifiedDirectories = async (basepath: string, base_ref: string, head_ref: string, log: LogInterface): Promise<Array<any>> => {
    const re = new RegExp('^' + basepath)
    const options: SimpleGitOptions = {
        baseDir: basepath,
        binary: 'git',
        maxConcurrentProcesses: 1
    }
    try {
        const git: SimpleGit = simpleGit(options)
        return await git.diff(['--name-only', base_ref, head_ref])
            .then(r => {
                const ret = r.split('\n').map(file => {
                    if (file.match(re)) {
                        return path.dirname(file)
                    }
                }).filter((file, index, self) => {
                    // no undefined + unique();
                    return file !== undefined && self.indexOf(file) === index
                })
                log.info('Modified directories: ' + JSON.stringify(ret))
                return ret
            })
            .catch(e => {
                log.error(e)
                return []
            })
    } catch (e:any) {
        log.error(e.message)
        return []
    }
}
