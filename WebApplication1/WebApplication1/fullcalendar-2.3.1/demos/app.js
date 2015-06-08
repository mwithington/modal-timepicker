//code for day click modal
var mymodal = angular.module('mymodal', []);
var btnClicked = false;
var sTime1;
var title;

var startT;
var endT;


function days_between(date1, date2) {

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms)

    // Convert back to days and return

    console.log(Math.round(difference_ms / ONE_DAY));
    return Math.round(difference_ms / ONE_DAY)

}





mymodal.controller('MainCtrl', function ($scope, CalendarFactory) {
    $scope.showModal = false;
    
    $scope.buttonClicked = "";
    $scope.toggleModal = function (btnClicked) {
        $scope.buttonClicked = btnClicked;
        $scope.showModal = !$scope.showModal;


    };

    $scope.hoursCalc = function () {
        CalendarFactory.hoursCalc();
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
         
        

        




});



mymodal.factory("CalendarFactory", function () {



    function doSubmit() {
        $('#myModal').modal('hide');
        $("#calendar").fullCalendar('renderEvent',
            {

                title: title,
                start: startT,
                end: endT,
                allday: true,
            },
            true);


        console.log(startT, "statt date");
        console.log(endT, "endt date");

        var date1 = new Date(startT.format());
        var date2 = new Date(endT.format());

        console.log(date1, "Date one");
        console.log(date2, "Date two");

        days_between(date1, date2);

        var test = startT;
        console.log(test, "this is test")
    }

     function hoursCalc () {
        var x = document.getElementById("Start").value;

        var y = document.getElementById("End").value;
        title = x + '-' + y

        doSubmit();


        btnClicked = true;
        var sTime24;

        var eTime24;

        var sTimeMin;
        var eTimeMin;



        sTime1 = x;

        console.log(x, "This is start time")
        console.log(y, "This is end Time")
        var eTime = y.split(":", 1)

        var sTime = x.split(":", 1)
        console.log(eTime)

        var isXAP = x[5];
        var isYAP = y[5];

        console.log(isXAP)
        console.log(isYAP)

        if (isXAP == "P" && isYAP == "P") {
            if (x[1] == "2") {
                eTime24 = parseInt(eTime, 10) + 12;
                sTime24 = parseInt(sTime, 10);
            }
            else {
                eTime24 = parseInt(eTime, 10) + 12;
                sTime24 = parseInt(sTime, 10) + 12;
            }
            
        }

        if (isXAP == "P" && isYAP == "A") {
            if (x[1] == "2") {
                eTime24 = parseInt(eTime, 10) + 12;
                sTime24 = 0;
            }
            else {
                eTime24 = parseInt(eTime, 10) + 12;
                sTime24 = parseInt(sTime, 10);
            }
            
        }

        if (isXAP == "A" && isYAP == "A") {
            eTime24 = parseInt(eTime, 10);
            sTime24 = parseInt(sTime, 10) + 12;
        }

        if (isXAP == "A" && isYAP == "P") {
            eTime24 = parseInt(eTime, 10) + 12;
            sTime24 = parseInt(sTime, 10);
        }

        


        /*switch (is) {
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
        };*/
        console.log(eTime24);

        var hours = eTime24 - sTime24;

        console.log("Hours before minute calculation", hours);

        document.getElementById("Start").value = "";
        document.getElementById("End").value = "";

        var sMinutes = parseInt(x[3] + x[4]);
        console.log(sMinutes, "THIS IS THE START MINUTES");
        var eMinutes = parseInt(y[3] + y[4]);
        console.log(eMinutes, "THIS IS THE END MINUTES");

        var minutes;
        var total;

        if (sMinutes < eMinutes) {
            minutes = eMinutes - sMinutes;
        }

        if (sMinutes > eMinutes) {
            minutes = ((eMinutes + 60) - sMinutes);
            hours -= 1;
        }

        total = minutes;

        console.log("HOURS: ", hours);
        console.log("MINUTES: ", total);


        


    }

    var factory = {

        doSubmit: doSubmit,
        hoursCalc: hoursCalc
    }

    return factory
        


})



