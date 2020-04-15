(function() {
    'use strict';

    angular.module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        this.items = ShoppingListCheckOffService.getToBuyItems();

        this.buy = function(itemIndex) {
            ShoppingListCheckOffService.buy(itemIndex);
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        this.items = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var toBuyItems = [
            {
                name: "cookies",
                quantity: "10"
            },
            {
                name: "milk",
                quantity: "5"
            },
            {
                name: "Beer",
                quantity: "100500"
            },
            {
                name: "gandoms",
                quantity: "0"
            },
            {
                name: "laptop",
                quantity: "1"
            },
        ];

        var alreadyBoughtItems = [];

        this.buy = function(itemIndex) {
            alreadyBoughtItems.push(toBuyItems[itemIndex]);
            toBuyItems.splice(itemIndex, 1);
        }

        this.getToBuyItems = function() {
            return toBuyItems;
        }

        this.getBoughtItems = function() {
            return alreadyBoughtItems;
        }
    }

})();