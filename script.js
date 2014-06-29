$(document).ready(function() {
	
	$("#submit").click(function(){
			
		$("#results").css({
			"display" : "block"
		});
		var boro    = $("#boro").val();
		var dist    = $("#dist").val();
		var ident   = $("#school-id").val();
		
	if(!boro || !dist || !ident) {
    	alert('please fill out all fields');
    	return false;
  	} else {
		
		if (ident < 100) {
			var ident = "0" + ident
		}
		if (dist < 10) {
			var dist0 = "0" + dist
		}

		var school_key = boro + ident;
		console.log(boro,dist,ident,school_key);
		    		
		var options = {
			chart: {
				renderTo: 'pie-1',
				type: 'pie'
			},
			title: {
				text: 'Demographics - 1'
			},
		    subtitle: {
	            text: 'School District Breakdowns, https://data.cityofnewyork.us'
		        },
		    tooltip: {
		    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		        },
		    plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		                    style: {
		                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		                    }
		                }
		            }
		        },
		    series: []
		};
		
		$.get('district_pie.csv', function(data) {
		    // Split the lines
		    var lines = data.split('\n');
		    // header line containes categories
			var lab_pie = lines[0].split(',');
		    // Iterate over the lines and add categories or series
		    $.each(lines, function(lineNo, line) {
		        var items = line.split(',');
		        
		        if (items[0] == dist) {
		            var series = {
		                	data: []
		            };
		            $.each(items, function(itemNo, item) {
		                if (itemNo > 0) {
		                    series.data.push({
		                    	type:'pie',
		                    	name: lab_pie[itemNo],
		                    	y: parseFloat(item)
		                	});
		                };
		            });        
		            options.series.push(series);
		    	}        
		    });
		    
		    // Create the chart
		    var chart = new Highcharts.Chart(options);
		});
		
//		var options = {
//			chart: {
//	        	renderTo: 'pie-2',
//            	type: 'pie'
//        	},
//    		title: {
//            	text: 'Demographics - 2'
//        	},
//        	subtitle: {
//		    	text: 'School District Breakdowns, https://data.cityofnewyork.us'
//		    },
//    		tooltip: {
//    	    	pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//        	},
//    		plotOptions: {
//            	pie: {
//                	allowPointSelect: true,
//                	cursor: 'pointer',
//                	dataLabels: {
//                    	enabled: true,
//                    	format: '<b>{point.name}</b>: {point.percentage:.1f} %',
//                    	style: {
//                        	color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
//                    	}
//                	}
//           	}
//        	},
//    		series: []
//		};
		
		$.get('pupil.csv', function(data) {
    		// Split the lines
    		var lines = data.split('\n');
    
    		// Iterate over the lines and add categories or series
    		$.each(lines, function(lineNo, line) {
        		var items = line.split(',');
                if (items[1] == school_key) {
                    ratio = items[0];
                    $("#pupil-teach").html(ratio);
                    console.log(ratio);
                }           	
        	});       
    	});
    	
		$.get('pupil_describe.csv', function(data) {
		    // Split the lines
		    var lines = data.split('\n');

		    mean  = lines[2].split(',')[1];
		    std   = lines[3].split(',')[1];
		    min   = lines[4].split(',')[1];
		    max   = lines[8].split(',')[1];
		    
		    $("#list-mean").html(mean);
		    $("#list-std").html(std);
		    $("#list-min").html(min);
		    $("#list-max").html(max);
		    
		    console.log(mean,std,min,max);
		});
		
		$.get('attendance_pie.csv', function(data) {
    		// Split the lines
    		var lines = data.split('\n');
    
    		// Iterate over the lines and find value
    		$.each(lines, function(lineNo, line) {
        		var items = line.split(',');
        
        		$.each(items, function(itemNo, item) {
        			if (items[0] == dist0) {
						attendance = items[1];
        				$("#attendance").html(attendance);
        			}
        		});       
    		});    
		});
		
		$.get('enrollment_pie.csv', function(data) {
    		// Split the lines
    		var lines = data.split('\n');
    
    		// Iterate over the lines and find value
    		$.each(lines, function(lineNo, line) {
        		var items = line.split(',');
        
        		$.each(items, function(itemNo, item) {
        			if (items[0] == dist0) {
        				enrollment = items[1];
        				$("#enrollment").html(enrollment);        				
        			}
        		});       
    		});    
		});
		
		$.get('sat.csv', function(data) {
    		// Split the lines
    		var lines = data.split('\n');
    
    		// Iterate over the lines and find value
    		$.each(lines, function(lineNo, line) {
        		var items = line.split(',');
        
        		$.each(items, function(itemNo, item) {
        			if (items[0] == school_key) {
        				sat_read = items[1];
        				sat_math = items[2];
        				sat_write = items[3];
        				$("#sat-read").html(sat_read);        				
        				$("#sat-math").html(sat_math);        				
        				$("#sat-write").html(sat_write); 

        			}
        		});       
    		});    
		});
	}
	});
});