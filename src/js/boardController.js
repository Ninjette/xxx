app.controller('boardController',['$scope', '$firebaseArray', 'dragulaService',
	function($scope, $firebaseArray, dragulaService){
		var uid = "-KLfHGnYMu4gf7qlDVZy";
		var ref = new Firebase('https://task-manager-angular.firebaseio.com');
		$scope.lists = $firebaseArray(ref.child("users/").child(uid).child('user').child('lists'));

		$scope.editingHeading = false;
		$scope.heading = "You are welcome on the board";
		$scope.editing = false;

		var draggedListIndex,
			droppedListIndex,
			draggedItemIndex,
			droppedItemIndex,
			snapshotRef;

		dragulaService.options($scope, 'list-bag', {
			moves: function (el, container, handle) {
				return handle.className === 'handle';
			},
			direction: 'horizontal'
		});

		var refToList = ref.child("users/").child(uid).child('user').child('lists');

		 function dragDropLogic(dragEl, reference, draggedEl, droppedEl){
			$scope.$on(dragEl+'.drag', function (e, el) {
				draggedEl = el.index();
			});


			var listsKeys;
			reference.on("value", function(snapshot) {
				snapshotRef = snapshot.val();
				if (snapshotRef) {
					listsKeys = Object.keys(snapshotRef);
				};
			});

			$scope.$on(dragEl +'.drop', function (e, el) {
				droppedEl = el.index();

				// To change priority value in order after drag & drop. The elements order in DB stay untouched.
				// drop forward
				if(draggedEl < droppedEl ){
					var listsKeys = Object.keys(snapshotRef);// previously already have this var
					var idOfDraggedElem = listsKeys[draggedEl];
					var droppedElemPriority;

					//every previous elements get priority - 1
					for (var i = droppedEl - 1; i >= draggedEl ; i--) { // + 1 because we need to start from the next of dropped element
						var elemPriority;

						reference.child(listsKeys[i + 1]).once("value", function(snapshot) { // -1 because we need to write order number of the elem
							elemPriority = snapshot.getPriority();
						});

						reference.child(listsKeys[i +1]).setPriority(elemPriority - 1);
					};
					// dropped element get priority of its position
					reference.child(idOfDraggedElem).setPriority(droppedEl);
				}
				// drop back
				else{
					var listsKeys = Object.keys(snapshotRef);// previously already have this var
					var idOfDraggedElem = listsKeys[draggedEl];
					var droppedElemPriority;

					//every previous elements get priority - 1
					for (var i = droppedEl + 1; i <= draggedEl ; i++) { // + 1 because we need to start from the next of dropped element
						var elemPriority;

						reference.child(listsKeys[i - 1]).once("value", function(snapshot) { // -1 because we need to write order number of the elem
							elemPriority = snapshot.getPriority();
						});

						reference.child(listsKeys[i -1]).setPriority(elemPriority+1);
					};
					reference.child(idOfDraggedElem).setPriority(droppedEl);

				}
			});

			$scope.listObject = {
				title : "This is a new list"
			}
			$scope.addList = function(){
				var priority = 0;
				if(snapshotRef){ // if already exist at least 1 list
					var listsLength = listsKeys.length;
					$scope.lists.$add($scope.listObject)
					.then(function(){
						for (var i = 0; i < listsKeys.length; i++) {
							reference.child(listsKeys[i]).setPriority(i);
						};
					}) ;
				} else{// it will be first list
					$scope.lists.$add($scope.listObject)
				}
				
			};
		}
		//call the main function
		dragDropLogic('list-bag', refToList, draggedListIndex, droppedListIndex);





		//cards code
		var refToCard = ref.child("users/").child(uid).child('user').child('lists');

		 function dragDropLogicCard(dragEl, reference, draggedEl, droppedEl){
			$scope.$on(dragEl+'.drag', function (e, el) {
				draggedEl = el.index();
			});


			var listsKeys;
			reference.on("value", function(snapshot) {
				snapshotRef = snapshot.val();
				if (snapshotRef) {
					listsKeys = Object.keys(snapshotRef);
				};
			});

			$scope.$on(dragEl +'.drop', function (e, el) {
				droppedEl = el.index();

				// To change priority value in order after drag & drop. The elements order in DB stay untouched.
				// drop forward
				if(draggedEl < droppedEl ){
					var listsKeys = Object.keys(snapshotRef);// previously already have this var
					var idOfDraggedElem = listsKeys[draggedEl];
					var droppedElemPriority;

					//every previous elements get priority - 1
					for (var i = droppedEl - 1; i >= draggedEl ; i--) { // + 1 because we need to start from the next of dropped element
						var elemPriority;

						reference.child(listsKeys[i + 1]).once("value", function(snapshot) { // -1 because we need to write order number of the elem
							elemPriority = snapshot.getPriority();
						});

						reference.child(listsKeys[i +1]).setPriority(elemPriority - 1);
					};
					// dropped element get priority of its position
					reference.child(idOfDraggedElem).setPriority(droppedEl);
				}
				// drop back
				else{
					var listsKeys = Object.keys(snapshotRef);// previously already have this var
					var idOfDraggedElem = listsKeys[draggedEl];
					var droppedElemPriority;

					//every previous elements get priority - 1
					for (var i = droppedEl + 1; i <= draggedEl ; i++) { // + 1 because we need to start from the next of dropped element
						var elemPriority;

						reference.child(listsKeys[i - 1]).once("value", function(snapshot) { // -1 because we need to write order number of the elem
							elemPriority = snapshot.getPriority();
						});

						reference.child(listsKeys[i -1]).setPriority(elemPriority+1);
					};
					reference.child(idOfDraggedElem).setPriority(droppedEl);

				}
			});

			dragDropLogicCard('card-bag', refToList, draggedListIndex, droppedListIndex);

			$scope.listObject = {
				title : "This is a new list"
			}
		}
		$scope.addCard = function(objectInfo){
			$scope.currentList = $firebaseArray(ref.child("users/").child(uid).child('user').child('lists').child(objectInfo.$id).child('cards')); // doesn't work
			$scope.currentList.$add({
				title: "This is a new card with array number "+objectInfo
			});
		};
	}
]);