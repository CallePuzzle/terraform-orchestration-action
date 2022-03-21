import simpleGit, { SimpleGit } from 'simple-git'
import * as fs from 'fs'
import { LogInterface } from './main'

export const checkMainGitPath = async (log: LogInterface): Promise<boolean> => {
    try {
        const git: SimpleGit = simpleGit()
        return await git.log().then(() => {
            if (fs.statSync('.git').isDirectory()) {
                log.info('Git path is correct')
                return true
            } else {
                log.error('Git path is incorrect')
                return false
            }
        }).catch(e => {
            log.error(e.message)
            throw e
        })
    } catch (e:any) {
        log.error(e.message)
        throw e
    }
}
