app.controller('BaseModalCtrl', ['$scope', '$modalInstance','toastr', function($scope,$modalInstance,toastr) {
	
	$scope.cancel = function () {
    	$modalInstance.close('cancel');
  	};

	$scope.create = function (service, resource, rules) { 
		console.log('*** BaseModalCtrl#create. resource...',resource);
		if( validate(rules) ) service.create(resource, success, failure );		
  	};

  	$scope.change = function (resource) { 
		console.log('*** BaseModalCtrl#change. resource...',resource);
		if( validate(rules) ) resource.$update(success,failure);
	};	
	
	function validate(rules){		
		console.log('*** CustomerModalCtrl validate. customer...',$scope.customer);
		var passes = true;
		$scope.form.$setPristine(); // clear previous error msgs	
		angular.forEach(rules, function(rule, field) {
			console.log('--- field='+field+' rule='+rule);
			var value = $scope.customer[field];
			if( rule === 'required' ){
				if( !value || value === '') { 
					$scope.setError(['is required!'],field)
					passes = false; 
				}
			} else if( rule === 'email' ){
				if( !value || value === '') { 
					// not present... do not validate
					console.log('--- value = '+value);
				} else if( !validateEmail(value) ){
					$scope.setError(['must be an email address!'],field)
					passes = false; 
				}			
			} else {
				console.log('--- unknown rule = '+rule);
			}
		});
		return passes;		
	}
	
	function validateEmail(email) {
	    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	    return re.test(email);
	}

	function success(response){
		console.log("*** BaseModalCtrl: service success response...",response);
		toastr.success('DB Change worked.','Customer Users', {closeButton: true});
		$modalInstance.dismiss(response);
	};
	
  	function failure(response) {
		console.log("*** BaseModalCtrl: service failure response...",response);
		angular.forEach(response.data.errors, function(errors, key) {
			$scope.setError(errors,key);
    	});
  	};

	$scope.setError = function(errors,key) {
		//console.log("*** BaseModalCtrl: set errors...",errors);
		angular.forEach(errors, function(e) {
			  //console.log('*** key='+key+' e...',e);
		      $scope.form[key].$dirty = true;
		      $scope.form[key].$setValidity(e, false);
		 });
	};
		
	$scope.error = function(name) {
	    var s = $scope.form[name];
		if( s == null ){
			return ''
		} else {
	    	return s.$invalid && s.$dirty ? "has-error" : "";
		}
	};
	
	$scope.errorMessage = function(name) {
	  	result = [];
	    var s = $scope.form[name];
		if( s == null ){
			return ''
		} else {
			//console.log(name+' $error...',s.$error)
	  		angular.forEach(s.$error, function(key, value) {
				//console.log('key='+key+' value='+value);
	      		result.push(value);
	  		});
	  		x = result.join(", ");
			//console.log('x = '+x);
			return x;
		}
	};

}]);