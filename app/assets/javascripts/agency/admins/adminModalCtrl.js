angular.module('assign')
.controller('AdminModalCtrl', ['$scope','$controller','$modalInstance','AdminService','OptionsService','resource','toastr',
function ($scope, $controller, $modalInstance, AdminService, OptionsService, resource, toastr) {
	
	$controller('BaseModalCtrl', {$scope: $scope, $modalInstance: $modalInstance, toastr: toastr}); 
	
	$scope.admin = resource; // passed via resolve(s) used (and modified) in the form
	
	var rules = { email: 'required' };
		
	$scope.add = function () { $scope.create(AdminService,$scope.admin,rules) };
 	
  	$scope.update = function () { $scope.change($scope.admin,rules) };
	
    $scope.genders = OptionsService.genders;
    $scope.admin.selectedGender = OptionsService.getGender(resource.gender);

    $scope.prefixes = OptionsService.prefixes;
    $scope.admin.selectedPrefix = OptionsService.getPrefix(resource.prefix);

    $scope.suffixes = OptionsService.suffixes;
    $scope.admin.selectedSuffix = OptionsService.getSuffix(resource.suffix);

	$scope.xcancel = function () {
    	$modalInstance.close('cancel');
  	};
	
	$scope.xadd = function () {
		console.log('*** AdminModalCtrl add. admin... = '+$scope.admin);
		if(!$scope.admin.email || $scope.admin.email === '') { return; }
		copy_selections(resource);
		AdminService.create($scope.admin, success, failure );		
  	};
 	
  	$scope.xupdate = function () {
		console.log('*** AdminModalCtrl update. admin...'+$scope.admin);
		if(!$scope.admin.email || $scope.admin.email === '') { return; }
		copy_selections(resource);
		resource.$update(success,failure);
  	};

	function copy_selections(record){
		record.gender = record.selectedGender.id;
		record.suffix = record.selectedSuffix.id;
		record.prefix = record.selectedPrefix.id;
	};
		
	function xsuccess(response){
		console.log("*** AdminModalCtrl: service success response...",response);
		toastr.success('Change worked.','Admin Users', {closeButton: true});
		$modalInstance.dismiss(response);
	};
	
  	function xfailure(response) {
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

	$scope.xerror = function(name) {
	    var s = $scope.form[name];
		if( s == null ){
			return ''
		} else {
	    	return s.$invalid && s.$dirty ? "has-error" : "";
		}
	};
	$scope.xerrorMessage = function(name) {
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

