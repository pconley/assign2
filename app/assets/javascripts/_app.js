app = angular.module('assign', [
	'ui.router', 'templates', 'Devise','ui.bootstrap','smart-table',
	'matchMedia','ngAnimate', 'ngResource','toastr','ngMessages'
]);

app.config(['$stateProvider','$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {		
	    $urlRouterProvider.otherwise('public');		
	}
]);

app.run(function($rootScope) {
    document.addEventListener("keyup", function(e) {
        if (e.keyCode === 27)
            $rootScope.$broadcast("escapePressed", e.target);
    });

    document.addEventListener("click", function(e) {
        $rootScope.$broadcast("documentClicked", e.target);
    });
});
