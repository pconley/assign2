angular.module('assign')
.factory('OptionsService', [function(){
	var o = {
	    genders: [
		    	{ id: '', name: 'Nada' },
		    	{ id: 'M', name: 'Male' },
		        { id: 'F', name: 'Female' }
	    ],
	    prefixes: [
		    	{ id: '', name: '' },
		    	{ id: 'Mr', name: 'Mr.' },
		        { id: 'Ms', name: 'Ms.' },
		        { id: 'Mrs', name: 'Mrs.' },
		        { id: 'Dr', name: 'Dr.' },
		],
		suffixes: [
		    	{ id: '', name: '' },
		    	{ id: 'Jr', name: 'Jr.' },
		        { id: 'Sr', name: 'Sr.' },
		        { id: 'III', name: 'III' },
		],
	};
	
	o.getGender = function(id) { return o.getOption(id,o.genders); };
	o.getPrefix = function(id) { return o.getOption(id,o.suffixes); };
	o.getSuffix = function(id) { return o.getOption(id,o.prefixes); };
		
	o.getOption = function(id,options) {
		rc = options[0] // default
		angular.forEach(options, function(opt) {
			if( opt.id == id ) rc = opt;
		});
		return rc;
	};
	
	return o;
}]);