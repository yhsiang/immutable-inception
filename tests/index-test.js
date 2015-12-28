import expect from 'expect';
import dummy from './fixtures/dummy';
import inception from 'src/index';

describe('Inception', () => {
  it('supports single key path', () => {
    const exp = dummy.update(
      'users',
      updater => updater.map(item => item.set('age', item.get('age') + 1))
    );
    const act = inception(
      dummy,
      ['users'],
      item => item.set('age', item.get('age') + 1)
    );

    expect(act.toJS()).toEqual(exp.toJS());
  });
});
