angular.module('assign')
.controller('AgencyAdminCtrl', ['$scope','$modalInstance','AdminService','OptionsService','admin','toastr',
function ($scope, $modalInstance, AdminService, OptionsService, admin, toastr) {
	
	$scope.admin = admin; // passed via resolve(s)
	
    $scope.genders = OptionsService.genders;
    $scope.admin.selectedGender = OptionsService.getGender(admin.gender);

    $scope.prefixes = OptionsService.prefixes;
    $scope.admin.selectedPrefix = OptionsService.getPrefix(admin.prefix);

    $scope.suffixes = OptionsService.suffixes;
    $scope.admin.selectedSuffix = OptionsService.getSuffix(admin.suffix);

	$scope.cancel = function () {
    	$modalInstance.close('cancel');
  	};
	
	$scope.add = function () {
		console.log('*** AdminModalCtrl add. admin... = '+$scope.admin);
		if(!$scope.admin.email || $scope.admin.email === '') { return; }
		copy_selections(admin);
		AdminService.create($scope.admin, success, failure );		
  	};
 	
  	$scope.update = function () {
		console.log('*** AdminModalCtrl update. admin...'+$scope.admin);
		if(!$scope.admin.email || $scope.admin.email === '') { return; }
		copy_selections(admin);
		admin.$update(success,failure);
  	};

	function copy_selections(record){
		record.gender = record.selectedGender.id;
		record.suffix = record.selectedSuffix.id;
		record.prefix = record.selectedPrefix.id;
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

