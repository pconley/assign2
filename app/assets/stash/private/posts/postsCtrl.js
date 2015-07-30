angular.module('assign')
.controller('PostsCtrl', ['$scope','postsService','currentPost',
	function($scope, postsService, currentPost){
		$scope.post = currentPost; // see the app.js resolve
		$scope.posts = postsService.posts;
		$scope.addComment = function(){
		  if($scope.body === '') { return; }
		  console.log("*** adding comment");
		  postsService.addComment(currentPost.id, {
		    body: $scope.body,
		    author: 'user',
		  }).success(function(comment) {
		    $scope.post.comments.push(comment);
		  });
		  $scope.body = '';
		};
		$scope.incrementUpvotes = function(comment){
		  postsService.upvoteComment(currentPost, comment);
		};
		$scope.incrementPostUpvotes = function(post) {
		  console.log('post upvote. post...',post)
  		  postsService.upvote(post);		
        };
		$scope.addPost = function(){
			  if(!$scope.title || $scope.title === '') { return; }
			  postsService.create({
			    title: $scope.title,
			    link: $scope.link,
			  });
			  $scope.title = '';
			  $scope.link = '';
		};
	}
]);
