var app = angular.module('todoListApp',[]);


app.controller('boardController',function($scope, dataService){
	//main functionality
	$scope.editingHeading = false;
	$scope.heading = "You are welcome on the board";
	$scope.editing = false;
	$scope.list = {
		title: 'title1'
	};// review this
	dataService.getCards(function(response){
		$scope.cards = response.data;
	});
	dataService.getLists(function(response){
		$scope.lists = response.data;
	});
	$scope.addCard = function(){
		var card = {title : "This is a new card"};
		$scope.cards.push(card);
	};
	$scope.addList = function(){
		var list = {title : "This is a new card"};
		$scope.lists.push(list);
	};
});
