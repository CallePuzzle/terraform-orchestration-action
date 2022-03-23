import * as core from '@actions/core'

import { main, LogInterface } from './main'

class Log implements LogInterface {
    info(message: string): void { console.log(message) }
    error(message: string): void { console.error(message) }
}

try {
    main({
        workingDirectory: '__tests__/tf_project/', //core.getInput('workingDirectory'),
        baseRef: '6c96ba983bcbebcc84f0eac4bf9ca458e2dc46b9', //core.getInput('baseRef'),
        headRef: '92d985710d915c1abec8ffefd80b94e0a520d8c5', //core.getInput('headRef')
        excludeDirectories: ['__tests__/tf_project/010-second'],
        commonModules: ['__tests__/tf_project/common-module'],
        workspace: undefined,
        apply: core.getInput('apply') === "true"
    }, new Log())
} catch (error) {
    console.error(error)
}
