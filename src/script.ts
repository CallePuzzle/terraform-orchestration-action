import { main, LogInterface } from './main'

class Log implements LogInterface {
    info(message: string): void { console.log(message) }
    error(message: string): void { console.error(message) }
}

try {
    main({
        workingDirectory: '.', //core.getInput('workingDirectory'),
        baseRef: '01157a1b666676882d6c1d584107c21346cb3642', //core.getInput('baseRef'),
        headRef: '25e2e8cbc31e529d0ee831644e6444d9403238c9', //core.getInput('headRef')
        excludeDirectories: ['.github','root_path','010-awm','999-legacy-projects','tools', 'docs'],
        commonModules: ['000-module'],
        workspace: undefined,
        apply: false
    }, new Log())
} catch (error) {
    console.error(error)
}
