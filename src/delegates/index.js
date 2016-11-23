import axios from 'axios'
import {store} from '../store/store.js'

const storeInstance = store()

export const messageGateway = function (messageArray, callback) {
  let {strategy} = messageArray[0]
  switch (strategy) {
    case 'http':
      httpGate(messageArray, callback)
      break
    default:
      runReducer(messageArray, callback)
  }
}

function successExit (result, callback) {
  storeInstance.debug()
  return callback(null, result)
}

function errorGate (err, callback) {
  console.log('ERROR GATE')
  return callback(err, null)
}

function httpGate (messageArray, callback) {
  let {method, resource, url, data} = messageArray[0].payload
  axios({
    method: method,
    url: url + resource,
    data: data
  })
  .then(function (response) {
    storeInstance.addItem(response.data, messageArray[0].name)
    return completeIteration(messageArray, callback)
  })
  .catch(function (error) {
    return errorGate(error, callback)
  })
}

function from_store(payload) {
  let _payload
  if(payload !== undefined) {
    _payload = storeInstance.getItem(payload.from_store)
  } else {
    _payload = storeInstance.getLastOperationResult()
  }
  return _payload
}

function runReducer(messageArray, callback) {
  // refactor this to use destructuring and simplify the algorithm
  let {name, strategy, payload} = messageArray[0]
  let result
  payload = from_store(payload)
  try {
    result = messageArray[0].strategy(payload)
    storeInstance.addItem(result, name)
    return completeIteration(messageArray, callback)
  } catch(e) {
    return errorGate(e, callback)
  }
}

function completeIteration(messageArray, callback) {
  messageArray.shift()
  if(messageArray[0] !== undefined) {
    return messageGateway(messageArray, callback)
  } else {
    return successExit(storeInstance.getLastOperationResult(), callback)
  }
}