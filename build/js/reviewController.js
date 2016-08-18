app.controller('reviewController', ["$scope", "$firebaseArray",
	function($scope, $firebaseArray){
		var ref = new Firebase('https://task-manager-angular.firebaseio.com');
		var uid = "-KLfHGnYMu4gf7qlDVZy";
		$scope.comments = $firebaseArray(ref.child("users/").child(uid).child('user').child('comments'));
		$scope.addReview = function(commentText){
			var comment = {
				name:'name', // pass the name from google api or from authentication
				description: commentText
			};
			$scope.comments.$add({
				name:'name', // pass the name from google api or from authentication
				description: commentText
			});
			$scope.comments.unshift(comment);
			$scope.message = null;// to make field empty
		};
	}
]);