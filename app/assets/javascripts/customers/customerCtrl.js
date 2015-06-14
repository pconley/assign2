angular.module('ngTerpsys')
.controller('CustomerCtrl', ['$scope','customersService','currentCustomer','screenSize','$log','$modal',
	function($scope,customersService,currentCustomer,screenSize,$log,$modal){
		$scope.customer = currentCustomer; // see the app.js resolve
		$scope.customers = customersService.customers;
		
		$scope.desktop = screenSize.on('sm, md, lg', function(match){
		    $scope.desktop = match;
		});
		$scope.mobile = screenSize.on('xs', function(match){
		    $scope.mobile = match;
		});
		
		$scope.animationsEnabled = true;

	  	$scope.openAddCustomer = function (size) {
		  console.log('*** openAddCustomer. size='+size);
			    var modalInstance = $modal.open({
			      animation: $scope.animationsEnabled,
			      templateUrl: 'customers/_addCustomer.html',
				  controller: 'CustomerModalInstanceCtrl',
				  size: size,
				  resolve: { items: function () { return $scope.items; } }
				});
				modalInstance.result.then(function (selectedItem) {
					  console.log('*** here');
				      //$scope.selected = selectedItem;
				    }, function () {
				      $log.info('Modal dismissed at: ' + new Date());
				});
		};
	  					
		$scope.addCustomer = function(){
		  if(!$scope.company_name || $scope.company_name === '') { return; }
		  console.log('*** addCustomer');
		  customersService.create({
		    company_name: $scope.company_name,
			contact_name: $scope.contact_name
		  });
		  $scope.company_name = '';
		  $scope.contact_name = '';
		};
		$scope.updateCustomer = function(){
		  console.log('*** updateCustomer');
		  customersService.update(currentCustomer);
		};
		$scope.deleteCustomer = function(customer){		
		  if (confirm("Are you sure you want to delete this customer?") == true) {
		  	var index = $scope.customers.indexOf(customer);
		  	console.log('*** deleteCustomer at index ='+index+' ...',customer);
		  	customersService.delete(customer);
		  }
		};
	}
]);

// Note that $modalInstance represents a modal window (instance) 
// dependency. It is not the same as the $modal service used above.
angular.module('ngTerpsys')
.controller('CustomerModalInstanceCtrl', ['$scope','$modalInstance','customersService', 
function ($scope, $modalInstance, customersService) {

  $scope.ok = function () {
    $modalInstance.close('ok');
  };

  $scope.add = function () {
	if(!$scope.company_name || $scope.company_name === '') { return; }
	console.log('*** addCustomer');
	customersService.create({
	    company_name: $scope.company_name,
		contact_name: $scope.contact_name
	});
	$scope.company_name = '';
	$scope.contact_name = '';
    $modalInstance.close('add');
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}]);
