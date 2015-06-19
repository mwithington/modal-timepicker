var mymodal = angular.module('mymodal', []);

//variables
var btnClicked = false;
var title;
var startT;
var endT;
var hoursArray = new Array();
var minutesArray = new Array();
var days;
var hours;
var minutes;
var i = 0;




/*
 *Controller
 */
mymodal.controller('MainCtrl', function ($scope, $http, CalendarFactory) {
    //$scope.selectedTest = null;
    //$scopescope.testAccounts = [];
    //$http({
    //    method: 'GET',
    //    url: '/test',
    //    data: { applicationId: 3 }
    //}).success(function (result){
    //    $scope.testAccounts = result;
    //})

    
    $http.get('json1.json').success(function (data) {
        console.log("Success!");
        $scope.user_id = data.user_id;

        $scope.deptCodes = [];
        for (var i = 0; i < data.division_codes.length; i++) {
            $scope.deptCodes[i] = data.division_codes[i][1];
            console.log("User Id", $scope.deptCodes)
        }

        $scope.locCodes = [];
        for (var j = 0; j < data.location_codes.length; j++) {
            $scope.locCodes[j] = data.location_codes[j][1];
            console.log("User Id", $scope.locCodes)
        }


        $scope.proCodes = data.project_codes;
        $scope.proCodes = [];
        for (var k = 0; k < data.project_codes.length; k++) {
            $scope.proCodes[k] = data.project_codes[k][1];
            console.log("User Id", $scope.proCodes)
        }
        

        


    });



    
    $scope.start_time = '12:00AM',
    $scope.end_time = '12:00PM',

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

    /*$scope.editTimes = function () {
        CalendarFactory.assignEdit();
        $('#myModal2').modal("hide");
    };*/

    $scope.addAllHours = function(){
        CalendarFactory.addAllHours();
    };

    $scope.showOptions = function () {
        CalendarFactory.showOptions();
    };

    $scope.saveOptions = function () {
        CalendarFactory.saveOptions();

    };

    $scope.confirmDelete = function () {
        CalendarFactory.confirmDelete();
    };

});

/*
 *Modal1 Directive
 */
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

/*
 *Modal2 Directive
 */
/*mymodal.directive('modal2', function () {
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



});*/


/*
 *Modal3 Directive
 */


mymodal.directive('modal3', function () {
    return {
        templateUrl: 'userOptionsModal3.html',
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


/*
 *ClockPicker Directive
 */
mymodal.directive('clockPicker', function () {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            $('.clockpicker').clockpicker({
                donetext: "Submit Time",
                twelvehour: "true"
            })
        }
    }
});

/*
 *FullCalendar Directive
 */
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
                selectable: true,

                //select
                select: function (start, end) {
                    console.log('Selected something: ');
                    $('#myModal1').modal("show");
                    
                    
                    console.log(start);
                    console.log(end);
                    
                    var x = document.getElementById("Start").value;
                    var y = document.getElementById("End").value;

                    console.log(x)

                    endT = end;
                    startT = start;
                    

                },
                
                //eventClick
                /*eventClick: function (event, element) {

                    $('#myModal2').modal("show");
                    console.log(hoursArray);
                    console.log(minutesArray);
                    $('#calendar').fullCalendar('updateEvent', event);

                },*/

                //deleting event
                eventRender: function(event, element) {
                    element.append( "<span class='closeon'>X</span>" );
                    element.find(".closeon").click(function() {
                        $('#calendar').fullCalendar('removeEvents', event._id);

                        console.log("EventID", event._id);

                        hoursArray[event._id] = 0;
                        minutesArray[event._id] = 0;
                        console.log(hoursArray);
                        console.log(minutesArray);
                    });
                    
                },

            });

        },

    }

});

/*
 *Header Directive
 */

mymodal.directive("titleBar", function () {
    return {
        transclude: false,
        scope: {
            title: '@',
            subtitle: '@'

        },
        templateUrl: "demos/header/titleBarTemplate.html"

    };
});

/*
 *days_between function
 */
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

