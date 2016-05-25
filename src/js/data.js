'use strict'
angular.module("todoListApp")

.service('dataService', function($http){

	this.getCards = function(callback){
		$http.get('js/cards.json')
			.then(callback)
	};
	this.getLists = function(callback){
		$http.get('js/lists.json')
			.then(callback)
	};
});
