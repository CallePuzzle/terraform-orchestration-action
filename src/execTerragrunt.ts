import { spawnSync, SpawnSyncReturns } from 'child_process';
import path from 'path';
import { LogInterface } from './main';

export const execTerragrunt = (processCwd: string, workspace: string | undefined, apply: boolean, log: LogInterface): boolean => {
    process.chdir(path.join(processCwd)); 

    log.info('terragrunt run-all init')
        if (!spawnSyncTerragrunt(['run-all','init'], log)) {
        log.error('init failed')
        return false
    }

    log.info('terragrunt run-all validate')
    if (!spawnSyncTerragrunt(['run-all', 'validate'], log)) {
        log.error('validate failed')
        return false
    }

    log.info('terragrunt run-all plan')
    if (!spawnSyncTerragrunt(['run-all','plan', '-out=plan'], log)) {
        log.error('plan failed')
        return false
    }

    if (apply === true) {
        log.info('terragrunt run-all apply')
        if (!spawnSyncTerragrunt(['run-all','apply', 'plan'], log)) {
            log.error('apply failed')
            return false
        }
    }

    return true
}

const spawnSyncTerragrunt = (options: Array<string>, log: LogInterface): boolean => {
    const run = spawnSync('terragrunt', options)    
    log.info(run.output[1].toString())
    log.info(run.output[2].toString())
    if (run.status !== 0) {
        const stderr: string = run.stderr;
        console.log('Salida de error:', stderr.toString());
        return false
    }
    return true
}
