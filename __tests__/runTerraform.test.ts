import { runTerraform, setWorkspace } from '../src/runTerraform'
import path from 'path'
jest.mock('@actions/core')

const processCwd = process.cwd()

test('set terraform workspace ok', () => {
    process.chdir(path.join(processCwd, '__tests__/tf_project/000-first'))
    expect(setWorkspace('test')).toBe(true)
    process.chdir(processCwd)
})

test('set terraform workspace fail', () => {
    process.chdir(path.join(processCwd, '__tests__/tf_project/010-second'))
    expect(setWorkspace('test')).toBe(false)
    process.chdir(processCwd)
})

test('run terraform ok', () => {
    expect(runTerraform(processCwd, '__tests__/tf_project/000-first', undefined, false)).toBe(true)
    expect(runTerraform(processCwd, '__tests__/tf_project/000-first', 'test', false)).toBe(true)
    expect(runTerraform(processCwd, '__tests__/tf_project/000-first', 'test', true)).toBe(true)
    process.chdir(processCwd)
})

test('run terraform fail', () => {
    expect(runTerraform(processCwd, '__tests__/tf_project/010-second', undefined, false)).toBe(false)
    process.chdir(processCwd)
})
