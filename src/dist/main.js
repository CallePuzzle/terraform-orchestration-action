"use strict";
exports.__esModule = true;
exports.main = void 0;
var getGitModifiedDirectories_1 = require("./getGitModifiedDirectories");
var checkMainGitPath_1 = require("./checkMainGitPath");
var execTerraform_1 = require("./execTerraform");
var execTerragrunt_1 = require("./execTerragrunt");
exports.main = function (input, log) {
    log.info('Running...');
    log.info("Working directory: " + input.workingDirectory);
    log.info("Base ref: " + input.baseRef);
    log.info("Head ref: " + input.headRef);
    log.info("Exclude directories: " + input.excludeDirectories);
    log.info("Common modules: " + input.commonModules);
    log.info("Workspace: " + input.workspace);
    log.info("Apply: " + input.apply);
    var processCwd = process.cwd();
    checkMainGitPath_1.checkMainGitPath(log).then(function () {
        getGitModifiedDirectories_1.getGitModifiedDirectories(input.workingDirectory, input.baseRef, input.headRef, input.excludeDirectories, log)
            .then(function (components) {
            // what is inside components?
            log.info("**** components -> " + components.join(', '));
            var runAll = components.some(function (componentPath) {
                // check if root path was update
                return componentPath.includes(input.commonModules);
            });
            if (runAll) {
                log.info("Running for all modules using Terragrunt . . . .");
                components.map(function (componentPath) {
                    execTerragrunt_1.execTerragrunt(processCwd, componentPath, input.workspace, input.apply, log);
                });
            }
            else {
                log.info("Using Terraform for modules");
                components.map(function (componentPath) {
                    execTerraform_1.execTerraform(processCwd, componentPath, input.workspace, input.apply, log);
                });
            }
        });
    })["catch"](function (e) {
        log.error(e.message);
        throw e;
    });
};
