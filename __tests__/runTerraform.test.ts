import { execTerraform } from '../src/execTerraform'
//jest.mock('@actions/core')

const processCwd = process.cwd()

test('run terraform ok', () => {
    expect(execTerraform(processCwd, '__tests__/tf_project/000-first', undefined, false)).toBe(true)
    expect(execTerraform(processCwd, '__tests__/tf_project/000-first', 'test', false)).toBe(true)
    expect(execTerraform(processCwd, '__tests__/tf_project/000-first', 'test', true)).toBe(true)
    process.chdir(processCwd)
})

test('run terraform fail', () => {
    expect(execTerraform(processCwd, '__tests__/tf_project/010-second', undefined, false)).toBe(false)
    process.chdir(processCwd)
})
