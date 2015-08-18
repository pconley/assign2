app.controller('InterpretersMainCtrl', ['$scope','$controller','InterpreterApiService','$modal','$filter','toastr',
	function($scope,$controller,InterpreterApiService,$modal,$filter,toastr){
		
		$controller('BaseMainCtrl', {$scope: $scope, $modal: $modal, service: InterpreterApiService}); 
	 		
		$scope.openAddInterpreter = function () {
		    var template = 'agency/interpreters/addInterpreter.html';
			var modalctrl = 'InterpreterModalCtrl';
			$scope.openAddResource(template,modalctrl);
		};

		$scope.openEditInterpreter = function (customer) {
		    var template = 'agency/interpreters/editInterpreter.html';
			var modalctrl = 'InterpreterModalCtrl';
			$scope.openEditResource(template,modalctrl,customer);
		};
	}	
]);
