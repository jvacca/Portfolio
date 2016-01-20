'use strict';

var $ = require('jquery'),
	GraphView = require('views/GraphView');

module.exports = function($scope, projectService) {
	
		var demoData = projectService.getProjects();
		
		$scope.projects = demoData.projects;

		console.dir("Main " + $scope.projects[0].Brand);

};

