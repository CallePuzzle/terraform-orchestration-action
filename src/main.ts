import { getGitModifiedDirectories } from './getGitModifiedDirectories'
import { getDirectoriesToRun } from './getDirectories'
import { checkMainGitPath } from './checkMainGitPath'
import { execTerraform } from './execTerraform'
import { workspaceOperation } from './workspaceCreation'

interface Input {
    workingDirectory: string
    baseRef: string
    headRef: string
    excludeDirectories: Array<string>
    commonModules: Array<string>
    workspace: string | undefined
    apply: boolean
    tfeToken: string | undefined
    organizationName: string | undefined
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
    log.info(`Exclude directories: ${input.excludeDirectories}`)
    log.info(`Common modules: ${input.commonModules}`)
    log.info(`Workspace: ${input.workspace}`)
    log.info(`Apply: ${input.apply}`)
    if (input.organizationName) {
      log.info(`Terraform Enterprise Organization Name: ${input.organizationName}`)
    }
    const processCwd = process.cwd()
    log.info(`${processCwd}`)
    checkMainGitPath(log).then(() => {
        getGitModifiedDirectories(input.workingDirectory, input.baseRef, input.headRef, input.excludeDirectories, log)
            .then(components => {
                const componentsToRun = getDirectoriesToRun(components, input.workingDirectory, input.commonModules, input.excludeDirectories, log)
                componentsToRun.map(componentPath => {
                  log.info(componentPath)
                  workspaceOperation(componentPath, input.organizationName, input.tfeToken, log);
                  execTerraform(processCwd, componentPath, input.workspace, input.apply, log);
                })
            })
    }).catch(e => {
        log.error(e.message)
        throw e
    })
}
