import * as core from '@actions/core'

import { main, LogInterface } from './main'

class Log implements LogInterface {
    info(message: string): void { console.log(message) }
    error(message: string): void { console.error(message) }
}

try {
    main({
        workingDirectory: '__tests__/tf_project/', //core.getInput('workingDirectory'),
        baseRef: '86e35d7e707289588dcf6f825be3e7c3e854cf58', //core.getInput('baseRef'),
        headRef: '009ec5a0e9196b668d926916eaeb6f778694074f', //core.getInput('headRef')
        excludeDirectories: ['__tests__/tf_project/010-second'],
        workspace: undefined,
        apply: core.getInput('apply') === "true"
    }, new Log())
} catch (error) {
    console.error(error)
}
