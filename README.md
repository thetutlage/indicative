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

Time and water does not wait for anyone , nor does javascript. Javascript asynchronous nature is great in many ways but at times makes it harder to work with loops specially when you are doing heavy operations. 

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


<a name="custom-error-messages"></a>
## Custom Error Messages

Above error message doesn't seems to be good , and can be more descriptive. Let's make it so.


```javascript

	var validator = require('indicative');
	validator.initialize();

	var rules = {
		'name' : 'required|alpha'
	};

	var values = {
		'name': 'johny123'
	};

	var messages = {
		'alpha': 'Name should only contain letters , numbers and special characters are not allowed'
	};

	// re call the same method

	validator.validate(rules,values,messages).then(function(success){
		console.log(success);
	}).catch(function(err){
		console.log(err);
	}).done();

```

Expected output

```
	{ name: [ { rule: 'alpha', message: 'Name should only contain letters , numbers and special characters are not allowed' } ] }
```

Now you can see your custom message getting printed instead of a system generated one. But there is one problem , above error is not personalized enough as it contains a word called <i>Name</i> , which makes it non usable for other fields like username , lastname and so on.


### Templating

Indicative also allows templating which means you can also access field name, values , rules and arguments inside your custom message , here is an example.

```javascript	
	var messages = {
		'alpha': '%field% should only contain letters , numbers and special characters are not allowed'
	};
```

You can access following

- **%field%** :- Field name
- **%value%** :- Value
- **%arg0%**  :- Validation rule argument 0 ( if exists ). Example after:2014-10-20 , writing %arg0% will return 2014-10-20.


### Fields spefic messages

You can also define messages for different fields.

```javascript	

	var validator = require('indicative');
	validator.initialize();
	var rules = {
		'name' : 'required|alpha',
		'lastname': 'required|alpha'
	};

	var values = {
		'name': 'johny123',
		'lastname': 'english80'
	};
	var messages = {
		'name':{
			'alpha': '%field% should only contain letters , numbers and special characters are not allowed'
		},
		'lastname':{
			'alpha': 'Hope your lastname is simple and does not have weird special characters or numbers'
		}
	};

	validator.validate(rules,values,messages).then(function(success){
			console.log(success);
	}).catch(function(err){
		console.log(err);
	}).done();
```

Expected output

```
{ name: 
   [ { rule: 'alpha',
       message: 'name should only contain letters , numbers and special characters are not allowed' } ],
  lastname: 
   [ { rule: 'alpha',
       message: 'Hope your lastname is simple and does not have weird special characters or numbers' } ] }

```

Cool so far right ? let's make it even better.

<a name="available-validation-rules"></a>

## Available Valiation Rules

I have covered plenty of usual validation rules.


- **required**
- **email**
- **after**
- **alpha**
- **alpha_num**
- **array**
- **before**
- **boolean**
- **required_if**
- **required_with**
- **required_with_all**
- **required_without**
- **required_without_all**
- **same**
- **in**
- **not_in**
- **date**
- **date_format**
- **different**
- **url**
- **ip**
- **range**
- **integer**
