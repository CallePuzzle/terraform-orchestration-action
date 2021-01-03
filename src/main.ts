import * as core from '@actions/core'
import { getGitModifiedDirectories } from './getGitModifiedDirectories'
import { checkMainGitPath } from './checkMainGitPath'
import {runTerraform} from "./runTerraform"
import path from 'path'

interface Input {
    workingDirectory: string
    baseRef: string
    headRef: string
}

export const main = (input: Input): void => {
    const processCwd = process.cwd()
    checkMainGitPath().then(() => {
        getGitModifiedDirectories(input.workingDirectory, input.baseRef, input.headRef)
            .then(r => {
                r.map(componentPath => {
                    runTerraform(processCwd, componentPath)
                })
            })
    }).catch(e => {
        core.error(e)
        throw e
    })
}

try {
    main({
        workingDirectory: path.join('__tests__', 'tf_project', '/'), //core.getInput('workingDirectory'),
        baseRef: '86e35d7e707289588dcf6f825be3e7c3e854cf58', //core.getInput('baseRef'),
        headRef: '009ec5a0e9196b668d926916eaeb6f778694074f', //core.getInput('headRef')
    })
} catch (error) {
    core.setFailed(error)
}
