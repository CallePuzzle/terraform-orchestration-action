"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execTerragrunt = void 0;
const execTerragrunt = (processCwd, componentPath, workspace, apply, log) => {
    log.info("Terragrunt is executing madafaka!!");
    // process.chdir(path.join(processCwd, componentPath));
    // const useTerragrunt = componentPath.includes('000-modules');
    // log.info(`${useTerragrunt ? 'terragrunt' : 'terraform'} init`);
    // if (!spawnSyncTerraformOrTerragrunt(['init'], useTerragrunt, log)) {
    //     log.error('init failed in: ' + componentPath);
    //     return false;
    // }
    // if (workspace !== undefined) {
    //     log.info(`${useTerragrunt ? 'terragrunt' : 'terraform'} workspace select ${workspace}`);
    //     if (!spawnSyncTerraformOrTerragrunt(['workspace', 'select', workspace], useTerragrunt, log)) {
    //         log.error(`workspace ${workspace} failed in: ${componentPath}`);
    //         return false;
    //     }
    // }
    // log.info(`${useTerragrunt ? 'terragrunt' : 'terraform'} validate`);
    // if (!spawnSyncTerraformOrTerragrunt(['validate'], useTerragrunt, log)) {
    //     log.error(`validate failed in: ${componentPath}`);
    //     return false;
    // }
    // log.info(`${useTerragrunt ? 'terragrunt' : 'terraform'} plan`);
    // if (!spawnSyncTerraformOrTerragrunt(['plan', '-out=plan'], useTerragrunt, log)) {
    //     log.error(`plan failed in: ${componentPath}`);
    //     return false;
    // }
    // if (apply === true) {
    //     log.info(`${useTerragrunt ? 'terragrunt' : 'terraform'} apply`);
    //     if (!spawnSyncTerraformOrTerragrunt(['apply', 'plan'], useTerragrunt, log)) {
    //         log.error(`apply failed in: ${componentPath}`);
    //         return false;
    //     }
    // }
    return true;
};
exports.execTerragrunt = execTerragrunt;
// const spawnSyncTerraformOrTerragrunt = (options: Array<string>, useTerragrunt: boolean, log: LogInterface): boolean => {
//     const command = useTerragrunt ? 'terragrunt run-all' : 'terraform';
//     const run = spawnSync(command, options);
//     log.info(run.output[1].toString());
//     log.info(run.output[2].toString());
//     if (run.status !== 0) {
//         return false;
//     }
//     return true;
// };
