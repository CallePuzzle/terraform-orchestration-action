import { main, LogInterface } from './main'

class Log implements LogInterface {
    info(message: string): void { console.log(message) }
    error(message: string): void { console.error(message) }
}

try {
    main({
        workingDirectory: '/home/fjcrujeiras/Projects/MonoM/provision-monom-project/', //core.getInput('workingDirectory'),
        baseRef: 'b1f9bfc758728ad2f0fae2c64545ce9ddd4b790f', //core.getInput('baseRef'),
        headRef: '0b820c65fef469e006cafd09a17b635867022618',
        excludeDirectories: ['.github','root_path','010-awm','999-legacy-projects','tools', 'docs'],
        commonModules: ['000-module'],
        workspace: undefined,
        apply: false,
        tfeToken: '',
        organizationName: ''
    }, new Log())
} catch (error) {
    console.error(error)
}
