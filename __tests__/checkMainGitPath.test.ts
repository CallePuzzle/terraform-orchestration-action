import { checkMainGitPath } from '../src/checkMainGitPath'
jest.mock('@actions/core')

test('check main git path', () => {
  expect(checkMainGitPath()).resolves.toEqual(true)
})
