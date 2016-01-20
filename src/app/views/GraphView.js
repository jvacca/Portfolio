"use strict";

var $ = require('jquery');

Date.prototype.addDays = function(days) {
	var dat = new Date(this.valueOf());
	dat.setDate(dat.getDate() + days);
	return dat;
};

var GraphView = function() {

	return {
		
		graphData: [],
		model: null,
		barIntervalLength: 50,

		initialize: function(dataParam) {
			console.log("Initializing GraphView");

			//options = opts;
			this.model = dataParam;
			
			var demoData = this.model;

			var sd = demoData.startDate.split('/');
			var initial = new Date(parseInt(('20' + sd[2]), 10), (sd[0] - 1), sd[1]);

			for (var x=0; x < demoData.projects.length; x++) {
				var barData = demoData.projects[x];
				var bar;
				var tempObj;

				if (barData.Type != "maint") {
					if (barData.tasks) {
						bar = [];
						for (var y=0; y < barData.tasks.length; y++) {
							var data = barData.tasks[y];
							var subBar = {};
							subBar.label = data.label;
							tempObj = this.getLengthPosition(initial, data.startDate, data.endDate);
							subBar.length = tempObj.length;
							subBar.x = tempObj.x;

							bar.push(subBar);
						}
					} else {
						bar = {};
						bar.label = barData.Project_Name;
						bar.color = barData.color;
						tempObj = this.getLengthPosition(initial, barData.startDate, barData.endDate);
						bar.length = tempObj.length;
						bar.x = tempObj.x;
					}

					this.graphData.push(bar);
				}
			}

			this.render();
		},

		getDateObject: function(str) {
			var dat = str.split('/');
			return new Date(parseInt(('20' + dat[2]), 10), (dat[0] - 1), dat[1]);
		},
		
		getDates: function (startDate, stopDate) {
			var dateArray = [];
			var currentDate = startDate;
			while (currentDate <= stopDate) {
			dateArray.push(currentDate);
			currentDate = currentDate.addDays(1);
			}
			return dateArray;
		},

		getLengthPosition: function(initialDate, startDate, endDate) {
			var bar = {},
				start = this.getDateObject(startDate),
				end = this.getDateObject(endDate);

			var length = Math.round((end - start)/(1000*60*60*24));
			var xpos = Math.round((start - initialDate)/(1000*60*60*24));
			bar.length = (length * this.barIntervalLength) + this.barIntervalLength;
			bar.x = xpos * this.barIntervalLength;

			return bar;
		},

		createHTMLBar: function(index, barData, isSubBar) {
			var barHTML = $('<div>');

			if (isSubBar === true) {
				barHTML.id = 'subBar' + index;

				barHTML.addClass('gant-subar-style')
				.css({
					"width": barData.length,
					"left": barData.x + 'px'
				})
				.html(barData.label);
			} else {
				barHTML.id = 'bar' + index;

				barHTML.addClass('gant-bar-style')
				.css({
					"width": barData.length,
					"marginLeft": barData.x + 'px',
					"background": '#' + barData.color,
				})
				.html(barData.label);
			}
			

			return barHTML;
		},

		createParentBar: function(index, width) {
			var barHTML;
			var barData = this.model.projects[index];
			barHTML = $('<div>');
			barHTML.id = 'bar' + index;
			barHTML.addClass('gant-parentbar-style');
			barHTML.css({
				background: "#" + barData.color,
				width: width
			});

			var titleHTML = $('<div>');
			titleHTML.addClass('gant-title-style');
			titleHTML.html(barData.Project_Name);

			barHTML.append(titleHTML);

			return barHTML;
		},

		render: function() {
			console.log("Rendering all the bars");
			var start = this.getDateObject(this.model.startDate),
				end = this.getDateObject(this.model.endDate),
				arrDates = this.getDates(start, end),
				obj = this.getLengthPosition(this.model.startDate, this.model.startDate, this.model.endDate),
				barHTML;

			// create labels
			for (var n=0; n<arrDates.length; n++) {
				var label = $('<div>');
				label.addClass('gant-label-style')
				.css({ width: this.barIntervalLength})
				.html((arrDates[n].getMonth() + 1) + "/" + arrDates[n].getDate());
				
				$("#label").css({width: obj.length});
				$("#label").append(label);
			}

			for (var x=0; x< this.graphData.length; x++) {
				if (Object.prototype.toString.call( this.graphData[x] ) === '[object Array]') {
					barHTML = this.createParentBar(x, $("#label").width());

					var parentObj = this.graphData[x];
					for (var y=0; y < parentObj.length; y++) {

						var subBarHTML = this.createHTMLBar(x, parentObj[y], true);
						barHTML.append(subBarHTML);
					}
				} else {
					barHTML = this.createHTMLBar(x, this.graphData[x]);
				}

				console.log(barHTML)

				$('#gant-chart').append(barHTML);
			}
			
		}
		
	};
};

module.exports = GraphView;