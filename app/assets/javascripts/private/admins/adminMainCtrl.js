angular.module('assign')
.controller('AdminsCtrl', ['$scope','AdminService','$modal','$filter','toastr',
	function($scope,AdminService,$modal,$filter,toastr){
		
		$scope.rowCollection = [];
		$scope.displayCollection = [];
						
		$scope.admins = AdminService.query(function() { 
			// after the query finished...
			console.log('*** retrieved admins. count='+$scope.admins.length);
		    // copy the references (you could clone ie angular.copy but then 
			// have to go through a dirty checking for the matches)
		    $scope.rowCollection = [].concat($scope.admins);
		    $scope.displayedCollection = [].concat($scope.admins);
		});
		
		$scope.name = function(admin){
			name = ''
			if( admin.last_name) name += admin.last_name
			if( admin.first_name) name += ', ' + admin.first_name
			if( admin.middle_name ) name += ' ' + admin.middle_name
			return name
		}
		
		// $scope.genders = [
		// 	    	{ id: '', name: 'None' },
		// 	    	{ id: 'M', name: 'Male' },
		// 	        { id: 'F', name: 'Female' }
		// 	    ];    
		// 	    $scope.selectedGender = $scope.genders[0];
		// 
		// 	    $scope.prefixes = [
		// 	    	{ id: '', name: '' },
		// 	    	{ id: 'Mr', name: 'Mr.' },
		// 	        { id: 'Ms', name: 'Ms.' },
		// 	        { id: 'Mrs', name: 'Mrs.' },
		// 	        { id: 'Dr', name: 'Dr.' },
		// 	    ];   
		// 	    $scope.selectedPrefix = $scope.prefixes[0];
		// 
		// 	    $scope.suffixes = [
		// 	    	{ id: '', name: '' },
		// 	    	{ id: 'Jr', name: 'Jr.' },
		// 	        { id: 'Sr', name: 'Sr.' },
		// 	        { id: 'III', name: 'III' },
		// 	    ];   
		// 	    $scope.selectedSuffix = $scope.suffixes[0];
			
		$scope.deleteAdmin = function(admin){
			console.log('*** delete admin. admin...',admin);
			admin.$delete(function(admin) {
				console.log('*** back in controller');
				var n1 = $scope.rowCollection.indexOf(admin);
			  	$scope.rowCollection.splice(n1, 1);
				var n2 = $scope.displayCollection.indexOf(admin);
			  	$scope.displayCollection.splice(n2, 1);
			}); 
		}
		
		$scope.openAddAdmin = function () {
			console.log('*** openAddAdmin');
			var modalInstance = $modal.open({
				backdrop: true,   // the combination of a backdrop and animate is
			    animation: false, // failing to release backdrop so these settings
			    templateUrl: 'private/admins/addAdmin.html',
				controller: 'AdminModalCtrl',
				// modal controller expects some admin provider
				// but just an empy record for the add function
			    resolve: { admin: function () { return {}; } }
			});
			console.log('--- modal instance...',modalInstance);
			modalInstance.result.then(
				function (returnValue) {
					// i am not sure when, if ever this function is triggered
					console.log('*** openAddAdmin modal function#1 returned...',returnValue);
					alert('modal instance finction 1 triggered');
					true; // or why this?
				}, function (returnValue) {
					console.log('*** openAddAdmin modal function#2 returned...',returnValue);
					if( typeof returnValue === 'object' ){
						// return value is the newly added admin
						$scope.rowCollection.push(returnValue)
						$scope.displayCollection.push(returnValue)
					}				
				}
			);
		};
		
		$scope.openEditAdmin = function (admin) {
			console.log('*** openEditAdmin. admin...',admin);
			var modalInstance = $modal.open({
				backdrop: true,   // the combination of a backdrop and animate is
			    animation: false, // failing to release backdrop so these setting
			    templateUrl: 'private/admins/editAdmin.html',
				controller: 'AdminModalCtrl',
				// pass the admin on to the modal via resolve
			    resolve: { admin: function () { return admin; } }			    
			});
			console.log('--- modal instance...',modalInstance);
			modalInstance.result.then(
				function (returnValue) {
					console.log('*** modal instance promise. returned...',returnValue);
					true;
				}, function (returnValue) {
					console.log('*** modal instance promise2. returned...',returnValue);
				    console.log('*** modal instance promise2. dismissed at: ' + new Date());
			});
		};
	}	
]);
