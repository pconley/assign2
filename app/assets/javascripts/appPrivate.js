app.config(['$stateProvider','$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
			  				
		$stateProvider
		.state('private', {
			url: '/private',
			data: { requireLogin: true },
			controller: 'PublicCtrl',
			views: {
			    'header':  { templateUrl: 'private/partials/header.html'  }, 
				'content': { templateUrl: 'private/partials/content.html' }, 
				'mainbody': { templateUrl: 'private/partials/example.html' }, 
				'footer':  { templateUrl: 'private/partials/footer.html'  }
			},
		});
		
		$stateProvider
		.state('private.admins', {
			url: '/admins',
			views: {
				'mainbody': { 
					templateUrl: 'private/admins/admins.html', 
					controller: 'AdminMainCtrl',
				},
			},
		});
		
		$stateProvider
		.state('private.customers', {
			url: '/customers',
			views: {
				'mainbody': { 
					templateUrl: 'private/customers/customers.html', 
					controller: 'CustomersMainCtrl',
				},
			},
		});
		
		// $stateProvider
		// .state('private.customers', {
		// 	url: '/customers',
		// 	views: {
		// 		'mainbody': { 
		// 			templateUrl: 'private/customers/_customers.html', 
		// 			controller: 'CustomerCtrl',
		// 		},
		// 	},
		// 	resolve: { // called each time state change to this state
		//     	loadCustomers: ['customersService', function(customersService){
		// 			console.log('*** customer: loadCustomers')
		//       		return customersService.getAll();
		//     	}],
		// 		currentCustomer: [ function(){} ]
		//   	}
		// });
		// 		
		// $stateProvider
		// .state('private.customers.detail', {
		// 	url: 'customer/:id',
		// 	        views: {
		// 		'mainbody@private': {
		// 			templateUrl: 'private/customers/_customer.html',
		// 			controller: 'CustomerCtrl'
		// 		},
		// 	            'detail': {
		// 	               	templateUrl: 'private/customers/_customer.html',
		// 	        controller: 'CustomerCtrl'        
		// 	            }
		// 	        },
		//   	resolve: {
		// 		// creates a promise that can be injected into a controller
		//     	currentCustomer: ['$stateParams', 'customersService', function($stateParams, customersService) {
		//   	  		console.log('resolving detail customer id = ',$stateParams.id);
		//       		return customersService.get($stateParams.id);
		//     	}]
		//   	}
		// });
		
		$stateProvider
		.state('private.dashboard', {
			url: '/dashboard',
			      	data: { requireLogin: true },
			views: {
				'mainbody': { 
					templateUrl: 'private/dashboard/_dashboard.html', 
					controller: 'DashboardController',
				},
			},
		});
		
		$stateProvider
		.state('private.interpreters', {
			url: '/interpreters',
			views: {
				'mainbody': { 
					templateUrl: 'private/interpreters/interpreters.html', 
					controller: 'InterpretersMainCtrl',
				},
			},
		});
				
	}
])
