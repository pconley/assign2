app.config(['$stateProvider','$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
			  
		$stateProvider
		.state('public', {
			url: '/public',
			data: { requireLogin: false },
			controller: 'PublicCtrl',
			views: {
		    	'header':  { templateUrl: 'public/partials/header.html'  }, 
				'content': { templateUrl: 'public/home/_home.html' }, 
				'footer':  { templateUrl: 'public/partials/footer.html'  }
	        }
		});
		
		$stateProvider
	    .state('public.widgets', {
	        url: '/widgets',
	        views: {
	            'content@': {
	                templateUrl: 'public/widgets/widgets.html',
	                //controller: 'CampaignController'
	            }
	        }
	    });
	
		$stateProvider
		.state('public.dashboard', {
			url: '/dashboard',
	        views: {
           		'content@': {
			    	templateUrl: 'public/dashboard/dashboard.html',
			        //controller: 'DashboardController'
			     }
			}
		});
		
		$stateProvider
		.state('public.login', {
			url: '/login',
	        views: {
           		'content@': {
			    	templateUrl: 'public/login/login.html',
			        controller: 'LoginCtrl'
			     },
			},
			onEnter: ['$state', 'Auth', 'AccessService', 'toastr', function($state, Auth, AccessService, toastr) {
				Auth.currentUser().then(function (user){
					toastr.success('You are already logged in.','Authentication', {closeButton: true});
					console.log('>>> redirecting in routes to user home. user...',user);
			    	$state.go(AccessService.home(user));
			    })
			}]
		});
		
	}
])
