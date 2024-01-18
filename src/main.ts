import { getGitModifiedDirectories } from './getGitModifiedDirectories'
import { getDirectoriesToRun } from './getDirectories'
import { checkMainGitPath } from './checkMainGitPath'
import {execTerraform} from "./execTerraform"
import {execTerragrunt} from "./execTerragrunt"

interface Input {
    workingDirectory: string
    baseRef: string
    headRef: string
    excludeDirectories: Array<string>
    commonModules: Array<string>
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
    log.info(`Exclude directories: ${input.excludeDirectories}`)
    log.info(`Common modules: ${input.commonModules}`)
    log.info(`Workspace: ${input.workspace}`)
    log.info(`Apply: ${input.apply}`)
    const processCwd = process.cwd()
    checkMainGitPath(log).then(() => {
        getGitModifiedDirectories(input.workingDirectory, input.baseRef, input.headRef, input.excludeDirectories, log)
            .then(components => {
              // what is inside components?
              log.info(`**** components -> ${components.join(', ')}`)
              const runAll = components.some(componentPath => {
                // check if root path was update
                return componentPath.includes(input.commonModules);
            });

            if (runAll) {
              log.info("Running for all modules using Terragrunt . . . .");
              components.map(componentPath => {
                  execTerragrunt(processCwd, componentPath, input.workspace, input.apply, log);
              });
            } else {
              log.info("Using Terraform for modules");
              components.map(componentPath => {
                  execTerraform(processCwd, componentPath, input.workspace, input.apply, log);
              });
            }
            })
    }).catch(e => {
        log.error(e.message)
        throw e
    })
}
