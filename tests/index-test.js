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

  it('supports single updater path', () => {
    const exp = dummy
      .setIn(['users', 1, 'assets', 'money'], 501)
      .setIn(['users', 2, 'assets', 'money'], 1201);
    const act = inception(
      dummy,
      ['users', item => item.get('age') > 20],
      item => item.setIn(['assets', 'money'], item.getIn(['assets', 'money']) + 1)
    );

    expect(act.toJS()).toEqual(exp.toJS());
  });
});
