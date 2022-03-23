import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git'
import path from 'path'
import { LogInterface } from './main'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getGitModifiedDirectories = async (basepath: string, base_ref: string, head_ref: string, exclude_directories: Array<string>, log: LogInterface): Promise<Array<any>> => {
    const re_include = new RegExp('^' + basepath)
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
                    if (file.match(re_include)) {
                        let ret = path.dirname(file)
                        for (const exclude_directory of exclude_directories) {
                            if (exclude_directory === 'root_path' && ret === '.') {
                                return undefined
                            }
                            let re_exclude = new RegExp('^' + exclude_directory)
                            if (ret.match(re_exclude)) {
                                return undefined
                            }
                        }
                        return ret
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
