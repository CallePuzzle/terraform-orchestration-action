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
exports.getGitModifiedDirectories = void 0;
const simple_git_1 = __importDefault(require("simple-git"));
const path_1 = __importDefault(require("path"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getGitModifiedDirectories = (basepath, base_ref, head_ref, exclude_directories, log) => __awaiter(void 0, void 0, void 0, function* () {
    const re_include = new RegExp('^' + basepath);
    const options = {
        baseDir: basepath,
        binary: 'git',
        maxConcurrentProcesses: 1
    };
    try {
        const git = (0, simple_git_1.default)(options);
        return yield git.diff(['--name-only', base_ref, head_ref])
            .then(r => {
            const ret = r.split('\n').map(file => {
                if (file.match(re_include)) {
                    let ret = path_1.default.dirname(file);
                    for (const exclude_directory of exclude_directories) {
                        if (exclude_directory === 'root_path' && ret === '.') {
                            return undefined;
                        }
                        let re_exclude = new RegExp('^' + exclude_directory);
                        if (ret.match(re_exclude)) {
                            return undefined;
                        }
                    }
                    return ret;
                }
            }).filter((file, index, self) => {
                // no undefined + unique();
                return file !== undefined && self.indexOf(file) === index;
            });
            log.info('Modified directories: ' + JSON.stringify(ret));
            return ret;
        })
            .catch(e => {
            log.error(e);
            return [];
        });
    }
    catch (e) {
        log.error(e.message);
        return [];
    }
});
exports.getGitModifiedDirectories = getGitModifiedDirectories;
