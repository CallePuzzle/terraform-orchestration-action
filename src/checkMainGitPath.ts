import * as core from '@actions/core'
import simpleGit, { SimpleGit } from 'simple-git'
import * as fs from 'fs'

export const checkMainGitPath = async () => {
  try {
    const git: SimpleGit = simpleGit()
    return await git.log().then(r => {
      return fs.statSync('.git').isDirectory()
    }).catch(e => {
      core.error(e)
      throw e
    })
  } catch (e) {
    core.error(e)
    throw e
  }
}
