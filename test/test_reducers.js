import {authority} from './index.js'

function userReducer(payload) {
  let _result = []
  for(let i = 0; i < payload.length; i++) {
    let {name, id} = payload[i]
    _result.push({name, id})
  }
  return _result
}

let authorityInstance = authority()
authorityInstance.dispatch(
  [
    {
      name: 'ALL_USERS',
      strategy: 'http',
      payload: {
        url: 'http://localhost:3000/',
        resource: 'users',
        method: 'GET'
      }
    },
    {
      name: 'TAKE_OFF_AGE',
      strategy: userReducer,
      payload: {from_store: 'ALL_USERS'}
    }
  ], function(err, result) {
    if(err) {
      console.log(err)
      return result
    }
  }
)