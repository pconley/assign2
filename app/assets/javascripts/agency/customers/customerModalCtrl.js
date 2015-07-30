app.controller('CustomerModalCtrl', ['$scope','$controller','$modalInstance','CustomerApiService','OptionsService','resource','toastr',
function ($scope, $controller, $modalInstance, CustomerApiService, OptionsService, resource, toastr) {
	
	$controller('BaseModalCtrl', {$scope: $scope, $modalInstance: $modalInstance, toastr: toastr}); 
	
	$scope.customer = resource; // passed via resolve(s) used (and modified) in the form
	
	var rules = { company_name: 'required', contact_name: 'required', contact_email: 'email' };
		
	$scope.add = function () { $scope.create(CustomerApiService,$scope.customer,rules) };
 	
  	$scope.update = function () { $scope.change($scope.customer,rules) };
			
}]);

