"use strict";
exports.__esModule = true;
exports.execTerragrunt = void 0;
var child_process_1 = require("child_process");
var path_1 = require("path");
exports.execTerragrunt = function (processCwd, workspace, apply, log) {
    process.chdir(path_1["default"].join(processCwd));
    log.info('terragrunt run-all init');
    if (!spawnSyncTerragrunt(['run-all', 'init'], log)) {
        log.error('init failed');
        return false;
    }
    log.info('terragrunt run-all validate');
    if (!spawnSyncTerragrunt(['run-all', 'validate'], log)) {
        log.error('validate failed');
        return false;
    }
    log.info('terragrunt run-all plan');
    if (!spawnSyncTerragrunt(['run-all', 'plan', '-out=plan'], log)) {
        log.error('plan failed');
        return false;
    }
    if (apply === true) {
        log.info('terragrunt run-all apply');
        if (!spawnSyncTerragrunt(['run-all', 'apply', 'plan'], log)) {
            log.error('apply failed');
            return false;
        }
    }
    return true;
};
var spawnSyncTerragrunt = function (options, log) {
    var run = child_process_1.spawnSync('terragrunt', options);
    log.info(run.output[1].toString());
    log.info(run.output[2].toString());
    if (run.status !== 0) {
        var stderr = run.stderr;
        console.log('Salida de error:', stderr.toString());
        return false;
    }
    return true;
};
