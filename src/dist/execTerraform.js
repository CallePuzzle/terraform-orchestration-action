"use strict";
exports.__esModule = true;
exports.execTerraform = void 0;
var child_process_1 = require("child_process");
var path_1 = require("path");
exports.execTerraform = function (processCwd, componentPath, workspace, apply, log) {
    log.info("processCwd -> " + processCwd);
    process.chdir(path_1["default"].join(processCwd, componentPath));
    log.info('terraform init');
    if (!spawnSyncTerraform(['init'], log)) {
        log.error('init failed in: ' + componentPath);
        return false;
    }
    if (workspace !== undefined) {
        log.info('terraform workspace select ' + workspace);
        if (!spawnSyncTerraform(['workspace', 'select', workspace], log)) {
            log.error('workspace ' + workspace + ' failed in: ' + componentPath);
            return false;
        }
    }
    log.info('terraform validate');
    if (!spawnSyncTerraform(['validate'], log)) {
        log.error('validate failed in: ' + componentPath);
        return false;
    }
    log.info('terraform plan');
    if (!spawnSyncTerraform(['plan', '-out=plan'], log)) {
        log.error('plan failed in: ' + componentPath);
        return false;
    }
    if (apply === true) {
        log.info('terraform apply');
        if (!spawnSyncTerraform(['apply', 'plan'], log)) {
            log.error('apply failed in: ' + componentPath);
            return false;
        }
    }
    return true;
};
var spawnSyncTerraform = function (options, log) {
    var run = child_process_1.spawnSync('terraform', options);
    log.info(run.output[1].toString());
    log.info(run.output[2].toString());
    if (run.status !== 0) {
        return false;
    }
    return true;
};
