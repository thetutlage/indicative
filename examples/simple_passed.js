#!/usr/bin/env node

var validator = require('../indicative');
validator.initialize();

var rules = {
	'username': 'required|alpha|min:4',
	'email': 'required|email',
	'gender': 'in:Male,Female,Other',
	'age':'range:18,70',
	'password':'required|min:4'
};

var values = {
	'username': 'nuran',
	'email': 'nu@example.com',
	'gender': 'Male',
	'age': 22,
	'password': 'johny'
};

validator.validate(rules,values).then(function(success){
	console.log(success);
}).catch(function(err){
	console.log(err);
}).done();