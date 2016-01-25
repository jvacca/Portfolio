'use strict';

var $ = require('jquery'),
	blast = require('blast-text');

module.exports = function($scope, projectService) {
	
		var demoData = projectService.getProjects();
		var toggle = false;
		
		$scope.projects = demoData.projects;

		

		$(function() {
			console.dir("MainController initialized now!");
			initializeApp();
		});

		function initializeApp() {
			// fix scroll and bounce effect on iPads
			document.ontouchmove = function(e){
			    e.preventDefault();
			};

			// Listen to resize to keep footer anchored and center main vertically
			positionElements();

			$(window).resize(function() {
				positionElements();
			});

			// Add Sidebar menu sliding
			$("#menuicon").click(function(e) {
				e.preventDefault();
				toggle = !toggle;

				if (toggle) {
					TweenLite.to(sidebar, 0.5, {width: "10%", ease:Strong.easeOut});
					TweenLite.to(container, 0.5, {width: "90%", ease:Strong.easeOut});
					TweenLite.to([about, portfolio, menuopen, blog], 0.5, {autoAlpha: 1, delay: 0.15, ease:Strong.easeOut});
				} else {
					TweenLite.to(sidebar, 0.5, {width: "3%", ease:Strong.easeOut});
					TweenLite.to(container, 0.5, {width: "97%", ease:Strong.easeOut});
					TweenLite.to([about, portfolio, menuopen, blog], 0.5, {autoAlpha: 0, ease:Strong.easeOut});
				}
			});

			//TweenLite.delayedCall(0.25, startIntroAnimation);
			startIntroAnimation();
		}
		
		function startIntroAnimation() {
			// Inro animation

			TweenLite.to(container, 1, {autoAlpha: 1, ease:Strong.easeOut});
			TweenLite.to(intro, 1, {top: 0, autoAlpha: 1, delay: 1, ease:Strong.easeOut, onComplete:animateChars});
			
		}
		
		function animateChars() {
			 $("#copy").show();

			var chars = $("#copy").blast({
				delimeter: "character"
			});

			chars.each(function(n) {

			$(this).css({
			    opacity: 0
			  })

			  .delay(n * 5)

			  .animate({ opacity: 1 }, 30);
			});
		}		
		

		function positionElements() {
			var maxHeight = $(window).height();
			var intro_height = $(".intro-text").height();

			if (maxHeight > 600) {
				$(".container, .sidebar").css("height", maxHeight);

				$(".main").css("margin-top", (maxHeight/2)-300);
			}
		}
};

