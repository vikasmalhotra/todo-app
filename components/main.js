"use strict";
angular.module('todoApp', ['LocalStorageModule'])
	.controller('mainController',['$scope','localStorageService',function($scope,localStorageService) {
		$scope.init = function() {
            $scope.items = localStorageService.get('items') || [];
            $scope.itemsDone = localStorageService.get('itemsDone') || [];
            $scope.itemToInsert = '';
        }
        $scope.toggleDone = function(item) {
            if(item.done)
                $scope.itemsDone.push(item);
            else
                $scope.itemsDone.splice($scope.itemsDone.indexOf(item),1);
            $scope.setLocalStorage();
        }
        $scope.deleteItem = function(item) {
           $scope.items.splice($scope.items.indexOf(item),1);
           if(item.done) {
            $scope.itemsDone.splice($scope.itemsDone.indexOf(item),1);
           }
           $scope.setLocalStorage();
        }
         $scope.itemsCompleted = function() {
            angular.forEach($scope.itemsDone,function(item) {
                $scope.items.splice($scope.items.indexOf(item),1);
            });
            $scope.itemsDone = [];
            $scope.setLocalStorage();
        }
        $scope.addItem = function(text) {
            var itemToInsert = {
                done:false,
                text:text,
                createdDate: Date.now()
            };
            $scope.items.push(itemToInsert);
            $scope.setLocalStorage();         
        }

        $scope.setLocalStorage = function() {
            localStorageService.set('items', $scope.items);
            localStorageService.set('itemsDone', $scope.itemsDone);
        }
	}])
    .config(function (localStorageServiceProvider) {
      localStorageServiceProvider
        .setPrefix('todoApp');
    });