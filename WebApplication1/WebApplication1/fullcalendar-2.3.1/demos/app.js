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
        CalendarFactory.assignEvent();
    };

    $scope.removeEvent = function () {
        CalendarFactory.removeEvent();
    };

    $scope.editTimes = function () {
        CalendarFactory.assignEdit();
        $('#myModal2').modal("hide");
    };

    $scope.addAllHours = function(){
        CalendarFactory.addAllHours();
    };



});






mymodal.directive('modal1', function () {
    return {
        templateUrl: 'userOptionsModal.html',
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
mymodal.directive('modal2', function () {
    return {
        templateUrl: 'userOptionsModal2.html',
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

mymodal.directive('modalEvent', function () {
    return {
        templateUrl: 'userOptionsModal.html',
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
                    console.log('Selected something: ');
                    var modalShow = $('#myModal1').modal("show");
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
                    startT = start;


                    //console.log(x, "start: ");
                    console.log(btnClicked, "this is the bootan")




                },
                unselect: function (start, end) {


                },

                //eventClick: function (event) {

                //$('#calendar').fullCalendar('removeEvents')

                eventClick: function (event, element) {

                    $('#myModal2').modal("show");
                    console.log("The modal is showing after event click");

                    //event.title = "CLICKED!";

                    $('#calendar').fullCalendar('updateEvent', event);

                },

                eventRender: function(event, element) {
                    element.append( "<span class='closeon'>X</span>" );
                    element.find(".closeon").click(function() {
                        $('#calendar').fullCalendar('removeEvents', event._id);
                        hoursArray.splice(i,1);
                        minutesArray.splice(i,1);
                        console.log(hoursArray);
                        console.log(minutesArray);
                    });
                    
                },





            });

        },

    }








});

var hoursArray = new Array();
var minutesArray = new Array();
var days; 000
var hours;

var i;


mymodal.factory("CalendarFactory", function () {

    function assignEvent() {
        var x = document.getElementById("Start").value;

        var y = document.getElementById("End").value;
        hoursCalc(x, y);

    }



    function assignEdit() {
        var x = document.getElementById("editStart").value;

        var y = document.getElementById("editEnd").value;
        editTimes(x, y);

    }

    function removeEvent() {
        $('#myModal2').modal('hide');

                  
        
        $('#calendar').fullCalendar('removeEvents');
        
    
        hoursArray.length = 0;
        minutesArray.length = 0;
    }

    function editTimes(x, y) {
        //$('#calendar').fullCalendar('removeEvents');
        hoursArray.splice(i,1);
        minutesArray.splice(i,1);
        hoursCalc(x,y);
        console.log("moving to calculate hours function");
    }



    function doSubmit() {
        $('#myModal1').modal('hide');
        $("#calendar").fullCalendar('renderEvent',
            {
                title: title,
                start: startT,
                end: endT,
                allday: true,
            },
            true);
        i = 0;
        i += 1;



        console.log(startT, "statt date");
        console.log(endT, "endt date");

        var date1 = new Date(startT.format());
        var date2 = new Date(endT.format());

        console.log(date1, "Date one");
        console.log(date2, "Date two");



        days = parseInt(days_between(date1, date2));
        console.log(days, "Days Between")
        var test = startT;
        console.log(test, "this is test")
    }

    function hoursCalc(x,y) {
      
        title = x + '-' + y

        doSubmit();


        btnClicked = true;
        
        

        
        var sTime24 = parseInt(sTime, 10);

        var eTime24 = parseInt(sTime, 10);


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

        var h = parseInt((x[0] + x[1]));
        var h2 = parseInt((y[0] + y[1]));
        //var twelve = x[0] + x[1];

        console.log(isXAP)
        console.log(isYAP)
        console.log("the hour ", h);
        console.log("The other hour ", h2);

        // 12:00pm - 2:00pm
        
        if ((isXAP == "P") && (isYAP == "P") && (h == 12)) {

            eTime24 = parseInt(eTime, 10) + 12;
            console.log("This should equal 14", eTime24);
            sTime24 = parseInt(sTime, 10);
            console.log("This should equal 12", sTime24);
            hours = eTime24 - sTime24;
            console.log("This should equal 2", hours);
            
        }

        // 8:00pm - 7:00pm
        if ((isXAP == "P") && (isYAP == "P") && (h > h2) && (h != 12)){

            eTime24 = parseInt(eTime, 10);
            sTime24 = parseInt(sTime, 10);
            hours = (eTime24 - sTime24) + 24;

        }
        
        // 2:00pm - 6:00pm
        if ((isXAP == "P" && isYAP == "P") && (h < h2)) {
            
            eTime24 = parseInt(eTime, 10);
            sTime24 = parseInt(sTime, 10);
            hours = eTime24 - sTime24;
      
        }



        if (isXAP == "P" && isYAP == "A") {
            /*if (h == 12) {
                eTime24 = parseInt(eTime, 10) + 12;
                sTime24 = 0;
            }
            else {
                eTime24 = parseInt(eTime, 10) + 12;
                sTime24 = parseInt(sTime, 10);
            }
            hours = eTime24 - sTime24;*/

            eTime24 = parseInt(eTime, 10) + 12;
            sTime24 = parseInt(sTime, 10);
            hours = eTime24 - sTime24;

        }

        if ((isXAP == "A" && isYAP == "A") && (h < h2)) {
            
            eTime24 = parseInt(eTime, 10);
            sTime24 = parseInt(sTime, 10);
            hours = eTime24 - sTime24;

        }
        
        if ((isXAP == "A" && isYAP == "A") && (h > h2) && (h == 12)) {

            eTime24 = parseInt(eTime, 10);
            sTime24 = parseInt(sTime, 10);
            hours = eTime24;

        }

        if ((isXAP == "A" && isYAP == "A") && (h > h2) && (h != 12)) {

            eTime24 = parseInt(eTime, 10);
            sTime24 = parseInt(sTime, 10);
            hours = (eTime24 - sTime24) + 24;

        }

        if (isXAP == "A" && isYAP == "P") {
            eTime24 = parseInt(eTime, 10) + 12;
            sTime24 = parseInt(sTime, 10);
            hours = eTime24 - sTime24;
        }





        console.log("Start Time: ", sTime24);
        console.log("End Time: ", eTime24);

        //var hours = eTime24 - sTime24;

        console.log("Hours before minute calculation", hours);

        //document.getElementById("Start").value = "";
        //document.getElementById("End").value = "";

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

        if (isNaN(minutes)) {
            minutes = 0;
        }

        console.log("HOURS: ", hours);
        console.log("MINUTES: ", minutes);

        var extraHours = Math.floor((minutes * days) / 60);

        console.log(extraHours, "THIS IS X")

        console.log("DUDE")
        hoursArray.push((hours * days) + extraHours);

        console.log(hoursArray);



        minutesArray.push((minutes * days) % 60);




        console.log(117 / 60);

        console.log(minutesArray);






    }

    function addAllHours() {
        console.log("in add all hours function");
        var totalHours = 0;
        $.each(hoursArray, function () {
            totalHours += this;
        });

        var totalMinutes = 0;
        $.each(minutesArray, function () {
            totalMinutes += this;
        });

        alert("Total Hours: " + totalHours + " Total Minutes: " + totalMinutes);

    }

    var factory = {
        assignEvent: assignEvent,
        assignEdit:assignEdit,
        doSubmit: doSubmit,
        hoursCalc: hoursCalc,
        removeEvent: removeEvent,
        editTimes: editTimes,
        addAllHours: addAllHours

    }

    return factory



})

