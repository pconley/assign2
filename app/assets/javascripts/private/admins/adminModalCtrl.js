angular.module('assign')
.controller('AdminModalCtrl', ['$scope','$modalInstance','AdminService', 'admin','toastr',
function ($scope, $modalInstance, AdminService, admin, toastr) {
	
	$scope.admin = admin; // passed via resolve(s)
	
    $scope.genders = [
    	{ id: '', name: 'None' },
    	{ id: 'M', name: 'Male' },
        { id: 'F', name: 'Female' }
    ];    
    $scope.admin.selectedGender = $scope.genders[0];
	angular.forEach($scope.genders, function(g) {
		console.log('+++ gender...',g);
		if( $scope.admin.gender == g.id ) $scope.admin.selectedGender = g;
	});

    $scope.prefixes = [
    	{ id: '', name: '' },
    	{ id: 'Mr', name: 'Mr.' },
        { id: 'Ms', name: 'Ms.' },
        { id: 'Mrs', name: 'Mrs.' },
        { id: 'Dr', name: 'Dr.' },
    ];   
    $scope.admin.selectedPrefix = $scope.prefixes[0];
	angular.forEach($scope.prefixes, function(x) {
		if( $scope.admin.prefix == x.id ) $scope.admin.selectedPrefix = x;
	});

    $scope.suffixes = [
    	{ id: '', name: '' },
    	{ id: 'Jr', name: 'Jr.' },
        { id: 'Sr', name: 'Sr.' },
        { id: 'III', name: 'III' },
    ];   
    $scope.admin.selectedSuffix = $scope.suffixes[0];
	angular.forEach($scope.suffixes, function(x) {
		if( $scope.admin.suffix == x.id ) $scope.admin.selectedSuffix = x;
	});

	$scope.ok = function () {
    	$modalInstance.close('ok');
  	};
	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
  	};
	
	$scope.add = function () {
		console.log('*** AdminModalCtrl add. admin... = '+$scope.admin);
		if(!$scope.admin.email || $scope.admin.email === '') { return; }
		$scope.admin.gender = $scope.admin.selectedGender.id;
		$scope.admin.suffix = $scope.admin.selectedSuffix.id;
		$scope.admin.prefix = $scope.admin.selectedPrefix.id;
		AdminService.create($scope.admin, success, failure );		
  	};
 	
  	$scope.update = function () {
		console.log('*** AdminModalCtrl update. admin...'+$scope.admin);
		if(!$scope.admin.email || $scope.admin.email === '') { return; }
		$scope.admin.gender = $scope.admin.selectedGender.id;
		$scope.admin.suffix = $scope.admin.selectedSuffix.id;
		$scope.admin.prefix = $scope.admin.selectedPrefix.id;
		admin.$update(success,failure);
  	};
		
	function success(response){
		console.log("*** AdminModalCtrl: service success response...",response);
		toastr.success('Change worked.','Admin Users', {closeButton: true});
		$modalInstance.dismiss(response);
	};
	
  	function failure(response) {
		console.log("*** AdminModalCtrl: service failure response...",response);
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

