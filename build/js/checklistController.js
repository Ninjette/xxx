app.controller('checklistController' , function($scope, dataService){

	dataService.getChecklistItems(function(response){
		$scope.checklist = response.data;
	});

	$scope.addItem = function(){
		var checklistItem = {text : $('.checklist-form__input').val()};
		$scope.checklist.push(checklistItem);
	};

	$scope.estimateFunc = function(){
		var amount = $('.checklist-form__checkbox').length;
		var progressBar = $('.checklist__progress-bar');
		var checked = $('.checklist-form__checkbox:checked').length;
		// amount
		var result = (Math.round((checked*100)/amount));
		$('.checklist__progress-percent').html(result);
		progressBar.css('right', 100-result+'%');
		if(result === 100){
			progressBar.addClass('accomplished');
		}
		else{
			progressBar.removeClass('accomplished');
		}
	}
});