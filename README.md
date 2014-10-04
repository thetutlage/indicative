indicative
==========

Indicative is a beautiful Laravel inspired validation library for Nodejs with powerful promises. A took out a
day to write this library as i was not able to find a simple and easy to use library which is also extendable.

After using Laravel and ROR it was very frustating by not getting any powerful and promises based validation module for nodejs.

Index
========

- [Philosphy](#philosphy)
- [Basic Usage](#basic-usage)
- [Custom Error Messages](#custom-error-messages)
- [Available Valiation Rules](#available-validation-rules)
- [Custom Validation Rules](#custom-valiation-rules)


<a name="philosphy"></a>
## Philosphy

Time and water does not wait for anyone , nor does javascript. Javascript asynchronous is great in many ways but at times makes it harder to work with loops specially when you are doing heavy operations. 

This is where promises comes into picture, unlike time and water when you make a promise with someone in real life, they will wait for you until you fulfill or break your promise. That what promises are in javascript.

Indicative returns and accept promises only, every time you validate or extend indicative validator it accepts and returns a promise and to do it makes use of https://www.npmjs.org/package/q .


<a name="basic-usage"></a>
## Basic Usage

It is very simple to use **indicative**

```javascript
	var validator = require('indicative');
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

```

Expected output

```
	{ name: [ { rule: 'alpha', message: 'name should be alpha only' } ] }
```


What you just did is 

- Require the indicative module.
- Initialized it , it is very important to initialize as it register and extend methods.
- We called a method validate and passed rules and values to run validations on.
