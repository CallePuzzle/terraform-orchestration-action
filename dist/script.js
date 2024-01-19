"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
class Log {
    info(message) { console.log(message); }
    error(message) { console.error(message); }
}
try {
    (0, main_1.main)({
        workingDirectory: '/CHANGE-ME-YOUR-OWN-PATH-TO/provision-monom-project/', //core.getInput('workingDirectory'),
        baseRef: '13d8d9c47d8e89c3c5a9647a54dcbdf25ce41d81', //core.getInput('baseRef'),
        headRef: '73711c9c746aa3d0de99aec89f7d21b85e49f58a',
        excludeDirectories: ['.github', 'root_path', '010-awm', '999-legacy-projects', 'tools', 'docs'],
        commonModules: ['000-module'],
        workspace: undefined,
        apply: false
    }, new Log());
}
catch (error) {
    console.error(error);
}
