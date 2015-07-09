// angular.module('assign')
// .config(['$tooltipProvider', function($tooltipProvider){
//   $tooltipProvider.setTriggers({
//     'mouseenter': 'mouseleave',
//     'click': 'click',
//     'focus': 'blur',
//     'hideonclick': 'click'
//   });
// }]);

angular.module('assign')
.controller('AdminsCtrl', ['$scope','Admin','$modal','$filter','toastr',
	function($scope,Admin,$modal,$filter,toastr){
		
		$scope.rowCollection = [];
		$scope.displayCollection = [];
		
		// $scope.doSomething = function(){
		// 	        //hide the tooltip
		// 	console.log('*** something');
		// 	        $scope.tt_isOpen = false;
		// 	    };
				
		$scope.admins = Admin.query(function() { 
			// after the query finished...
			console.log('*** retrieved admins. count='+$scope.admins.length);
		    // copy the references (you could clone ie angular.copy but then 
			// have to go through a dirty checking for the matches)
		    $scope.rowCollection = [].concat($scope.admins);
		    $scope.displayedCollection = [].concat($scope.admins);
			// construct a special display name for the view
			angular.forEach($scope.displayedCollection, function(value, key) {
				value.display_name = value.last_name + ', ' + value.first_name
				if( value.middle_name ) value.display_name += ' ' + value.middle_name
			});
		});
		
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
	    
			
		$scope.deleteAdmin = function(admin){
			console.log('*** delete admin. admin...',admin);
		}
		
		$scope.openAddAdmin = function (admin) {
			console.log('*** openAddAdmin. admin...',admin);
			var modalInstance = $modal.open({
				backdrop: true,   // the combination of a backdrop and animate is
			    animation: false, // failing to release backdrop so these setting
			    templateUrl: 'private/admins/addAdmin.html',
				controller: 'AddAdminCtrl',
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
		
		$scope.openEditAdmin = function (admin) {
			console.log('*** openEditAdmin. admin...',admin);
			var modalInstance = $modal.open({
				backdrop: true,   // the combination of a backdrop and animate is
			    animation: false, // failing to release backdrop so these setting
			    templateUrl: 'private/admins/editAdmin.html',
				controller: 'EditAdminCtrl',
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
