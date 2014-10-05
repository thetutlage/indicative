#!/usr/bin/env node

var validator = require('../indicative');
var Q  = require('q');

validator.initialize();

var rules = {
	'username': 'required|alpha|min:4',
	'email': 'required|email',
	'contact_no': 'phone_no',
	'gender': 'in:Male,Female,Other',
	'age':'range:18,70',
	'password':'required|min:4'
};

var values = {
	'username': 'nuran',
	'contact_no': '232-112-1210',
	'email': 'nu@example.com',
	'gender': 'Male',
	'age': 22,
	'password': 'johny'
};

var phone_no = function(value,args,message){
	var deferred = Q.defer();
	var phoneRe =/^(()?\d{3}())?(-|\s)?\d{3}(-|\s)?\d{4}$/;
	if(phoneRe.test(value)){
		deferred.resolve();
	}else{
		deferred.reject(message);
	}
	return deferred.promise;
}
validator.extend('phone_no','Enter valid phone no',phone_no);
validator.validate(rules,values).then(function(success){
	console.log(success);
}).catch(function(err){
	console.log(err);
}).done();