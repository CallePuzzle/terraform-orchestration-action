import { execTerraform } from '../src/execTerraform'
import { LogInterface } from '../src/main'

class Log implements LogInterface {
    info(message: string): void {
        console.log = jest.fn()
        console.log(message)
    }
    error(message: string): void {
        console.error = jest.fn()
        console.error(message)
    }
}

const processCwd = process.cwd()

test('run terraform ok', () => {
    expect(execTerraform(processCwd, '__tests__/tf_project/000-first', undefined, false, new Log())).toBe(true)
    expect(execTerraform(processCwd, '__tests__/tf_project/000-first', 'test', false, new Log())).toBe(true)
    expect(execTerraform(processCwd, '__tests__/tf_project/000-first', 'test', true, new Log())).toBe(true)
    process.chdir(processCwd)
})

test('run terraform fail', () => {
    expect(execTerraform(processCwd, '__tests__/tf_project/010-second', undefined, false, new Log())).toBe(false)
    process.chdir(processCwd)
})
