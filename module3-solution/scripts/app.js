(function() {
    'use strict';
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('APIBasePath', 'https://davids-restaurant.herokuapp.com')
        .directive('foundItems', FoundItemsService);

    function FoundItemsService() {
        return {
            templateUrl: 'foundItems.html',
            restrict: 'E',
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'fidc',
            bindToController: true
        };
    }

    function FoundItemsDirectiveController() {
        this.isEmptyItems = function() {
            if (this.foundItems !== undefined && this.foundItems.length === 0) {
                return true;
            }

            return false;
        };
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        this.narrowItDown = function() {
            var promise = MenuSearchService.getMatchedMenuItems(this.search);
            promise.then(function(result) {
                this.found = result;
            }).catch(function(e) {
                console.log(e.message);
            });
        };
        this.removeItem = function(itemIndex) {
            this.found.splice(itemIndex, 1);
        }
    }

    MenuSearchService.$inject = ['$http', 'APIBasePath'];
    function MenuSearchService($http, APIBasePath) {
        this.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: 'GET',
                url: (APIBasePath + '/menu_items.json')
            }).then(function success(result) {
                var foundItems = [];
                if (searchTerm !== undefined && searchTerm.length > 0) {
                    searchTerm = searchTerm.toLowerCase();
                    for (var i = 0; i < result.data.menu_items.length; i++) {
                        var menu_item = result.data.menu_items[i];
                        var description = menu_item.description.toLowerCase();
                        if (description.indexOf(searchTerm) !== -1) {
                            foundItems.push(menu_item);
                        }
                    }
                }

                return foundItems;
            }, function error(response) {
                throw new Error("Error occured!");
            });

        };
    }
})();