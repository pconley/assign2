app.config(['$stateProvider','$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {		  				
		$stateProvider
		.state('terps', {
			url: '/terps',
			data: { requiredRole: 'interpreter' },
			controller: 'TerpsCtrl',
			views: {
			    'header':   { templateUrl: 'terps/partials/header.html'  }, 
				'content':  { templateUrl: 'terps/partials/content.html' }, 
				'mainbody': { templateUrl: 'terps/partials/mainbody.html' }, 
				'footer':   { templateUrl: 'terps/partials/footer.html'  }
			},
		});		
	}
])
