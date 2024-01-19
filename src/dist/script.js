"use strict";
exports.__esModule = true;
var main_1 = require("./main");
var Log = /** @class */ (function () {
    function Log() {
    }
    Log.prototype.info = function (message) { console.log(message); };
    Log.prototype.error = function (message) { console.error(message); };
    return Log;
}());
try {
    main_1.main({
        workingDirectory: '/CHANGE-ME-YOUR-OWN-PATH-TO/provision-monom-project/',
        baseRef: '13d8d9c47d8e89c3c5a9647a54dcbdf25ce41d81',
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
