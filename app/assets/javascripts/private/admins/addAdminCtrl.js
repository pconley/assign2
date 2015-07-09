angular.module('assign')
.controller('AddAdminCtrl', ['$scope','$modalInstance','Admin','toastr',
function ($scope, $modalInstance, Admin, toastr) {
	
    $scope.genders = [
    	{ id: '', name: 'None' },
    	{ id: 'M', name: 'Male' },
        { id: 'F', name: 'Female' }
    ];    
    $scope.selectedGender = $scope.genders[0];

    $scope.prefixes = [
    	{ id: '', name: '' },
    	{ id: 'Mr', name: 'Mr.' },
        { id: 'Ms', name: 'Ms.' },
        { id: 'Mrs', name: 'Mrs.' },
        { id: 'Dr', name: 'Dr.' },
    ];   
    $scope.selectedPrefix = $scope.prefixes[0];

    $scope.suffixes = [
    	{ id: '', name: '' },
    	{ id: 'Jr', name: 'Jr.' },
        { id: 'Sr', name: 'Sr.' },
        { id: 'III', name: 'III' },
    ];   
    $scope.selectedSuffix = $scope.suffixes[0];

	$scope.admin = {};
	console.log('*** current admin...',$scope.admin);
	
	$scope.ok = function () {
    	$modalInstance.close('ok');
  	};
	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
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
 	$scope.add = function () {
		console.log('*** add admin. email = '+$scope.admin.email);
		if(!$scope.admin.email || $scope.admin.email === '') { return; }
		Admin.create({
	    	email: $scope.admin.email,
			password: $scope.admin.password,
			first_name: $scope.admin.first_name,
			last_name: $scope.admin.last_name,
			middle_name: $scope.admin.middle_name,
			gender: $scope.selectedGender.id,
			suffix: $scope.selectedSuffix.id,
			prefix: $scope.selectedPrefix.id,
		}, success, failure );
  	};

	function success(response){
		console.log("*** modal: success response...",response);
		$modalInstance.dismiss('success');
	};

  	function failure(response) {
		console.log("*** modal: failure response...",response);
		console.log("*** form...",form)
		console.log("*** $form...",$scope.form)
		angular.forEach(response.data.errors, function(errors, key) {
	  		angular.forEach(errors, function(e) {
		  		console.log('*** key='+key+' e...',e);
				form_key = key;
	      		$scope.form[key].$dirty = true;
	      		$scope.form[key].$setValidity(e, false);
	  		});
    	});
  	};

}]);

