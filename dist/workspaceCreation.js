"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workspaceOperation = void 0;
const axios_1 = __importDefault(require("axios"));
// Generic function for interacting with the TFE API
function terraformApiCall(method, projectName, organizationName, authToken, log) {
    return __awaiter(this, void 0, void 0, function* () {
        // Set
        const baseUrl = `https://app.terraform.io/api/v2/organizations/${organizationName}/workspaces`;
        let body;
        let apiUrl;
        let goodStatus;
        switch (method) {
            case 'get': {
                goodStatus = 200;
                apiUrl = baseUrl + `/${projectName}`;
                break;
            }
            case 'post': {
                apiUrl = baseUrl;
                goodStatus = 201;
                body = {
                    data: {
                        attributes: {
                            name: projectName,
                            'resource-count': 0,
                            'execution-mode': 'local'
                        },
                        type: 'workspaces'
                    }
                };
                break;
            }
        }
        // Exec
        try {
            const response = yield axios_1.default.request({
                url: apiUrl,
                method: method,
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/vnd.api+json',
                },
                data: body,
            });
            if (response.status === goodStatus) {
                return true;
            }
            else if (response.status === 404) {
                return false;
            }
        }
        catch (error) {
            log.error('There was an error when calling the API');
            return false;
        }
        return false;
    });
}
// Logic execution
const workspaceOperation = (projectName, organizationName, authToken, log) => __awaiter(void 0, void 0, void 0, function* () {
    if (authToken === undefined || organizationName === undefined) {
        log.info('Missing params. Skipping...');
    }
    else {
        log.info('Checking if workspace exists in TFE...');
        yield terraformApiCall('get', projectName, organizationName, authToken, log).then((result) => __awaiter(void 0, void 0, void 0, function* () {
            if (result) {
                log.info('The workspace exists. Nothing to do...');
            }
            else {
                log.info('The workspace does not exist. Creating...');
                yield terraformApiCall('post', projectName, organizationName, authToken, log).then((result) => {
                    if (result) {
                        log.info('Workspace created.');
                    }
                    else {
                        log.info('Something went wrong.');
                    }
                });
            }
        }));
    }
});
exports.workspaceOperation = workspaceOperation;
