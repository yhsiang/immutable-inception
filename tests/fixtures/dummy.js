import { fromJS } from 'immutable';

export default fromJS({
  users: [{
    id: 0,
    age: 12,
    assets: {
      money: 10,
    },
  }, {
    id: 1,
    age: 21,
    assets: {
      money: 500,
    },
  }, {
    id: 2,
    age: 33,
    assets: {
      money: 1200,
    },
  }, ],
});
