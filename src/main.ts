import { getGitModifiedDirectories } from './getGitModifiedDirectories'
import { checkMainGitPath } from './checkMainGitPath'
import {execTerraform} from "./execTerraform"

interface Input {
    workingDirectory: string
    baseRef: string
    headRef: string
    excludeDirectories: string[]
    workspace: string | undefined
    apply: boolean
}

export interface LogInterface {
    info: (message: string) => void
    error: (message: string) => void
}

export const main = (input: Input, log: LogInterface): void => {
    log.info('Running...')
    log.info(`Working directory: ${input.workingDirectory}`)
    log.info(`Base ref: ${input.baseRef}`)
    log.info(`Head ref: ${input.headRef}`)
    log.info(`Workspace: ${input.workspace}`)
    log.info(`Apply: ${input.apply}`)
    const processCwd = process.cwd()
    checkMainGitPath(log).then(() => {
        getGitModifiedDirectories(input.workingDirectory, input.baseRef, input.headRef, input.excludeDirectories, log)
            .then(r => {
                r.map(componentPath => {
                    execTerraform(processCwd, componentPath, input.workspace, input.apply, log)
                })
            })
    }).catch(e => {
        log.error(e.message)
        throw e
    })
}
