app.config(['$stateProvider','$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
			  				
		$stateProvider
		.state('agency', {
			url: '/agency',
			data: { requiredRole: 'admin' },
			controller: 'AgencyCtrl',
			views: {
			    'header':  { templateUrl: 'agency/partials/header.html'  }, 
				'content': { templateUrl: 'agency/partials/content.html' }, 
				'footer':  { templateUrl: 'agency/partials/footer.html'  }
			},
		});
		
		$stateProvider
		.state('agency.jobs', {
			url: '/jobs',
			views: {
				'mainbody': { 
					templateUrl: 'agency/jobs/jobs.html', 
					controller: 'JobsMainCtrl',
				},
			},
		});
		
		$stateProvider
		.state('agency.admins', {
			url: '/admins',
			views: {
				'mainbody': { 
					templateUrl: 'agency/admins/admins.html', 
					controller: 'AdminMainCtrl',
				},
			},
		});
		
		$stateProvider
		.state('agency.customers', {
			url: '/customers',
			views: {
				'mainbody': { 
					templateUrl: 'agency/customers/customers.html', 
					controller: 'CustomersMainCtrl',
				},
			},
		});
				
		$stateProvider
		.state('agency.dashboard', {
			url: '/dashboard',
			      	data: { requireLogin: true },
			views: {
				'mainbody': { 
					templateUrl: 'agency/dashboard/_dashboard.html', 
					controller: 'DashboardController',
				},
			},
		});
		
		$stateProvider
		.state('agency.interpreters', {
			url: '/interpreters',
			views: {
				'mainbody': { 
					templateUrl: 'agency/interpreters/interpreters.html', 
					controller: 'InterpretersMainCtrl',
				},
			},
		});
				
	}
])
