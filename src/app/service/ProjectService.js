'use strict';

module.exports = function() {
	var chartData = {
		parentElement: 'graph',
		startDate: '10/12/15',
		endDate: '11/6/15',
		projects: [
  {
    "Brand": "Vyvanse",
    "color": "5d4777",
    "Project_Name": "Vyvanse BED ISI changes",
    "Job_Code": "480SH15BED102",
    "JIR_ ticket": "N/A",
    "Type": "active",
    "Status": "pending",
    "Task_due_date": "10/23/15",
    "Assigned": "Alain(50%)",
    "hrs": 32,
    "PM": "Elizabeth Kubert",
    "Comments": "waiting for assets",
    "scope": "3 concepts, 4 sizes",
    "Hours_burned": 0,
    "startDate": "10/19/15",
    "endDate": "10/23/15",
    "tasks": [
        {
            label: "build",
            startDate: "10/19/15",
            endDate: "10/22/15",
        },
        {
            label: "resizes",
            startDate: "10/24/15",
            endDate: "10/29/15",
        },
        {
            label: "QA",
            startDate: "11/3/15",
            endDate: "11/6/15",
        }
    ],
    "Estimate": 0
  }
]
	};

    this.getProjects = function() {
        return chartData;
    };

};