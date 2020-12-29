import * as core from '@actions/core';


export const main = (): void => {
    core.info(__dirname);

    console.log(getDirectories('/etc'))
};

try {
    main();
} catch (error) {
    core.setFailed(error);
}
