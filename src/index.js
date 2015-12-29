import {List} from 'immutable';

export function filterer(fn) {
  return {
    type: 'filter',
    fn,
  };
}

export function mapper(fn) {
  return {
    type: 'mapper',
    fn,
  };
}

export function transform(data) {
  let keeper = [fn => fn(data)];
  return (args) => {
    args.forEach((obj, i) => {
      if (typeof obj === 'string' || typeof obj === 'number') {
        keeper.push(
          inner => keeper[i](item => item.updateIn([obj], inner))
        );
      }
      if (obj.type && obj.type === 'filter') {
        keeper.push(
          inner => keeper[i](value => {
            if (List.isList(value)) {
              return value.map(item => {
                return (obj.fn(item)) ? inner(item) : item;
              });
            }
            return (obj.fn(value)) ? inner(value) : value;
          })
        );
      }

      if (obj.type && obj.type === 'mapper') {
        keeper.push(
          inner => keeper[i](value => {
            if (List.isList(value)) {
              return value.map(item => inner(obj.fn(item)));
            }
            return inner(obj.fn(value));
          })
        );
      }
    });
    return keeper[args.length](d => d);
  };
}
