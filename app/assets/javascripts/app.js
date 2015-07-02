angular.module('assign', ['ui.router', 'templates', 'Devise','ui.bootstrap','matchMedia','ngAnimate', 'toastr'])
.config(['$stateProvider','$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		
	    $urlRouterProvider.otherwise('private');
	  
		$stateProvider
		.state('public', {
			url: '/public',
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
			    	templateUrl: 'auth/_login.html',
			        controller: 'AuthCtrl'
			     },
			},
			onEnter: ['$state', 'Auth', 'toastr', function($state, Auth, toastr) {
				Auth.currentUser().then(function (){
					toastr.success('You are already logged in.','Authentication', {closeButton: true});
			    	$state.go('private');
			    })
			}]
		});
		
		$stateProvider
		.state('private', {
			url: '/private',
			controller: 'PublicCtrl',
			views: {
			    'header':  { templateUrl: 'private/partials/header.html'  }, 
				'content': { templateUrl: 'private/partials/content.html' }, 
				'footer':  { templateUrl: 'private/partials/footer.html'  }
			},
			// resolve: {
			// 		    	example: ['customersService', function(customersService){
			// 		console.log('*** private: example resolve')
			// 		    	}],
			// 		  	},
		});
		
		$stateProvider
		.state('private.customers', {
			url: '/customers',
	      	data: { requireLogin: true },
			views: {
				'mainbody': { 
					templateUrl: 'private/customers/_customers.html', 
					controller: 'CustomerCtrl',
				},
			},
			resolve: { // called each time state change to this state
		    	loadCustomers: ['customersService', function(customersService){
					console.log('*** customer: loadCustomers')
		      		return customersService.getAll();
		    	}],
				currentCustomer: [ function(){} ]
		  	},
			onEnter: ['$state', 'Auth', function($state, Auth) {
				console.log('*** customers on enter: authenticating user')
						// 			    Auth.currentUser().then(function(user) {
						// 			            // User was logged in, or Devise returned
						// 			            // previously authenticated session.
						// 			            console.log('user...',user); // => {id: 1, ect: '...'}
						// 			    }, function(error) {
						// 			            // unauthenticated error
						// console.log("*** un-authenticatd user")
						// 			            $state.go('public');
						// 			    });
			}]
		});
		
		$stateProvider
		.state('private.dashboard', {
			url: '/dashboard',
	      	data: { requireLogin: true },
			views: {
				'mainbody': { 
					templateUrl: 'private/dashboard/_dashboard.html', 
					//controller: 'CustomerCtrl',
				},
			},
			// resolve: { // called each time state change to this state
			// 		    	loadCustomers: ['customersService', function(customersService){
			// 		console.log('*** customer: loadCustomers')
			// 		      		return customersService.getAll();
			// 		    	}],
			// 	currentCustomer: [ function(){} ]
			// 		  	},
			// onEnter: ['$state', 'Auth', function($state, Auth) {
			// 	console.log('*** dashboard on enter: authenticating user')
			// }]
		});
		
		
			
		// $stateProvider
		// 	    .state('private.home', {
		// 	      url: '/home',
		// 	      templateUrl: 'home/_home.html',
		// 	      controller: 'HomeCtrl',
		// 	resolve: { 
		// 	  // executed each time state change to this state
		// 	  loadPosts: ['postsService', function(postsService){
		// 		console.log('*** home: loadPosts')
		// 		return postsService.getAll();
		// 	  }],
		// 	  loadCustomers: ['customersService', function(customersService){
		// 		console.log('*** home: loadCustomers')
		// 		return customersService.getAll();
		// 	  }]
		// 	}
		// });
		// $stateProvider
		// .state('private.posts', {
		// 	    	url: '/posts',
		// 	      	templateUrl: 'posts/_posts.html',
		// 	      	controller: 'PostsCtrl',
		//   	resolve: { // called each time state change to this state
		//     	loadPosts: ['postsService', function(postsService){
		//   	  		console.log('*** posts: loadPosts')
		//       		return postsService.getAll();
		//     	}],
		// 	currentPost: [ function(){} ]
		//   }
		// 	    })	
		// .state('private.post', {
		//   url: '/posts/{id}',
		//   templateUrl: 'posts/_post.html',
		//   controller: 'PostsCtrl',
		//   resolve: {
		//     currentPost: ['$stateParams', 'postsService', function($stateParams, postsService) {
		//       return postsService.get($stateParams.id);
		//     }]
		//   }
		// })
		// .state('private.customer', {
		//   url: '/customers/{id}',
		//   templateUrl: 'customers/_customer.html',
		//   controller: 'CustomerCtrl',
		//   data: { requireLogin: true },
		//   resolve: {
		// 	// creates a promise that can be injected into a controller
		//     currentCustomer: ['$stateParams', 'customersService', function($stateParams, customersService) {
		//   	  console.log('resolving current customer id = ',$stateParams.id);
		//       return customersService.get($stateParams.id);
		//     }]
		//   }
		// })
		
		// 	    .state('register', {
		// 	      url: '/register',
		// 	      templateUrl: 'auth/_register.html',
		// 	      controller: 'AuthCtrl',
		// 	      onEnter: ['$state', 'Auth', function($state, Auth) {
		// 	        Auth.currentUser().then(function (){
		// 	          $state.go('home');
		// 	        })
		// 	      }]
		// 	    });
	}
])
