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
  banks: [{
    id: 0,
    locate: 'east',
    assets: {
      cash: 1000,
    },
  }, {
    id: 1,
    locate: 'west',
    assets: {
      cash: 2000,
    },
  }, {
    id: 2,
    locate: 'north',
    assets: {
      cash: 3000,
    },
  }, {
    id: 3,
    locate: 'south',
    assets: {
      cash: 4000,
    },
  }, ],
});
