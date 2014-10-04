var Q  = require('q');
var _ = require('lodash');
var validations = require('./lib/validations.js');
var messages = require('./lib/messages.js');
var Qvalidate = Q.defer();

var validator = {

	__errors:{},
	__methods: {},
	__exceptions:[],
	__builds:[],
	__values:{},
	__messages: {},
	__states: [],
	__cache: [],

	extend: function(rule,message,fn){
		if(_.isFunction(fn) && !_.isUndefined(rule) && !_.isUndefined(message)){
			this.__messages[rule] = message;
			this.__methods[rule] = fn;			
		}else{
			var string = 'Unable to extend ';
			string += !_.isUndefined(rule) ? rule: ' anonymous ';
			string += ' method, make sure you have passed a valid callback function ';
			this.__exceptions.push(string);
		}
	},

	initialize: function(){
		var self = this;
		self.__errors = {};
		self.__methods = {};
		self.__exceptions = [];
		self.__builds = [];
		self.__values = {};
		self.__messages = {};
		self.__states = [];
		self.__cache = [];
		self.__methods = _.merge(self.__methods,validations);
		self.__messages = _.merge(self.__messages,messages);
		self.__states = _.merge(self.__states,['initialized']);
		self.register();
	},

	validate:function(rules,values,messages,x){
		if(typeof(x) == 'undefined'){
			ix = 0;
		}else{
			ix = x;
		}
		var keys = _.keys(rules);
		var self = this;
		self.__values = values;
		var fields = keys[ix];
		var rule = rules[fields];
		var m = rule.split('|');

		self.setrule(m,fields,values[fields],rule,messages,0).then(function(){
		}).catch(function(e){
		}).done(function(){
			ix = ix+1;
			if(ix == _.size(keys)){
				if(_.size(self.__errors) > 0){
					Qvalidate.reject(self.__errors);
				}else{
					Qvalidate.resolve(values);
				}
			}else{
				self.validate(rules,values,messages,ix);
			}
		});
		return Qvalidate.promise;
	},

	register: function(){
		var self = this
		_.map(this.__methods,function(v,k){
			self.__methods[k] = function(value,args,gm){
				var deferred = Q.defer();
				v(self,value,args,gm).then(function(a){
					deferred.resolve();
				}).catch(function(err){
					deferred.reject(err);
				});
				return deferred.promise;
			};
		});
	},

	setrule: function(m,f,v,rule,messages,x,cb){
		var self = this;
		var i = m[x];
		var item_args = i.split(':');
		var item = item_args[0];
		item_args.splice(0,1);
		var iterate = 0;
		self.__cache = {};

		_.each(item_args,function(v,k){
			var argVal = v.split(',');
			_.each(argVal,function(item){
				self.__cache['arg'+iterate] = item;
				iterate++;
			});
		});

		if(typeof(self.__builds[f]) == 'undefined'){
			self.__builds[f] = Q.defer();
		}
		if(!_.isUndefined(messages[f]) && !_.isUndefined(messages[f][item])){
			gm = messages[f][item].replace('%field%',f).replace('%value%',v);
		}
		else if(typeof(messages[item]) == 'string'){
			gm = messages[item].replace('%field%',f).replace('%value%',v);
		}
		else{
			gm = self.__messages[item].replace('%field%',f).replace('%value%',v);
		}
		_.each(self.__cache,function(v,k){
			gm = gm.replace('%'+k+'%',v);
		});
		self.__methods[item](v,item_args,gm).then(function(){
			x++;
			if(x == _.size(m)){
				self.__builds[f].resolve();
			}else{
				self.setrule(m,f,v,rule,messages,x);
			}
		}).catch(function(error){
			if(typeof(self.__errors[f]) == 'undefined'){
				self.__errors[f] = [];
			}
			self.__errors[f].push({rule:item,message:error});
			x++;
			if(x == _.size(m)){
				self.__builds[f].reject();
			}else{
				self.setrule(m,f,v,rule,messages,x);
			}
		});
		return self.__builds[f].promise;
	}
};

var indactive = {};
indactive.validator = validator;
module.exports = indactive;
