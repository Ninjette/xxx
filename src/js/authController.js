app.controller('authController', function($scope){
	$scope.authentication = function(){
		var parent = $('.authentication'),
			emailVal = parent.find('.authentication__input--email').val(),
			passwordVal = parent.find('.authentication__input--password').val();

		ref.createUser({
			email    : emailVal,
			password : passwordVal
		}, function(error, userData) {
			if (error) {
				console.log("Error creating user:", error);
			} else {
				console.log("Successfully created user account with uid:", userData.uid);

				var usersRef = ref.child("users");
				usersRef.push({
					user: {
						userID: userData.uid
					}
				});
			}
		});
	}

	$scope.signIn = function(){
		console.log('signIn func');
		var parent = $('.sign-in'),
			emailVal = parent.find('.sign-in__input--email').val(),
			passwordVal = parent.find('.sign-in__input--password').val();

		ref.authWithPassword({
			email    : emailVal,
			password : passwordVal
		}, function(error, authData) {
			if (error) {
				console.log("Login Failed!", error);
			} else {
				console.log("Authenticated successfully with payload:", authData);
			}
		},{
			remember: "sessionOnly"
			//check this
		});

	}
});

$('.button').on('click', function(){

	//FB auth
	ref.authWithOAuthPopup("facebook", function(error, authData) {
		if (error) {
			console.log("Login Failed!", error);
		} else {
			console.log("Authenticated successfully with payload:", authData);
		}
	});
})


