import { getGitModifiedDirectories } from '../src/getGitModifiedDirectories'
import { LogInterface } from '../src/main'
import { join } from 'path'

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

test('get modified directories', async () => {
    await expect(getGitModifiedDirectories(join('__tests__', 'tf_project', '/'), '86e35d7e707289588dcf6f825be3e7c3e854cf58', '009ec5a0e9196b668d926916eaeb6f778694074f', [], new Log))
        .resolves.toEqual(['__tests__/tf_project/000-first', '__tests__/tf_project/010-second'])
    await expect(getGitModifiedDirectories(join('__tests__', 'tf_project', '/'), '86e35d7e707289588dcf6f825be3e7c3e854cf58', '009ec5a0e9196b668d926916eaeb6f778694074f', ['__tests__/tf_project/000-first'], new Log))
        .resolves.toEqual(['__tests__/tf_project/010-second'])
})
