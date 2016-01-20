'use strict';

var $ = require('jquery')

module.exports = function($scope, projectService) {
	
		var demoData = projectService.getProjects();
		
		$scope.projects = demoData.projects;

		console.dir("Resume " + $scope.projects[0].Brand);

};