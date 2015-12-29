import expect from 'expect';
import dummy from './fixtures/dummy';
import inception, { filterer, mapperer } from 'src/index';

describe('Inception', () => {
  it('supports single navigator (string) path', () => {
    const exp = dummy.set('users', 'overwrite');
    const act = inception(
      dummy,
      ['users'],
      mapperer(() => 'overwrite')
    );

    expect(act.toJS()).toEqual(exp.toJS());
  });

  it('supports navigator (string) + filterer (function) path', () => {
    const exp = dummy.update(
      'users',
      updater => updater.map(item => item.set('age', item.get('age') + 1))
    );
    const act = inception(
      dummy,
      ['users'],
      mapperer(item => item.set('age', item.get('age') + 1))
    );

    expect(act.toJS()).toEqual(exp.toJS());
  });

  // it('supports single navigator (string) path', () => {
  //   const exp = dummy.update(
  //     'users',
  //     updater => updater.map(item => item.set('age', item.get('age') + 1))
  //   );
  //   const act = inception(
  //     dummy,
  //     ['users'],
  //     mapperer(item => item.set('age', item.get('age') + 1))
  //   );
  //
  //   expect(act.toJS()).toEqual(exp.toJS());
  // });

  // it('supports single filterer (function) path', () => {
  //   const exp = dummy.update(
  //     'banks',
  //     updater => updater.map(item => item.set('marked', true))
  //   );
  //   const act = inception(
  //     dummy,
  //     [filterer(items => items.count() > 3)],
  //     mapperer(item => item.set('marked', true))
  //   );
  //
  //   expect(act.toJS()).toEqual(exp.toJS());
  // });
});
