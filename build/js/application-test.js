var app = angular.module("sampleApp", ["firebase"]);

app.controller("ProfileCtrl", ["$scope", "$firebaseArray",
	function($scope,  $firebaseArray) {
		var messagesRef = new Firebase('https://task-manager-angular.firebaseio.com');

		var uid = "-KLfHGnYMu4gf7qlDVZy";
		$scope.messages = $firebaseArray(messagesRef.child("users/").child(uid).child('user').child('comments'));
		console.log($scope.messages);
	}
]);



// var app = angular.module("sampleApp", ["firebase"]);
// inject $firebaseArray into our controller
