angular.module('ngTerpsys', ['ui.router', 'templates', 'Devise','ui.bootstrap','matchMedia'])
.config(['$stateProvider','$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
	  $stateProvider
	    .state('home', {
	      url: '/home',
	      templateUrl: 'home/_home.html',
	      controller: 'HomeCtrl',
			resolve: { 
			  // executed each time state change to this state
			  loadPosts: ['postsService', function(postsService){
				console.log('*** main posts load')
				return postsService.getAll();
			  }],
			  loadCustomers: ['customersService', function(customersService){
				console.log('*** main custs load')
				return customersService.getAll();
			  }]
			}
	    })
	    .state('posts', {
	      url: '/posts',
	      templateUrl: 'posts/_posts.html',
	      controller: 'PostsCtrl',
		  resolve: { // called each time state change to this state
		    postsPromise: ['postsService', function(postsService){
		  	  console.log('*** posts promise')
		      return postsService.getAll();
		    }],
			currentPost: [ function(){} ]
			// ['$stateParams', 'postsService', function($stateParams, posts) {
			      //return posts.get($stateParams.id);
			//}]
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
		  resolve: { // called each time state change to this state
		    customersPromise: ['customersService', function(customersService){
		      return customersService.getAll();
		    }],
			currentCustomer: [ function(){} ]
		  },
		  onEnter: ['$state', 'Auth', function($state, Auth) {
	        Auth.currentUser().then(function(user) {
	            // User was logged in, or Devise returned
	            // previously authenticated session.
	            console.log('user...',user); // => {id: 1, ect: '...'}
	        }, function(error) {
	            // unauthenticated error
	            $state.go('home');
	        });
	      }]
	    })
		.state('customer', {
		  url: '/customers/{id}',
		  templateUrl: 'customers/_customer.html',
		  controller: 'CustomerCtrl',
		  resolve: {
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
	  $urlRouterProvider.otherwise('home');
	}
])