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
	'username': 'nu',
	'email': 'nu@example.com',
	'gender': 'M',
	'age': 22
};

var messages = {
	'min': '%field% should satisfy minimum length',
	'in': 'Only Female and Male is the option '
};

validator.validate(rules,values,messages).then(function(success){
	console.log(success);
}).catch(function(err){
	console.log(err);
}).done();