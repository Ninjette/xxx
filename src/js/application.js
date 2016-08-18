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

var ref = new Firebase('https://task-manager-angular.firebaseio.com');


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

