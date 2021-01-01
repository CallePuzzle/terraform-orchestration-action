import { getDirectories } from '../src/getDirectories'

test('get directories', () => {
  expect(getDirectories(__dirname + '/tf_project')).toEqual(['000-first', '010-second'])
})