/*
 *Factory
 */



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
        
        $('#calendar').fullCalendar('removeEvents');
        
        hoursArray.length = 0;
        minutesArray.length = 0;

        console.log(hoursArray);
        console.log(minutesArray);
    }

    function editTimes(x, y) {
        $('#calendar').fullCalendar('removeEvents', event._id);
        hoursArray[event._id] = 0;
        minutesArray[event._id] = 0;
        event.title = "CLICKED!";

        $('#calendar').fullCalendar('updateEvent', event);
        hoursCalc(x,y);
        
    }

    function doSubmit() {
        $('#myModal1').modal('hide');
        
        $("#calendar").fullCalendar('renderEvent',
            {
                id: i,
                title: title,
                start: startT,
                end: endT,
                allday: true,
            },
            true);
        i++;
        
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

        console.log(x, "This is start time")
        console.log(y, "This is end Time")
        var eTime = y.split(":", 1)

        var sTime = x.split(":", 1)
        console.log(eTime)

        var isXAP = x[5];
        var isYAP = y[5];

        var h = parseInt((x[0] + x[1]));
        var h2 = parseInt((y[0] + y[1]));

        console.log(isXAP)
        console.log(isYAP)
        console.log("the hour ", h);
        console.log("The other hour ", h2);

        // 12:00pm - 2:00pm
        if (((isXAP == "P") || (isXAP == "p")) && ((isYAP == "P") || (isYAP == "p")) && (h == 12)) {

            eTime24 = parseInt(eTime, 10) + 12;
            console.log("This should equal 14", eTime24);
            sTime24 = parseInt(sTime, 10);
            console.log("This should equal 12", sTime24);
            hours = eTime24 - sTime24;
            console.log("This should equal 2", hours);

        }

        // 8:00pm - 7:00pm
        if (((isXAP == "P") || (isXAP == "p")) && ((isYAP == "P") || (isYAP == "p")) && (h > h2) && (h != 12)) {

            eTime24 = parseInt(eTime, 10);
            sTime24 = parseInt(sTime, 10);
            hours = (eTime24 - sTime24) + 24;

        }

        // 2:00pm - 6:00pm
        if (((isXAP == "P") || (isXAP == "p")) && ((isYAP == "P") || (isYAP == "p")) && (h < h2)) {

            eTime24 = parseInt(eTime, 10);
            sTime24 = parseInt(sTime, 10);
            hours = eTime24 - sTime24;

        }

        if (((isXAP == "P") || (isXAP == "p")) && ((isYAP == "A") || (isYAP == "a"))) {

            eTime24 = parseInt(eTime, 10) + 12;
            sTime24 = parseInt(sTime, 10);
            hours = eTime24 - sTime24;

        }

        if (((isXAP == "A") || (isXAP == "a")) && ((isYAP == "A") || (isYAP == "a")) && (h < h2)) {

            eTime24 = parseInt(eTime, 10);
            sTime24 = parseInt(sTime, 10);
            hours = eTime24 - sTime24;

        }

        if (((isXAP == "A") || (isXAP == "a")) && ((isYAP == "A") || (isYAP == "a")) && (h > h2) && (h == 12)) {

            eTime24 = parseInt(eTime, 10);
            sTime24 = parseInt(sTime, 10);
            hours = eTime24;

        }

        if (((isXAP == "A") || (isXAP == "a")) && ((isYAP == "A") || (isYAP == "a")) && (h > h2) && (h != 12)) {

            eTime24 = parseInt(eTime, 10);
            sTime24 = parseInt(sTime, 10);
            hours = (eTime24 - sTime24) + 24;

        }

        if (((isXAP == "A") || (isXAP == "a")) && ((isYAP == "P") || (isYAP == "p"))) {
            eTime24 = parseInt(eTime, 10) + 12;
            sTime24 = parseInt(sTime, 10);
            hours = eTime24 - sTime24;
        }

        console.log("Start Time: ", sTime24);
        console.log("End Time: ", eTime24);

        console.log("Hours before minute calculation", hours);

        var sMinutes = parseInt(x[3] + x[4]);
        console.log(sMinutes, "THIS IS THE START MINUTES");
        var eMinutes = parseInt(y[3] + y[4]);
        console.log(eMinutes, "THIS IS THE END MINUTES");
        
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

        var $hoursAlert = $("#hoursAlert");
        $hoursAlert.on("close.bs.alert", function () {
            $hoursAlert.hide();
            return false;
        });

        var display = "<strong>Total Hours: </strong>" + totalHours + "<br/><strong> Total Minutes: </strong>" + totalMinutes;
        document.getElementById("alert").innerHTML = display;
        $("#hoursAlert").show();
        

    }

    function confirmDelete() {
        var $deleteAlert = $("#deleteAlert");
        $deleteAlert.on("close.bs.alert", function () {
            $deleteAlert.hide();
            return false;
        });

        $("#deleteAlert").show();
    }


    function showOptions() {
        $('#myModal3').modal('show');



    }
    function saveOptions() {

        alert("Options Saved")
        $('#myModal3').modal('hide');

    }

    var factory = {
        assignEvent: assignEvent,
        assignEdit:assignEdit,
        doSubmit: doSubmit,
        hoursCalc: hoursCalc,
        removeEvent: removeEvent,
        editTimes: editTimes,
        addAllHours: addAllHours,
        saveOptions: saveOptions,
        showOptions: showOptions,
        confirmDelete: confirmDelete

    }

    return factory

})
 




mymodal.directive('userInfoCard', function () {
    return {
        templateUrl: "userInfoCardEx/userInfoCard.html",
        restrict: "E",
        scope: {
            user: '=',
            deptCode: '=',
            locCode: '=',
            proCode: '=',
            initialCollapsed: '@collapsed'
        },
        controller: function ($scope) {
            //$scope.collapsed = false;
            $scope.collapsed = ($scope.initialCollapsed === 'true')
           
            $scope.collapse = function () {
                $scope.collapsed = !$scope.collapsed;
            }
       

        }

    }


});


mymodal.directive('address', function () {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'userInfoCardEx/address.html',
        controller: function ($scope) {
            $scope.collapsed = false;

            $scope.collapseAddress = function () {
                $scope.collapsed = true;
            }
            $scope.expandAddress = function () {
                $scope.collapsed = false;
            }
        }
    }


});


