// Code goes here



var app = angular.module('app', []);

angular.module('app').controller('mainCtrl', function ($scope) {
    $scope.user1 = {
        name: 'Luke Skywalker',
        address: {
            street: 'PO box 123',
            city: 'Secret Rebel base',
            planet: 'Yavin 4'
        },
        friends: [
          'Han',
          'Leia',
          'Chewbacca'
        ]
    }
    $scope.user2 = {
        name: 'Han Solo',
        address: {
            street: 'PO box 123',
            city: 'Secret Rebel base',
            planet: 'Yavin 4'
        },
        friends: [
          'Leia',
          'Luke',
          'Chewbacca'
        ]
    }

    console.log($scope);

});

angular.module('app').directive('userInfoCard', function () {
    return {
        templateUrl: "userInfoCard.html",
        restrict: "E",
        scope: {
            user: '=',
            initialCollapsed: '@collapsed'
        },
        controller: function ($scope) {
            //$scope.collapsed = false;
            $scope.collapsed = ($scope.initialCollapsed === 'true')
            $scope.knightMe = function (user) {
                user.rank = "knight";
            }
            $scope.collapse = function () {
                $scope.collapsed = !$scope.collapsed;
            }
            $scope.removeFriend = function (friend) {
                var idx = $scope.user.friends.indexOf(friend);
                if (idx > -1) {
                    $scope.user.friends.splice(idx, 1);
                }

            }



        }

    }


});


angular.module('app').directive('address', function () {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'address.html',
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





angular.module('app').directive('removeFriend', function () {
    return {
        restrict: 'E',
        scope: {
            notifyParent: '&method'
        },
        templateUrl: 'removeFriend.html',
        controller: function ($scope) {
            $scope.removing = false;
            $scope.startRemove = function () {
                $scope.removing = true;
            }



            $scope.cancelRemove = function () {
                $scope.removing = false;
            }

            $scope.confirmRemove = function () {
                $scope.notifyParent();
            }
        }
    }

});
