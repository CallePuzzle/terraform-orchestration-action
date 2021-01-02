import { getDirectories } from '../src/getDirectories'
import path from 'path'

test('get directories', () => {
    expect(getDirectories(path.join('__tests__', 'tf_project', '/')))
        .toEqual(['__tests__/tf_project/000-first', '__tests__/tf_project/010-second'])
})
