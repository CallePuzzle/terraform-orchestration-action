"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirectoriesToRun = exports.getDirectories = void 0;
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const lodash_1 = require("lodash");
const getDirectories = (source) => fs.readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => path_1.default.join(source, dirent.name));
exports.getDirectories = getDirectories;
const getDirectoriesToRun = (paths, workingDirectory, commonModules, excludeDirectories, log) => {
    let ret = Array();
    for (const path of paths) {
        const isCommonModule = !(0, lodash_1.isEmpty)(commonModules.filter(commonModule => {
            const re = new RegExp('^' + commonModule);
            return path.match(re);
        }));
        if (isCommonModule === true) {
            log.info('Common modules has been modified, searching for all componentes...');
            const allComponents = (0, lodash_1.difference)((0, exports.getDirectories)(workingDirectory), commonModules, excludeDirectories);
            for (const component of allComponents) {
                ret.push(component);
            }
            break;
        }
        else {
            ret.push(path);
        }
    }
    ret = (0, lodash_1.difference)((0, lodash_1.uniq)((0, lodash_1.compact)(ret)), ['.git']);
    log.info(`Components: ${ret}`);
    return ret;
};
exports.getDirectoriesToRun = getDirectoriesToRun;
