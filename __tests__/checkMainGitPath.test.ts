import { checkMainGitPath } from '../src/checkMainGitPath'
jest.mock('@actions/core')
import path from 'path'

test('check main git path', () => {
    expect(checkMainGitPath()).resolves.toEqual(true)
})

test('check main git path: fail', () => {
    try {
        process.chdir(__dirname);
        checkMainGitPath()
    } catch (e) {
        expect(e).not.toBeNull()
    }
    process.chdir(path.join(__dirname, '../'));
})
