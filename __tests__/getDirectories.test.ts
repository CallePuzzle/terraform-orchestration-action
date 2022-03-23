import { getDirectories, getDirectoriesToRun } from '../src/getDirectories'
import { LogInterface } from '../src/main'
import path from 'path'

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

test('get directories', () => {
    expect(getDirectories(path.join('__tests__', 'tf_project', '/')))
        .toEqual(['__tests__/tf_project/000-first', '__tests__/tf_project/010-second', '__tests__/tf_project/common-module'])
})

test('get directories to run', () => {
    expect(getDirectoriesToRun(['__tests__/tf_project/common-module'], '__tests__/tf_project/', ['__tests__/tf_project/common-module'], ['__tests__/tf_project/010-second'], new Log))
        .toEqual(['__tests__/tf_project/000-first'])
    expect(getDirectoriesToRun(['__tests__/tf_project/common-module', '__tests__/tf_project/000-first'], '__tests__/tf_project/', ['__tests__/tf_project/common-module'], ['__tests__/tf_project/010-second'], new Log))
        .toEqual(['__tests__/tf_project/000-first'])
    expect(getDirectoriesToRun(['__tests__/tf_project/common-module', '__tests__/tf_project/common-module/submodule'], '__tests__/tf_project/', ['__tests__/tf_project/common-module'], ['__tests__/tf_project/010-second'], new Log))
        .toEqual(['__tests__/tf_project/000-first'])
    expect(getDirectoriesToRun(['__tests__/tf_project/common-module/submodule'], '__tests__/tf_project/', ['__tests__/tf_project/common-module'], ['__tests__/tf_project/010-second'], new Log))
        .toEqual(['__tests__/tf_project/000-first'])
})
