app.controller('CustomerModalCtrl', ['$scope','$modalInstance','CustomerApiService','OptionsService','customer','toastr',
function ($scope, $modalInstance, CustomerApiService, OptionsService, customer, toastr) {
	
	$scope.customer = customer; // passed via resolve(s)
	
	$scope.cancel = function () {
    	$modalInstance.close('cancel');
  	};
	
	$scope.add = function () {
		console.log('*** CustomerModalCtrl add. customer...',$scope.customer);
		if(!$scope.customer.company_name || $scope.customer.company_name === '') { return; }
		CustomerApiService.create($scope.customer, success, failure );		
  	};
 	
  	$scope.update = function () {
		console.log('*** CustomerModalCtrl update. customer...'+$scope.customer);
		if(!$scope.customer.company_name || $scope.customer.company_name === '') { return; }
		customer.$update(success,failure);
  	};
		
	function success(response){
		console.log("*** CustomerModalCtrl: service success response...",response);
		toastr.success('Change worked.','Customer Users', {closeButton: true});
		$modalInstance.dismiss(response);
	};
	
  	function failure(response) {
		console.log("*** CustomerModalCtrl: service failure response...",response);
		//console.log("*** $form...",$scope.form)
		angular.forEach(response.data.errors, function(errors, key) {
	  		angular.forEach(errors, function(e) {
		  		//console.log('*** key='+key+' e...',e);
	      		$scope.form[key].$dirty = true;
	      		$scope.form[key].$setValidity(e, false);
	  		});
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
	  		angular.forEach(s.$error, function(key, value) {
	      		result.push(value);
	  		});
	  		return result.join(", ");
		}
	};

}]);

