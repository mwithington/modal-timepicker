//code for day click modal
var mymodal = angular.module('mymodal', []);

mymodal.controller('MainCtrl', function ($scope) {
    $scope.showModal = false;
    $scope.buttonClicked = "";
    $scope.toggleModal = function (btnClicked) {
        $scope.buttonClicked = btnClicked;
        $scope.showModal = !$scope.showModal;
    };
});

mymodal.directive('modal', function () {
    return {
        templateUrl:'userOptionsModal.html' ,
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };



});

mymodal.directive('fullCalendar', function () {
    return {
        restrict: "E",
        template: "<div>Hello There </div>",
        transclude: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            console.log("Element Children", element.children());

            element.children("#calendar").fullCalendar({
                defaultDate: '2015-02-12',
                editable: true,
                eventLimit: true, // allow "more" link when too many events
                events: [
                    {
                        title: 'Click for Google',
                        url: 'gcal.html',
                        start: '2015-05-28'
                    }
                ],
                selectable: true,
                select: function (start, end) {
                    console.log('Selected something: ' );
                    var modalShow = $('#myModal').modal("show");
                    
                    
                    var eventData;
                    var x = document.getElementById("Start").value;
                    var y = document.getElementById("End").value;
                    //var modalHide = $('#myModal').modal("hide");
                    var eventData;
                    if (modalShow) {
                        
                        //console.log(x, "start: ");
                        eventData = {
                            title: x,
                            start: start,
                            end: end
                        };
                        $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
                    }
                }
                

                /*dayClick: function (date, jsEvent, view) {

                    console.log('Clicked on: ' + date.format());
                    $('#myModal').modal("show");
                    // change the day's background color just for fun
                    $(this).css('background-color', 'red');
                }*/

            });

        },

    }
         
        

        

    
        //$('#calendar').fullCalendar({
        //    defaultDate: '2015-02-12',
        //    editable: true,
        //    eventLimit: true, // allow "more" link when too many events
        //    events: [
        //        {
        //            title: 'Click for Google',
        //            url: 'gcal.html',
        //            start: '2015-05-28'
        //        }
        //    ],
        //    dayClick: function (date, jsEvent, view) {

        //        console.log('Clicked on: ' + date.format());
        //        $('#myModal').modal("show");


        //        // change the day's background color just for fun
        //        $(this).css('background-color', 'red');

        //    }

        //});


});
   
