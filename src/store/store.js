/*
this will be the store that will hold the operations result
*/

export function store() {

	let _store = {}
  let _last_operation = {}

  function addItem(value, key) {
    _store[key] = value
    _last_operation = {}
    _last_operation = value
  }

  function getItem(key) {
    return _store[key]
  }

  function getLastOperationResult() {
    return _last_operation
  }

  function debug() {
    console.log('STORE DEBUG:')
    console.log(_store)
    console.log('LAST OPERATION:')
    console.log(_last_operation)
  }

  return {
    addItem: addItem,
    getItem: getItem,
    getLastOperationResult: getLastOperationResult,
    debug: debug
  }

}