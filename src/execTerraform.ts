import { spawnSync } from 'child_process'
import path from 'path'
import { LogInterface } from './main'

export const execTerraform = (processCwd: string, componentPath: string, workspace: string | undefined, apply: boolean, log: LogInterface): boolean => {
    log.info(`processCwd -> ${processCwd}`)
    process.chdir(path.join(processCwd, componentPath));

    log.info('terraform init')
    if (!spawnSyncTerraform(['init'], log)) {
        log.error('init failed in: ' + componentPath)
        return false
    }

    if (workspace !== undefined) {
        log.info('terraform workspace select ' + workspace)
        if (!spawnSyncTerraform(['workspace', 'select', workspace], log)) {
            log.error('workspace ' + workspace + ' failed in: ' + componentPath)
            return false
        }
    }

    log.info('terraform validate')
    if (!spawnSyncTerraform(['validate'], log)) {
        log.error('validate failed in: ' + componentPath)
        return false
    }

    log.info('terraform plan')
    if (!spawnSyncTerraform(['plan', '-out=plan'], log)) {
        log.error('plan failed in: ' + componentPath)
        return false
    }

    if (apply === true) {
        log.info('terraform apply')
        if (!spawnSyncTerraform(['apply', 'plan'], log)) {
            log.error('apply failed in: ' + componentPath)
            return false
        }
    }

    return true
}

const spawnSyncTerraform = (options: Array<string>, log: LogInterface): boolean => {
    const run = spawnSync('terraform', options)
    log.info(run.output[1].toString())
    log.info(run.output[2].toString())
    if (run.status !== 0) {
        return false
    }
    return true
}
