angular.module('assign', ['ui.router', 'templates', 'Devise','ui.bootstrap','matchMedia','ngAnimate', 'toastr'])
.config(['$stateProvider','$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		
	    $urlRouterProvider.otherwise('public');
	  
		$stateProvider
			.state('public', {
				url: '/public',
				templateUrl: 'public/_home.html',
				controller: 'PublicCtrl',
		})
	
	  $stateProvider
	    .state('home', {
	      url: '/home',
	      templateUrl: 'home/_home.html',
	      controller: 'HomeCtrl',
			resolve: { 
			  // executed each time state change to this state
			  loadPosts: ['postsService', function(postsService){
				console.log('*** home: loadPosts')
				return postsService.getAll();
			  }],
			  loadCustomers: ['customersService', function(customersService){
				console.log('*** home: loadCustomers')
				return customersService.getAll();
			  }]
			}
	    })
	    .state('posts', {
	      url: '/posts',
	      templateUrl: 'posts/_posts.html',
	      controller: 'PostsCtrl',
		  resolve: { // called each time state change to this state
		    loadPosts: ['postsService', function(postsService){
		  	  console.log('*** posts: loadPosts')
		      return postsService.getAll();
		    }],
			currentPost: [ function(){} ]
		  }
	    })	
		.state('post', {
		  url: '/posts/{id}',
		  templateUrl: 'posts/_post.html',
		  controller: 'PostsCtrl',
		  resolve: {
		    currentPost: ['$stateParams', 'postsService', function($stateParams, postsService) {
		      return postsService.get($stateParams.id);
		    }]
		  }
		})
	    .state('customers', {
	      url: '/customers',
	      templateUrl: 'customers/_customers.html',
	      controller: 'CustomerCtrl',
	      data: { requireLogin: true },
		  resolve: { // called each time state change to this state
		    loadCustomers: ['customersService', function(customersService){
				console.log('*** customer: loadCustomers')
		      	return customersService.getAll();
		    }],
			currentCustomer: [ function(){} ]
		  },
		  onEnter: ['$state', 'Auth', function($state, Auth) {
			console.log('*** customers on enter: authenticating user')
	        Auth.currentUser().then(function(user) {
	            // User was logged in, or Devise returned
	            // previously authenticated session.
	            console.log('user...',user); // => {id: 1, ect: '...'}
	        }, function(error) {
	            // unauthenticated error
				console.log("*** un-authenticatd user")
	            $state.go('public');
	        });
	      }]
	    })
		.state('customer', {
		  url: '/customers/{id}',
		  templateUrl: 'customers/_customer.html',
		  controller: 'CustomerCtrl',
		  data: { requireLogin: true },
		  resolve: {
			// creates a promise that can be injected into a controller
		    currentCustomer: ['$stateParams', 'customersService', function($stateParams, customersService) {
		  	  console.log('resolving current customer id = ',$stateParams.id);
		      return customersService.get($stateParams.id);
		    }]
		  }
		})
		.state('login', {
	      url: '/login',
	      templateUrl: 'auth/_login.html',
	      controller: 'AuthCtrl',
	      onEnter: ['$state', 'Auth', function($state, Auth) {
	        Auth.currentUser().then(function (){
	          $state.go('home');
	        })
	      }]
	    })
	    .state('register', {
	      url: '/register',
	      templateUrl: 'auth/_register.html',
	      controller: 'AuthCtrl',
	      onEnter: ['$state', 'Auth', function($state, Auth) {
	        Auth.currentUser().then(function (){
	          $state.go('home');
	        })
	      }]
	    });
	}
])
