angular.module('assign')
.controller('EditAdminCtrl', ['$scope','$modalInstance','Admin', 'admin','toastr',
function ($scope, $modalInstance, Admin, admin, toastr) {

	$scope.admin = admin; // passed via resolve
	console.log('*** current admin...',$scope.admin);
	
	$scope.ok = function () {
    	$modalInstance.close('ok');
  	};
	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
  	};
	$scope.error = function(name) {
	    var s = $scope.form[name];
	    return s.$invalid && s.$dirty ? "has-error" : "";
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
  	$scope.update = function () {
		//if(!$scope.email || $scope.email === '') { return; }
		//admin.email = $scope.email || admin.email
		console.log('*** update. admin...', admin);
		admin.$update(function() { 
			console.log('*** updated?'); 
			$modalInstance.close('success');
			toastr.success('Update worked.','Admin Users', {closeButton: true});
		});
  	};

	function success(response){
		console.log("*** modal: success response...",response);
		$modalInstance.dismiss('success');
	};

  	function failure(response) {
		console.log("*** modal: failure response...",response);
		console.log("*** form = "+form)
		angular.forEach(response, function(errors, key) {
	  		angular.forEach(errors, function(e) {
		  		console.log('*** '+key+' '+e);
	      		$scope.form[key].$dirty = true;
	      		$scope.form[key].$setValidity(e, false);
	  		});
    	});
  	};

}]);

