'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('cardapp')
    .controller('DashboardCtrl', function($scope, $cookies, $state, UsersService) {
    	$scope.loggedIn = false;
    	$scope.user = {};
    	
    	$scope.logout = function() {
    		UsersService.logout().then(
    			function successCallback(data) {
    				$state.go('login');
    			},
    			function errorCallback(data) {
    				console.log("Error logging out.");
    			});
    	};

        var init = function () {
        	UsersService.currentUser().then(
        		function successCallback(data) {
        			$scope.loggedIn = true;
        			$scope.user = data;
        		},
        		function errorCallback(data) {
                    
        		});
        };

        init();
    });
