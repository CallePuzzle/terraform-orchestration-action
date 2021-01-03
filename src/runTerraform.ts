import * as core from '@actions/core'
import { spawnSync } from 'child_process'
import path from 'path'

export const runTerraform = (processCwd: string, componentPath: string, workspace: string | undefined): boolean => {
    process.chdir(path.join(processCwd, componentPath));
    if (!setWorkspace(workspace))
        return false

    const options = [
        ['validate'],
        ['plan', '-out=plan'],
        ['apply', 'plan']
    ]
    for (const option of options) {
        const run = spawnSync('terraform', option)
        core.info(run.output[1])
        core.info(run.output[2])
        if (run.status !== 0) {
            break
        }
    }
    return true
}

export const setWorkspace = (workspace: string | undefined): boolean => {
    if (workspace) {
        const run = spawnSync('terraform', ['workspace', 'select', workspace])
        core.info(run.output[1])
        core.info(run.output[2])
        return run.status === 0
    } else
        return false
}
