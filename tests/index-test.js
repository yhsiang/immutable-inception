import expect from 'expect';
import dummy from './fixtures/dummy';
import {
  transform,
  mapper,
  filterer,
} from 'src/index';

describe('Inception', () => {
  it('supports single navigator (string) path', () => {
    const exp = dummy.update(
      'users',
      updater => updater.map(item => item.set('age', item.get('age') + 1))
    );
    const act = transform(dummy)
      (['users', mapper(item => item.set('age', item.get('age') + 1))]);

    expect(act.toJS()).toEqual(exp.toJS());
  });

  it('supports single filterer (function) path', () => {
    const exp = dummy.update(
      'banks',
      updater => updater.map(item => {
        return (item.get('locate') === 'north') ?
          item.set('marked', true) : item;
      })
    );
    const act = transform(dummy)
      (['banks', filterer(item => item.get('locate') === 'north'), mapper(item => item.set('marked', true))]);

    expect(act.toJS()).toEqual(exp.toJS());
  });
});
