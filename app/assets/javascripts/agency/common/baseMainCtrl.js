app.controller('BaseMainCtrl', ['$scope','$modal','service', function($scope,$modal,service) {
		
	$scope.toggleDetails = function(row){ toggle_row(row,$scope.rowsCollection) };
	
	$scope.deleteResource = function(row){
		console.log('*** BaseMainCtrl#delete resource. row...',row);
		row.$delete(function(row) {
			console.log('*** BaseMainCtrl back from delete');
			var index = $scope.rowsCollection.indexOf(row);
		  	$scope.rowsCollection.splice(index, 1);
		}); 
	}
	
	$scope.openAddResource = function(url,ctrl) {
		console.log('*** BaseMainCtrl#openAddResource');
		console.log('*** BaseMainCtrl url = '+url);
		console.log('*** BaseMainCtrl ctrl = '+ctrl);
		var modalInstance = $modal.open({
			backdrop: true,   // the combination of a backdrop and animate is
		    animation: false, // failing to release backdrop so these settings
		    templateUrl: url,
			controller: ctrl,
			// modal controller expects some resource provider
			// but just an empty record for the add function
		    resolve: { resource: function () { return {}; } }
		});
		modalInstance.result.then(
			function (returnValue) {
				// this function is triggered if modal's close function is used
				console.log('*** BaseMainCtrl add modal return1...',returnValue);
			}, function (returnValue) {
				// this function is triggered if modal's dismiss function is used
				console.log('*** BaseMainCtrl add modal return2...',returnValue);
				if( typeof returnValue === 'object' ){
					// return value is the newly added resource
					$scope.rowsCollection.push(returnValue)
				}				
			}
		);
	};
	
	$scope.openEditResource = function (url, ctrl, resource) {
		console.log('*** openEditResource. resource...',resource);
		var modalInstance = $modal.open({
			backdrop: true,   // the combination of a backdrop and animate is
		    animation: false, // failing to release backdrop so these setting
		    templateUrl: url,
			controller: ctrl,
			// pass the resource on to the modal via resolve
		    resolve: { resource: function () { return resource; } }			    
		});
		modalInstance.result.then(
			function (returnValue) {
				// this function is triggered if modal's close function is used
				console.log('*** BaseMainCtrl edit modal return1 = '+returnValue);
			}, function (returnValue) {
				console.log('*** BaseMainCtrl edit modal return2...',returnValue);
				// this function is triggered if modal's dismiss function is used
				// return value is the (potentially) changed customer record
			}
		);
	};
	
}]);