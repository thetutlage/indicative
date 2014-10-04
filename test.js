#!/usr/bin/env node

var validator = require('./indicative');
var Q  = require('q');

validator.initialize();

var rules = {
	'name' : 'required|alpha'
};

var values = {
	'name': 'johny123'
};

validator.validate(rules,values).then(function(success){
	console.log(success);
}).catch(function(err){
	console.log(err);
}).done();


// var rules = {
// 	'name' : 'required|alpha',
// 	'email' : 'required|email',
// 	'mobile_no': 'required',
// 	'alternate_email': 'different:email',
// 	'phone_no':'required_if:email,amanvirk@gmail.com',
// 	'date'	: 'after:2014-10-02|before:2014-10-10',
// 	'users'	: 'required|array',
// 	'sms'	: 'required_without:phone_no,mobile_no',
// 	'is_reachable': 'required_without_all:mobile_no',
// 	'terms': 'boolean',
// 	'account_status': 'not_in:Active,Inactive',
// 	'created_on': 'date_format:YYYY-MM-DD',
// 	'blog': 'url',
// 	'ip_address': 'ip',
// 	'age': 'range:18,24',
// 	'class': 'integer'
// };

// var values = {
// 	'name': 'john',
// 	'password': 'jonhy',
// 	'user_status': '',
// 	'email': 'john@example.com',
// 	'alternate_email': 'john@example.com',
// 	'phone_no': '991201002',
// 	'sms': '',
// 	'mobile_no': '99619399310',
// 	'is_reachable' : '',
// 	'date': '2014-10-01',
// 	'users': ["john"],
// 	'terms': 1,
// 	'account_status': 'confirmed',
// 	'created_on': '10/10/2014',
// 	'blog': 'https://facebook.com',
// 	'ip_address': '127.0.0.1',
// 	'age': '20',
// 	'class': 22.10
// };

// var messages = {
// 	'required': '%field% is required',
// 	'email':{
// 		'email': '%value% is not a valid email address'
// 	}
// };

// var phone_no = function(value,args,message){
// 	var deferred = Q.defer();
// 	var phoneRe =/^(()?\d{3}())?(-|\s)?\d{3}(-|\s)?\d{4}$/;
// 	if(phoneRe.test(value)){
// 		deferred.resolve();
// 	}else{
// 		deferred.reject(message);
// 	}
// 	return deferred.promise;
// }

// validator.initialize();
// validator.extend('phone_no','Enter valid phone no',phone_no);

// validator.validate(rules,values).then(function(success){
// 	console.log(success);
// }).catch(function(err){
// 	console.log(err);
// }).done();


