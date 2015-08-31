'use strict';

app.factory('AccessService', [ function () {
		
	var retval = {allowed: 'access_allowed', required: 'login_required', denied: 'access_denied'}
		
 	var access = function calculate(user,role){
		if( !role ) return retval.allowed;
		else if( !user ) return retval.required;
		else if( user.role === 'admin' ) return retval.allowed;
		else if( user.role === role ) return retval.allowed;
    	else return retval.denied;
	}
	var home = function(user){
		if( !user ) return 'public';
		if( user.role === 'admin' ) return 'agency.dashboard';
		if( user.role === 'interpreter' ) return 'terps';
		return 'public';
	}
    return {
    	access: access,
		home: home,
		retval: retval
    };
}]);