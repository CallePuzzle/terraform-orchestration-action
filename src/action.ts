import * as core from '@actions/core'

import { main, LogInterface } from './main'

class Log implements LogInterface {
    info(message: string): void { core.info(message) }
    error(message: string): void { core.error(message) }
}

try {
    main({
        workingDirectory: core.getInput('workingDirectory'),
        baseRef: core.getInput('baseRef'),
        headRef: core.getInput('headRef'),
        workspace: core.getInput('workspace') || undefined,
        excludeDirectories: core.getInput('excludeDirectories').split(','),
        commonModules: core.getInput('commonModules').split(','),
        apply: core.getInput('apply') === "true",
        // tfeToken: core.getInput('tfeToken') || undefined,
        // organizationName: core.getInput('organizationName') || undefined
    }, new Log())
} catch (error:any) {
    core.setFailed(error)
}
