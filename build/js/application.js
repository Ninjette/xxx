var app = angular.module('todoListApp',[angularDragula(angular)]);
// var injector = angular.injector(["firebase", 'todoListApp']);

//var app = angular.module('todoListApp',[angularDragula(angular)]); previeous line with dragula injection

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


//cards
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


//review
app.controller('reviewController', function($scope, dataService){
	dataService.getComments(function(response){
		$scope.comments = response.data;
	});

	//temporary variable, later change it on authanticated "getUID"
	var uid = "-KLfHGnYMu4gf7qlDVZy";
	ref.child("users/").child(uid).child('user').child('comments').on("value", function(snapshot) {
		console.log(snapshot.val());
	}, function (errorObject) {
		console.log("The read failed: " + errorObject.code);
	});
	// this.myVar = {key:"value"};
	$scope.addReview = function(commentText){
		var comment = {
			name:'name', // pass the name from google api or from authentication
			description: commentText
		};
		$scope.comments.unshift(comment);
		$scope.message = null;
	};
});

//checklist
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

app.controller('listsController', ['$scope', 'dragulaService',
	function ($scope, dragulaService) {
		dragulaService.options($scope, 'list-bag', {
			moves: function (el, container, handle) {
			  return handle.className === 'handle';
			},
			direction: 'horizontal'
		});
	}
]);

// tool tips
$(document).ready(function(){
	var triggerBtn = $('.btn-test');
	triggerBtn.on('click',function(){
		$('.hidden-block').css('display','block');
	})

	$('body').on('click', function (event) {
		var target = $(event.target);

		if ( target.is( triggerBtn ) || target.is($('.hidden-block')) ) {
		}
		else{
			$('.hidden-block').css('display','none');
		}

	});
})

//Firebase

// Get a database reference to our posts
// var ref = new Firebase("https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts");
// // Attach an asynchronous callback to read the data at our posts reference
// ref.on("value", function(snapshot) {
//   console.log(snapshot.val());
// }, function (errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });

var ref = new Firebase('https://task-manager-angular.firebaseio.com');

// after authentication

// var uid = //link  $

// var usersRef = ref.child(uid);

// get info from the children blocks and add to your DOM


// Firebase work with data test
// var usersRef = ref.child("aleshaRoot");
// usersRef.set({
// 	alanisawesome: {
// 		date_of_birth: "June 23, 1914",
// 		full_name: "Alan Turing"
// 	},
// 	gracehop: {
// 		date_of_birth: "December 9, 1906",
// 		full_name: "Grace Hopper"
// 	}
// });


app.controller('authController', function($scope){
	$scope.authentication = function(){
		// console.log('authentication');
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
})

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















// https://www.firebase.com/docs/web/guide/login/password.html#section-logging-in

//tooltips

// $(document).ready(function(){
	// $('[data-toggle="popover"]').popover();
	// var popoverBlock = $('.popover');
	// $('body').on('click', function (e) {
	// 	if ($(e.target).data('toggle') !== 'popover' && $(e.target).parents('.popover.in').length === 0) { 
	// 		$('[data-toggle="popover"]').popover('hide');
	// 		// console.log('Подошло');
	// 	}

	// });
// }


$(function() {
	var weekdayInput = $('.due-date__weekday'),
		dayInput = $('.due-date__day'),
		monthInput = $('.due-date__month'),
		yearInput = $('.due-date__year'),
		timeInput = $('.due-date__time'),
		statusInput = $('.due-date__status');

	var weekdayArr = new Array(7);
		weekdayArr[1] = "Monday";
		weekdayArr[2] = "Tuesday";
		weekdayArr[3] = "Wednesday";
		weekdayArr[4] = "Thursday";
		weekdayArr[5] = "Friday";
		weekdayArr[6] = "Saturday";
		weekdayArr[7] =  "Sunday";

	var monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


	changeDate = function(date){
		var monthIndex = parseInt(date.substr(0,2)),
			month = monthsArr[monthIndex],
			day = parseInt(date.substr(8,2)),
			year = parseInt(date.substr(3,4));

		dayInput.html(day);
		monthInput.html(month);
		yearInput.html(year);

		//мб нужно будет создать new Date (); закинуть сначата переменную date, затем добавить переменную часов, это все для отслеживания статуса времени.
		$('.js-timepicker').on('blur', function(){
			// console.log($(this).val());
			var time = $(this).val(),
				hours = time.substr(0,2),
				minutes = time.substr(3,2);
			// new Date(year, month, date[, hours, minutes, seconds, ms] )
			var setedDate = new Date(year,monthIndex,day,hours,minutes,00);
			console.log(setedDate);
		});
	}

	checkExpiration = function(){
		var currentDate = new Date();// здесь сделай текущую дату
	}
	checkExpiration();

	$(".js-datepicker").datepicker({
		dateFormat: "mm-yy-dd",
		onSelect: function(date) {
			$(this).data('datepicker').inline = true;
			var d = $.datepicker.parseDate('dd/mm/yy', '22/04/2010');
			changeDate(date, 'DD/MM/YYYY');
		},
		onClose: function() {
			$(this).data('datepicker').inline = false;
		}
	});
	// $.datepicker.parseDate( "yy-mm-dd", "2007-01-26" );
	// $(".js-datepicker").formatDate( "yy-mm-dd", new Date( 2007, 1 - 1, 26 ) );
});


// var headerHtml = $("#material-header-holder .ui-datepicker-material-header");

// var changeMaterialHeader = function(header, date) {
// 	var year   = date.format('YYYY');
// 	var month  = date.format('MMM');
// 	var dayNum = date.format('D');
// 	var isoDay = date.isoWeekday();
	
// 	var weekday = new Array(7);
// 	weekday[1] = "Monday";
// 	weekday[2] = "Tuesday";
// 	weekday[3] = "Wednesday";
// 	weekday[4] = "Thursday";
// 	weekday[5] = "Friday";
// 	weekday[6] = "Saturday";
// 	weekday[7]=  "Sunday";

//   $('.ui-datepicker-material-day', header).text(weekday[isoDay]);
//   $('.ui-datepicker-material-year', header).text(year);
//   $('.ui-datepicker-material-month', header).text(month);
//   $('.ui-datepicker-material-day-num', header).text(dayNum);
// };

// $.datepicker._selectDateOverload = $.datepicker._selectDate;
// $.datepicker._selectDate = function(id, dateStr) {
//   var target = $(id);
//   var inst = this._getInst(target[0]);
//   inst.inline = true;
//   $.datepicker._selectDateOverload(id, dateStr);
//   inst.inline = false;
//   this._updateDatepicker(inst);
  
//   headerHtml.remove();
//   $(".ui-datepicker").prepend(headerHtml);
// };

// $("input[data-type='date']").on("focus", function() {
//  	$(".ui-datepicker").prepend(headerHtml);
// });

// $("input[data-type='date']").datepicker({
//   showButtonPanel: true,
//   closeText: 'OK',
//   onSelect: function(date, inst) {
//     changeMaterialHeader(headerHtml,moment(date, 'MM/DD/YYYY'));
//   },
// });

// changeMaterialHeader(headerHtml, moment());
// $('input').datepicker('show');


// animations etc

jQuery(function($){
	$(".js-timepicker").mask("99:99");
});