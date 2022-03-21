import { checkMainGitPath } from '../src/checkMainGitPath'
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

test('check main git path', () => {
    checkMainGitPath(new Log()).then(r => {
        expect(r).toEqual(true)
    })

})

test('check main git path: fail', () => {
    process.chdir(__dirname);
    checkMainGitPath(new Log()).catch(e => {
        expect(e).not.toBeNull()
    })
    process.chdir(join(__dirname, '../'))
})
