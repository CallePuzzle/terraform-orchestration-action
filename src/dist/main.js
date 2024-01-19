"use strict";
exports.__esModule = true;
exports.main = void 0;
var getGitModifiedDirectories_1 = require("./getGitModifiedDirectories");
var checkMainGitPath_1 = require("./checkMainGitPath");
exports.main = function (input, log) {
    log.info('Running...');
    log.info("Working directory: " + input.workingDirectory);
    log.info("Base ref: " + input.baseRef);
    log.info("Head ref: " + input.headRef);
    log.info("Exclude directories: " + input.excludeDirectories);
    log.info("Common modules: " + input.commonModules);
    log.info("Workspace: " + input.workspace);
    log.info("Apply: " + input.apply);
    log.info("******** some changed here");
    var processCwd = process.cwd();
    checkMainGitPath_1.checkMainGitPath(log).then(function () {
        log.info("******** geGitModifiedDirs");
        getGitModifiedDirectories_1.getGitModifiedDirectories(input.workingDirectory, input.baseRef, input.headRef, input.excludeDirectories, log)
            .then(function (components) {
            log.info("******** check runAll");
            var runAll = components.some(function (componentPath) {
                // check if root path was update
                console.log("********componentPath --> ", componentPath);
                var filtered = componentPath.filter(function (x) { return x.includes(input.commonModules.toString()); });
                return componentPath.includes(input.commonModules);
            });
            if (runAll) {
                log.info("Running for all modules using Terragrunt . . . .");
                // execTerragrunt(processCwd,input.workspace, input.apply, log);
            }
            else {
                log.info("Using Terraform for modules");
                // const componentsToRun = getDirectoriesToRun(components, input.workingDirectory, input.commonModules, input.excludeDirectories, log)
                // componentsToRun.map(componentPath => {
                //   execTerraform( processCwd, componentPath, input.workspace, input.apply, log)
                // });
            }
        })["catch"](function (e) {
            log.error(e.message);
            throw e;
        });
    });
};
