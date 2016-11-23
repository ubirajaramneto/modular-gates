//https://en.wikipedia.org/wiki/Function_composition
//https://en.wikipedia.org/wiki/Function_composition_(computer_science)

import {messageGateway} from './delegates/index.js'


let dispatch = function (message, callback) {
  messageGateway(message, callback)
}

let authority = function(options) {
  return Object.assign({}, {dispatch: dispatch})
}

export { authority }
