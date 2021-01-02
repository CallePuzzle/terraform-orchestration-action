import * as core from '@actions/core'
import { getGitModifiedDirectories } from './getGitModifiedDirectories'
import { spawn } from 'child_process'
import { checkMainGitPath } from './checkMainGitPath'
import path from 'path'

export const main = (): void => {
    const base = path.join('__tests__', 'tf_project', '/')
    const currentPath = process.cwd()
    checkMainGitPath().then(() => {
        getGitModifiedDirectories(base, '86e35d7e707289588dcf6f825be3e7c3e854cf58', '009ec5a0e9196b668d926916eaeb6f778694074f')
            .then(r => {
                r.map(component => {
                    process.chdir(path.join(currentPath, component));
                    spawn('terraform', ['plan']).stdout.on('data', data => {
                        core.info(`stdout: ${data}`);
                    })
                })
            })
    }).catch(e => {
        core.error(e)
        throw e
    })
}

try {
    main()
} catch (error) {
    core.setFailed(error)
}
