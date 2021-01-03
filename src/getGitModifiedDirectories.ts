import * as core from '@actions/core'
import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git'
import path from 'path'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getGitModifiedDirectories = async (basepath: string, base_ref: string, head_ref: string): Promise<Array<any>> => {
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
                return r.split('\n').map(file => {
                    if (file.match(re)) {
                        return path.dirname(file)
                    }
                }).filter((file, index, self) => {
                    // no undefined + unique();
                    return file !== undefined && self.indexOf(file) === index
                })
            })
            .catch(e => {
                core.error(e)
                return []
            })
    } catch (e) {
        core.error(e)
        return []
    }
}
