import * as core from '@actions/core'
import { getGitModifiedDirectories } from './getGitModifiedDirectories'
import { spawn } from 'child_process'
import { checkMainGitPath } from './checkMainGitPath'

export const main = (): void => {
  checkMainGitPath().then(r => {
    getGitModifiedDirectories('__tests__/', '86e35d7e707289588dcf6f825be3e7c3e854cf58', '009ec5a0e9196b668d926916eaeb6f778694074f')
      .then(r => {
        // console.log(r);
        spawn('ls', ['-la']).stdout.on('data', data => {
          // console.log(`stdout: ${data}`);
        })
      })
  }).catch(e => {
    core.error(e)
    throw e
  })
}

try {
  main()
} catch (error) {
  core.setFailed(error)
}
