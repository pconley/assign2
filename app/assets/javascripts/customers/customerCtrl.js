angular.module('ngTerpsys')
.controller('CustomerCtrl', ['$scope','customersService','currentCustomer','screenSize','$log','$modal','$filter',
	function($scope,customersService,currentCustomer,screenSize,$log,$modal,$filter){
		
		$scope.error_message = '';
		$scope.customer = currentCustomer; // see the app.js resolve
		$scope.sortedCustomers = customersService.customers;
		$scope.totalCustomersCount = $scope.sortedCustomers.length;
		
		//****** sort, filter and paging **********
		$scope.sortType = '';
		$scope.sortCount = 0;
		$scope.sortReverse = false;
		$scope.setOrder = function(type) {
        	$scope.sortReverse = ($scope.sortType === type) ? !$scope.sortReverse : false;
        	$scope.sortType = type;
			//console.log('setOrder: '+$scope.sortType+' : '+$scope.sortReverse);
      	};
		$scope.$watch("sortType + sortReverse", function() {
			//console.log('sorting: '+$scope.sortType+' : '+$scope.sortReverse);
			var orderBy = $filter('orderBy');			
			$scope.sortedCustomers = orderBy($scope.sortedCustomers, $scope.sortType, $scope.sortReverse)
			$scope.sortCount += 1; // indicated a sort change occured
	  	});
		$scope.query = '';
		$scope.filterCount = true
		$scope.$watch("query + sortCount", function() {
			//console.log('filtering: '+$scope.query);
			$scope.filteredCustomers = $filter('filter')($scope.sortedCustomers, $scope.query) 
			$scope.filteredCustomersCount = $scope.filteredCustomers.length
			$scope.filterCount += 1; // indicates a filter change occured
			
	  	});	 
	  	$scope.currentPage = 1;
		$scope.numPerPage  = 3;   
		$scope.$watch("currentPage + numPerPage + filterCount", function() {
			//console.log('paging: '+$scope.currentPage);
	    	var begin = (($scope.currentPage - 1) * $scope.numPerPage);
	    	var end = begin + $scope.numPerPage;
	    	$scope.pagedCustomers = $scope.filteredCustomers.slice(begin, end);
			$scope.pageCount = $scope.filteredCustomers.length / $scope.numPerPage
	  	});
		//****** pagination **********		
		
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
				  windowClass: 'my-dialog',
				  //size: 'sm', // size,
				  resolve: { items: function () { return $scope.items; } }
				});
				modalInstance.result.then(function (selectedItem) {
					  console.log('*** model instance result. selectedItem...',selectedItem);
				      //$scope.selected = selectedItem;
				    }, function () {
				      $log.info('Modal dismissed at: ' + new Date());
				});
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
	
	$scope.error = function(name) {
	    var s = $scope.form[name];
	    return s.$invalid && s.$dirty ? "has-error" : "";
	};
	
	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
  	};

  	$scope.add = function () {
		if(!$scope.company_name || $scope.company_name === '') { return; }
		console.log('*** addCustomer');
		customersService.create({
	    	company_name: $scope.company_name,
			contact_name: $scope.contact_name
		}, $scope.ok, success, failure );
  	};

	function success(response){
		console.log("<<< success. response...",response);
		$modalInstance.dismiss('success');
	};

  	function failure(response) {
		console.log("<<< failure. response...",response);
		angular.forEach(response, function(errors, key) {
	  		angular.forEach(errors, function(e) {
		  		console.log('<<< '+key+' '+e);
	      		$scope.form[key].$dirty = true;
	      		$scope.form[key].$setValidity(e, false);
	  		});
    	});
  	};

}]);
