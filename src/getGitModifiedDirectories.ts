import * as core from '@actions/core'
import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git'
const path = require('path')

export const getGitModifiedDirectories = async (basepath: string, base_ref: string, head_ref: string) => {
  const re = new RegExp('^' + basepath)
  const options: SimpleGitOptions = {
    baseDir: basepath,
    binary: 'git',
    maxConcurrentProcesses: 1
  }
  try {
    const git: SimpleGit = simpleGit(options)
    return await git.diff(['--name-only', base_ref, head_ref])
      .then(r => {
        return r.split('\n').map(file => {
          if (file.match(re)) {
            return path.dirname(file).replace(re, '')
          }
        }).filter((file, index, self) => {
          // no undefined + unique();
          return file !== undefined && self.indexOf(file) === index
        })
      })
      .catch(e => {
        core.error(e)
        return null
      })
  } catch (e) {
    core.error(e)
    return null
  }
}
