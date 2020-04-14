(function() {
    'use strict';
    angular.module('LunchCheck', [])
        .controller('LunchCheckController',LunchCheckController);
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.lunchMenu = '';
        $scope.message = '';
        $scope.check = function() {
            var itemsCount = getItemsCount();
            if(itemsCount <= 3 && itemsCount >= 1) {
                $scope.message = 'Enjoy!';
            } else if (itemsCount > 3) {
                $scope.message = 'Too much!';
            } else {
                $scope.message = 'Please enter data first!';
            }
        };

        function getItemsCount(){
            var items= $scope.lunchMenu.split(',');
            var itemsCountWithoutSpace = items.length;
            for (var i = 0; i < items.length; i++) {
                if(items[i] === ' ' || items[i] === '') {
                    itemsCountWithoutSpace--;
                }
            }

            return itemsCountWithoutSpace;
        };
    };
})();