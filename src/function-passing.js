"use strict";
// this is just me messing around with TCO, ignore this
// node --harmony src/function-passing.js
let someInternal = 0

function x (args, callback) {
	return y(args, callback)
}

function y(args, callback) {
	someInternal ++
	if(someInternal > 1000000) {
		return z(args, callback)
	}
	return y(args, callback)
}

function z(args, callback) {
	console.log(callback.toString())
	return callback(null, args + " world: " + someInternal)
}

console.log(y.toString())

x("hello", function(err, response) {
	console.log(response);
})
