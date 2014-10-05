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


- [required](#rule-required)
- [email](#rule-email)
- [after](#rule-after)
- [alpha](#rule-alpha)
- [alpha_num](#rule-alpha_num)
- [array](#rule-array)
- [before](#rule-before)
- [boolean](#rule-boolean)
- [required_if](#rule-required_if)
- [required_with](#rule-required_with)
- [required_with_all](#rule-required_with_all)
- [required_without](#rule-required_without)
- [required_without_all](#rule-required_without_all)
- [same](#rule-same)
- [in](#rule-in)
- [not_in](#rule-not_in)
- [date](#rule-date)
- [date_format](#rule-date_format)
- [different](#rule-different)
- [url](#rule-url)
- [ip](#rule-ip)
- [range](#rule-range)
- [integer](#rule-integer)


<a name="rule-required"></a>

#### required

The field under validation must be present and should contain some value

<a name="rule-email"></a>

#### email

The field under validation must be formatted as an email-address.

<a name="rule-after"></a>

#### after:date

The field under validation must be after a given date. Example after:2014-10-20

<a name="rule-alpha"></a>

#### alpha

The field under validation must be letters only.

<a name="rule-alpha_num"></a>

#### alpha_num

The field under validation can contain letters, numbers for combination of both.

<a name="rule-array"></a>

#### array

The field under validation must be a valid array.

<a name="rule-before"></a>

#### before:date

The field under validation must be before a given date. Example after:2014-10-20

<a name="rule-boolean"></a>

#### boolean

The field under validation must be a valid boolean, `true` , `false`, `0` and `1` is treated as valid 
array.

<a name="rule-required_if"></a>

#### required_if:field,value

The field under validation must be present and should not be emptfy if `field` field is equal to `value`.

<a name="rule-required_with"></a>

#### required_with:foo,bar,...

The field under validation must be present and should not be empty if any of the other fields are present.

<a name="rule-required_with_all"></a>

#### required_with_all:foo,bar,...

The field under validation must be present and should not be empty if all of the other fields are present.

<a name="rule-required_without"></a>

#### required_without:foo,bar,...

The field under validation must be present and should not be empty if any of the other fields are not present.

<a name="rule-required_without_all"></a>

#### required_without_all:foo,bar,...

The field under validation must be present and should not be empty if all of the other fields are not present.

<a name="rule-same"></a>

#### same:field

The field under validation must watch the given `field`

<a name="rule-in"></a>

#### in:foo,bar,...

The field must be in one of the given list of values.

<a name="rule-not_in"></a>

#### not_in:foo,bar,...

The field must not be in one of the given list of values.

<a name="rule-date"></a>

#### date

The field under validation must be a valid date, MM/DD/YYYY, MM-DD-YYYY, YYYY-MM-DD,YYYY/MM/DD date 
formats are supported by default.

<a name="rule-date_format"></a>

#### date_format:format

The field under validation must be a valid date and should match specified date format.

<a name="rule-different"></a>

#### different:field

The field under validation should be different from the given `field`

<a name="rule-url"></a>

#### url:field

The field under validation must be a valid url. `http`, `https` and `ftp` is supported.

<a name="rule-ip"></a>

#### ip

The field under validation must be a valid ip address.

<a name="rule-range"></a>

#### range:18,24

The field under validation must be under defined range. Range must be integer or float.

<a name="rule-integer"></a>

#### integer

The field under validation must be a valid integer.

