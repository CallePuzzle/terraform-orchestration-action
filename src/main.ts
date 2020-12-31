import * as core from '@actions/core';
import {getGitModifiedDirectories} from "./getGitModifiedDirectories";

export const main = (): void => {
    const ret = getGitModifiedDirectories('__tests__/tf_project/', '86e35d7e707289588dcf6f825be3e7c3e854cf58', '009ec5a0e9196b668d926916eaeb6f778694074f');
};

try {
    main();
} catch (error) {
    core.setFailed(error);
}
