'use strict';

require('es5-shim');
require('es5-sham');

var $ = require('jquery');
var angular = require('angular');
require('angular-route');

var app = angular.module('portfolio', ['ngRoute']);
app.controller('mainCtrl', require('./controllers/MainCtrl'));
app.controller('PortfolioCtrl', require('./controllers/PortfolioCtrl'));
app.controller('ResumeCtrl', require('./controllers/ResumeCtrl'));

app.service('projectService', require('./service/ProjectService'));

$(function() {

	app.config(function($routeProvider) {
		$routeProvider.otherwise({ redirectTo: '/portfolio' });
	});

	console.log("Hello World");

});
