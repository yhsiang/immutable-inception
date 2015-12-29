import Immutable from 'immutable';

export const filterer = (fn) => {
	return {
		type: 'filter',
		fn,
	}
}

export const mapperer = (fn) => {
	return {
		type: 'mapper',
		fn,
	}
}

function inception(data, keyPath, updater) {
  let keeper = [(f) => f(data)];

  keyPath.push(updater);

	keyPath.forEach((obj, i) => {
		if (typeof obj === 'string' || typeof obj === 'number' ) {
			keeper[i+1] = innerFn => keeper[i](d=>{
				return d.updateIn([obj], innerFn)
			})
		}
		else if (typeof obj === 'object') {
			if(obj.type === 'filter'){
				keeper[i+1] = innerFn => {
					return keeper[i](d=>{
            if(Immutable.Map.isMap(d)){
            	if(obj.fn(d)){
              	return innerFn(d);
              }
              return d;
            }
            else if(Immutable.List.isList(d)){
              return d.map(dd=>{
                if(obj.fn(dd)){
                  return innerFn(dd);
                }
                return dd;
               });
            }
					})
				}
			}
			else if(obj.type === 'mapper'){
      	keeper[i+1] = innerFn => {
					return keeper[i](d=>{
						return innerFn(obj.fn(d))
          })
				}
			}
		}
	});

	return keeper[keyPath.length](d=>d);
}

export default inception;
