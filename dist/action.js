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
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const main_1 = require("./main");
class Log {
    info(message) { core.info(message); }
    error(message) { core.error(message); }
}
try {
    (0, main_1.main)({
        workingDirectory: core.getInput('workingDirectory'),
        baseRef: core.getInput('baseRef'),
        headRef: core.getInput('headRef'),
        workspace: core.getInput('workspace') || undefined,
        excludeDirectories: core.getInput('excludeDirectories').split(','),
        commonModules: core.getInput('commonModules').split(','),
        apply: core.getInput('apply') === "true",
        // tfeToken: core.getInput('tfeToken') || undefined,
        // organizationName: core.getInput('organizationName') || undefined
    }, new Log());
}
catch (error) {
    core.setFailed(error);
}
