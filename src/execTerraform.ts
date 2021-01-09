import * as core from '@actions/core'
import { spawnSync } from 'child_process'
import path from 'path'

export const execTerraform = (processCwd: string, componentPath: string, workspace: string | undefined, apply: boolean): boolean => {
    process.chdir(path.join(processCwd, componentPath));

    if (!spawnSyncTerraform(['init'])) {
        core.error('init failed in: ' + componentPath)
        return false
    }

    if (workspace !== undefined)
        if (!spawnSyncTerraform(['workspace', 'select', workspace])) {
            core.error('workspace ' + workspace + ' failed in: ' + componentPath)
            return false
        }

    if (!spawnSyncTerraform(['validate'])) {
        core.error('validate failed in: ' + componentPath)
        return false
    }

    if (!spawnSyncTerraform(['plan', '-out=plan'])) {
        core.error('plan failed in: ' + componentPath)
        return false
    }

    if (apply)
        if (!spawnSyncTerraform(['apply', 'plan'])) {
            core.error('apply failed in: ' + componentPath)
            return false
        }

    return true
}

const spawnSyncTerraform = (options: Array<string>): boolean => {
    const run = spawnSync('terraform', options)
    core.info(run.output[1])
    core.info(run.output[2])
    if (run.status !== 0) {
        return false
    }
    return true
}
