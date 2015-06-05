//code for day click modal
var mymodal = angular.module('mymodal', []);
var btnClicked = false;
var sTime1;

var startT;
var endT;


function doSubmit() {
    $('#myModal').modal('hide');
    $("#calendar").fullCalendar('renderEvent',
        {
            title: $('#Start').val(),
            start: startT,
            end: endT,
            allday: true,
        },
        true);

}




mymodal.controller('MainCtrl', function ($scope) {
    $scope.showModal = false;
    
    $scope.buttonClicked = "";
    $scope.toggleModal = function (btnClicked) {
        $scope.buttonClicked = btnClicked;
        $scope.showModal = !$scope.showModal;


    };

    $scope.hoursCalc = function () {

        doSubmit();


        btnClicked = true;
        var sTime24;

        var eTime24;

        var x = document.getElementById("Start").value;

        var y = document.getElementById("End").value;

        sTime1 = x;

        console.log(x, "This is start time")
        console.log(y, "This is end Time")
        var eTime = y.split(":", 1)

        var sTime = x.split(":", 1)
        console.log(eTime)

        var isAM = x[5];
        var isPM = y[5];
        console.log(isAM)
        console.log(isPM)
        switch (isPM) {
          case "P":
             eTime24 = parseInt(eTime, 10) + 12;
          break;
          default:
             eTime24 = parseInt(eTime, 10);
        };
        switch (x[6]) {
         case "P":
           sTime24 = parseInt(sTime, 10) + 12;
           break;
         default:
           sTime24 = parseInt(sTime, 10);
        };
        console.log(eTime24);

        var z = eTime24 - sTime24;

        console.log(z);

        document.getElementById("Start").value = "Start Time";
        document.getElementById("End").value = "End Time";
        

    }

    $scope.doSubmit = function () {
        
    }

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
                    console.log("Hello!!!");
                    console.log(start);
                    console.log(end);
                    var eventData;

                    var x = document.getElementById("Start").value;
                    var y = document.getElementById("End").value;

                    console.log(x)

                    //var modalHide = $('#myModal').modal("hide");

                    var eventData;

                    endT = end;
                    startT =start;


                    //console.log(x, "start: ");
                    console.log(btnClicked, "this is the bootan")
                                
                                       
                },
                unselect: function (start, end) {                    
                   
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

