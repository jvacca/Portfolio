'use strict';

require('es5-shim');
require('es5-sham');

var $ = require('jquery');
var angular = require('angular');
require('angular-route');
var app;

app = angular.module('portfolio', ['ngRoute']);

//console.log("Main initialized");

app.controller('mainCtrl', require('./controllers/MainCtrl'));
//app.controller('PortfolioCtrl', require('./controllers/PortfolioCtrl'));
app.service('projectService', require('./service/ProjectService'));

app.config(function($routeProvider) {
	$routeProvider.otherwise({ redirectTo: '/portfolio' });
});


	
	

	
