var Q  = require('q');
var _ = require('lodash');
var moment = require('moment');

module.exports = {

	required: function(ref,value,args,gm){
		var deferred = Q.defer();
		if(_.isUndefined(value) || _.isEmpty(value.toString())){
			deferred.reject(gm);
		}else{
			deferred.resolve();
		}
		return deferred.promise;
	},

	accepted: function(ref,value,args,gm){
		var deferred = Q.defer();
		if(value){
			deferred.resolve();
		}
		else{
			deferred.reject(gm);
		}
		return deferred.promise;
	},

	after: function(ref,value,args,gm){
		var deferred = Q.defer();
		var date = args[0];

		if(moment(value).isAfter(date)){
			deferred.resolve();
		}else{
			deferred.reject(gm);
		}
		return deferred.promise;
	},

	email: function(ref,value,args,gm){
		var deferred = Q.defer();
		var email_regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(email_regex.test(value)){
			deferred.resolve();
		}else{
			deferred.reject(gm);
		}
		return deferred.promise;
	},

	alpha: function(ref,value,args,gm){
		var deferred = Q.defer();
		var letters = /^[A-Za-z]+$/;
		if(letters.test(value)){
			deferred.resolve();
		}else{
			deferred.reject(gm);
		}
		return deferred.promise;
	},

	alpha_num: function(ref,value,args,gm){
		var regex = /^([0-9]|[a-z])+([0-9a-z]+)$/i;
		var deferred = Q.defer();
		if(regex.test(value)){
			deferred.resolve();
		}else{
			deferred.reject(gm);
		}
		return deferred.promise;
	},

	array: function(ref,value,args,gm){
		var deferred = Q.defer();
		if(_.isArray(value)){
			deferred.resolve();
		}else{
			deferred.reject(gm);
		}
		return deferred.promise;
	},

	before: function(ref,value,args,gm){
		var deferred = Q.defer();
		var date = args[0];

		if(moment(value).isBefore(date)){
			deferred.resolve();
		}else{
			deferred.reject(gm);
		}
		return deferred.promise;
	},

	boolean: function(ref,value,args,gm){
		var deferred = Q.defer();
		if(_.isBoolean(value) || value === 0 || value === 1){
			deferred.resolve();
		}else{
			deferred.reject(gm);
		}
		return deferred.promise;
	},

	required_if: function(ref,value,args,gm){
		var deferred = Q.defer();
		var seperate = args[0].split(',');
		if(_.size(seperate) == 2){
			if(ref.__values[seperate[0]].toString() == seperate[1].toString() && (_.isUndefined(value) || _.isEmpty(value))){
				deferred.reject(gm);
			}else{
				deferred.resolve();
			}
		}else{
			deferred.reject(gm);
		}
		return deferred.promise;
	},

	required_with: function(ref,value,args,gm){
		var deferred = Q.defer();
		var seperate = args[0].split(',');
		var iteration = 0;
		var present = 0;

		_.each(seperate,function(v){
			iteration++;
			if(!_.isUndefined(ref.__values[v]) && (_.isUndefined(value) || _.isEmpty(value))){
				present++;
			}
			if(iteration == _.size(seperate)){
				if(present > 0 && _.isEmpty(value)){
					deferred.reject(gm);
				}else{
					deferred.resolve();
				}
			}
		});
		return deferred.promise;
	},

	required_without: function(ref,value,args,gm){
		var deferred = Q.defer();
		var seperate = args[0].split(',');
		var iteration = 0;
		var present = 0;

		_.each(seperate,function(v){
			iteration++;
			if(_.isUndefined(ref.__values[v]) && (_.isUndefined(value) || _.isEmpty(value))){
				present++;
			}
			if(iteration == _.size(seperate)){
				if(present > 0 && _.isEmpty(value)){
					deferred.reject(gm);
				}else{
					deferred.resolve();
				}
			}
		});
		return deferred.promise;
	},

	required_with_all: function(ref,value,args,gm){
		var deferred = Q.defer();
		var seperate = args[0].split(',');
		var iteration = 0;
		var present = 0;
		_.each(seperate,function(v){
			iteration++;
			if(!_.isUndefined(ref.__values[v])){
				present++;
			}
			if(iteration == _.size(seperate)){
				if(present == _.size(seperate) && (_.isUndefined(value) || _.isEmpty(value))){
					deferred.reject(gm);
				}else{
					deferred.resolve();
				}
			}
		});
		return deferred.promise;
	},

	required_without_all: function(ref,value,args,gm){
		var deferred = Q.defer();
		var seperate = args[0].split(',');
		var iteration = 0;
		var present = 0;
		_.each(seperate,function(v){
			iteration++;
			if(_.isUndefined(ref.__values[v])){
				present++;
			}
			if(iteration == _.size(seperate)){
				if(present == _.size(seperate) && (_.isUndefined(value) || _.isEmpty(value))){
					deferred.reject(gm);
				}else{
					deferred.resolve();
				}
			}
		});
		return deferred.promise;
	},

	same: function(ref,value,args,gm){
		var deferred = Q.defer();
		if(ref.__values[args[0]] == value){
			deferred.resolve();
		}else{
			deferred.reject(gm);
		}
		return deferred.promise;
	},

	different: function(ref,value,args,gm){
		var deferred = Q.defer();
		if(ref.__values[args[0]] !== value){
			deferred.resolve();
		}else{
			deferred.reject(gm);
		}
		return deferred.promise;
	},

	in: function(ref,value,args,gm){
		var deferred = Q.defer();
		var options = args[0].split(',');
		if(_.contains(options,value)){
			deferred.resolve();
		}else{
			deferred.reject(gm);
		}
		return deferred.promise;
	},

	not_in: function(ref,value,args,gm){
		var deferred = Q.defer();
		var options = args[0].split(',');
		if(!_.contains(options,value)){
			deferred.resolve();
		}else{
			deferred.reject(gm);
		}
		return deferred.promise;		
	},

	date: function(ref,value,args,gm){
		var deferred = Q.defer();
		var formats = ["MM/DD/YYYY", "MM-DD-YYYY", "YYYY-MM-DD","YYYY/MM/DD"];
		if(moment(value,formats,true).isValid()){
			deferred.resolve();
		}else{
			deferred.reject(gm);
		}
		return deferred.promise;
	},

	date_format: function(ref,value,args,gm){
		var deferred = Q.defer();
		if(moment(value,[args[0]], true).isValid()){
			deferred.resolve();
		}else{
			deferred.reject(gm);
		}
		return deferred.promise;
	},

	equals: function(ref,value,args,gm){
		var deferred = Q.defer();
		if(args[0].toLowerCase() == value.toLowerCase()){
			deferred.resolve();
		}else{
			deferred.reject(gm);
		}
		return deferred.promise;
	},

	url: function(ref,value,args,gm){
		var deferred = Q.defer();
		var regex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
		if(regex.test(value)){
			deferred.resolve();
		}else{
			deferred.reject(gm);
		}
		return deferred.promise;
	},

	ip: function(ref,value,args,gm){
		var deferred = Q.defer();
		var regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/i
		if(regex.test(value)){
			deferred.resolve();
		}else{
			deferred.reject(gm);
		}
		return deferred.promise;
	},

	integer: function(ref,value,args,gm){
		var deferred = Q.defer();
		if(_.isNumber(parseInt(value))){
			deferred.resolve();
		}else{
			deferred.reject(gm);
		}
		return deferred.promise;
	},

	range: function(ref,value,args,gm){
		var deferred = Q.defer();
		var ranges = args[0].split(',');
		if(_.size(ranges) == 2){
			if(value >= ranges[0] && value <= ranges[1]){
				deferred.resolve();
			}else{
				deferred.reject(gm);
			}
		}else{
			deferred.reject(gm);
		}
		return deferred.promise;
	},

	min: function(ref,value,args,gm){
		var deferred = Q.defer();
		if(_.size(value) >= args[0]){
			deferred.resolve();
		}else{
			deferred.reject(gm);
		}
		return deferred.promise;
	},

	max: function(ref,value,args,gm){
		var deferred = Q.defer();
		if(_.size(value) <= args[0]){
			deferred.resolve();
		}else{
			deferred.reject(gm);
		}
		return deferred.promise;
	}

}