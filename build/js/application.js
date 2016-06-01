var app = angular.module('todoListApp',[angularDragula(angular)]);

app.controller('boardController',function($scope, dataService){
	$scope.editingHeading = false;
	$scope.heading = "You are welcome on the board";
	$scope.editing = false;
	dataService.getLists(function(response){
		$scope.lists = response.data;
	});
	$scope.addList = function(){
		var list = {title : "This is a new card"};
		$scope.lists.push(list);
	};
});

app.controller('dialogController', function(){
	this.editDescription = false;
	this.description = "description";
	this.title = "title";
});

app.controller('cardsController',function($scope, dataService){
	dataService.getCards(function(response){
		$scope.cards = response.data;
	});
	$scope.addCard = function(){
		var card = {title : "This is a new card"};
		$scope.cards.push(card);
		console.log($scope.cards);
	};
});

app.controller('reviewController', function($scope, dataService){
	dataService.getComments(function(response){
		$scope.comments = response.data;
	});
	this.myVar = {key:"value"};
	$scope.addReview = function(commentText){
		var comment = {
			name:'name', // pass the name from google api or from authentication
			description: commentText
		};
		$scope.comments.unshift(comment);
		$scope.message = null;
	};
});

app.controller('checklistController' , function($scope){
	var amount = $('.checklist-form__checkbox').length;
	var progressBar = $('.checklist__progress-bar');
	$scope.estimateFunc = function(){
		var checked = $('.checklist-form__checkbox:checked').length;
		// amount
		var result = (Math.round((checked*100)/amount));
		$('.checklist__progress-percent').html(result);
		progressBar.css('right', 100-result+'%');
		console.log(result);
		if(result === 100){
			progressBar.addClass('checklist__progress-bar--accomplished');
			console.log(100 + 'finally');
		}
		else{
			progressBar.removeClass('checklist__progress-bar--accomplished');
		}
	}
	$scope.addItem = function(){
		console.log(1);
	}
});

$(document).ready(function(){
	// var angularDragula = require('angular-dragula');

});



// dracula without angular
// $(document).ready(function(){
// 	// dragula([
// 	// 	document.getElementById('left'),
// 	// 	document.getElementById('right')
// 	// ]);
// 	var drake = dragula({
// 	  isContainer: function (el) {
// 	    return el.classList.contains('draggable');
// 	  }
// 	});
// });


//dragular test
app.controller('RepeatCtrl', ['$scope', 'dragulaService',
	function ($scope, dragulaService) {
		$scope.many = ['The', 'possibilities', 'are', 'endless!'];
		$scope.many2 = ['Explore', 'them'];
		$scope.addItem = function(){
			var text = {};
			$scope.many.push(text);
		}
	}
]);



// angular.module("dragndropdemo", ['ngRepeatReorder']);
// 		function dragndropdemo($scope) {
// 			$scope.names = [{val:'bob'},{val:'lucy'},{val:'john'},{val:'luke'},{val:'han'}];
// 			$scope.tempplayer = '';
// 			$scope.updateNames = function (){
// 				if($scope.tempplayer === "") return
// 				$scope.names.push({val: $scope.tempplayer});
// 				$scope.tempplayer = "";
// 			};
// 			$scope.checkForNameDelete = function($index){
// 				if($scope.names[$index].val === ''){
// 					$scope.names.splice($index, 1);
// 				}
// 			};
// 		};
