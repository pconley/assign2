app = angular.module('assign', [
	'ui.router', 'templates', 'Devise','ui.bootstrap','smart-table',
	'matchMedia','ngAnimate', 'ngResource','toastr','ngMessages'
]);

app.config(['$stateProvider','$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {		
	    $urlRouterProvider.otherwise('public');		
	}
]);
