import * as core from '@actions/core'

import { main, LogInterface } from './main'

class Log implements LogInterface {
    info(message: string): void { console.log(message) }
    error(message: string): void { console.error(message) }
}

try {
    main({
        workingDirectory: '.',//'__tests__/tf_project/', //core.getInput('workingDirectory'),
        baseRef: '2d601a8c38ef73231a2fba9dca2b5c26d304d9a3', //core.getInput('baseRef'),
        headRef: 'fa666c95a0a4598b71036de75163fc68bfa4e2c4', //core.getInput('headRef')
        excludeDirectories: undefined,
        workspace: undefined,
        apply: core.getInput('apply') === "true"
    }, new Log())
} catch (error) {
    console.error(error)
}
