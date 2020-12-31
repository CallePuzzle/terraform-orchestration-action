import simpleGit, {SimpleGit, SimpleGitOptions} from 'simple-git';
const path = require('path');

export const getGitModifiedDirectories = async (basepath: string, base_ref: string, head_ref: string) => {
    const re = new RegExp('^' + basepath);
    const options: SimpleGitOptions = {
        baseDir: basepath,
        binary: 'git',
        maxConcurrentProcesses: 1,
    };
    try {
        const git: SimpleGit = simpleGit(options);
        const affectedFiles = await git.diff(['--name-only', base_ref, head_ref]);
        return affectedFiles.split('\n').map(file => {
            if (file.match(re)) {
                return path.dirname(file).replace(re, '');
            }
        }).filter(file => {
            return file !== undefined;
        });
    }
    catch (e) {
        console.log(e);
        return null;
    }
};
