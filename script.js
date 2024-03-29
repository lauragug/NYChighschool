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
		    		
		
		$.get('csv_files/district_pie.csv', function(data) {

			var optionsPie = {
				title: {
					text: 'Demographics - 1'
				},
		    	subtitle: {
	            	text: 'averaged for the district, https://data.cityofnewyork.us'
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
		    	series: [
		    		{
		    	    type:'pie',
                	data: []
            		}
            	]
			};

		    var lines = data.split('\n');
			var lab_pie = lines[0].split(',');

		    $.each(lines, function(lineNo, line) {
		        var items = line.split(',');
		        
		        if (items[0] == dist) {
//		            var series = {
//		                	data: []
//		            };
		            $.each(items, function(itemNo, item) {
		                if (itemNo > 0) {
//	                			optionsPie.series[0].data.push(parseFloat(items[1]));	                
		                    optionsPie.series[0].data.push({
		                    	type:'pie',
		                    	name: lab_pie[itemNo],
		                    	y: parseFloat(item)
		                	});
		                };
		            });        
		    	}        
		    });
		    
		    $('#pie-1').highcharts(optionsPie);
		    // Create the chart
		    //var chart = new Highcharts.Chart(options);
		});
		
		$.get('csv_files/district_pie1.csv', function(data) {

			var optionsPie = {
				title: {
					text: 'Demographics - 2'
				},
		    	subtitle: {
	            	text: 'averaged for the district, https://data.cityofnewyork.us'
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
		    	series: [
		    		{
		    	    type:'pie',
                	data: []
            		}
            	]
			};

		    var lines = data.split('\n');
			var lab_pie = lines[0].split(',');

		    $.each(lines, function(lineNo, line) {
		        var items = line.split(',');
		        
		        if (items[0] == dist) {
//		            var series = {
//		                	data: []
//		            };
		            $.each(items, function(itemNo, item) {
		                if (itemNo > 0) {
//	                			optionsPie.series[0].data.push(parseFloat(items[1]));	                
		                    optionsPie.series[0].data.push({
		                    	type:'pie',
		                    	name: lab_pie[itemNo],
		                    	y: parseFloat(item)
		                	});
		                };
		            });        
		    	}        
		    });
		    
		    $('#pie-2').highcharts(optionsPie);
		    // Create the chart
		    //var chart = new Highcharts.Chart(options);
		});

		$.get('csv_files/pupil.csv', function(data) {
    		// Split the lines
    		var lines = data.split('\n');
        	var checkp = 0;   
        	 
    		// Iterate over the lines and add categories or series
    		$.each(lines, function(lineNo, line) {
        		var items = line.split(',');
                if (items[1] == school_key) {
                    ratio = items[0];
                    $("#pupil-teach").html(ratio);
                    console.log(ratio);
                    checkp = 1;
                }           	
                
        	});  
        	if (checkp == 0) $("#pupil-teach").html('- Not available -');     
    	});
    	
		$.get('csv_files/pupil_describe.csv', function(data) {
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
		
		$.get('csv_files/attendance_pie.csv', function(data) {
    		// Split the lines
    		var lines = data.split('\n');
    		var checkA = 0;
    		
    		// Iterate over the lines and find value
    		$.each(lines, function(lineNo, line) {
        		var items = line.split(',');
        
        		$.each(items, function(itemNo, item) {
        			
        			if (items[0] == dist0) {
						attendance = items[1];
        				$("#attendance").html(attendance);
        				checkA = 1;
        			}                	
        		});         		      
    		}); 
    		if (checkA==0) $("#attendance").html('- Not available -');        			   
		});
		
		$.get('csv_files/enrollment_pie.csv', function(data) {
    		// Split the lines
    		var lines = data.split('\n');
    		var checkE = 0;
    		// Iterate over the lines and find value
    		$.each(lines, function(lineNo, line) {
        		var items = line.split(',');
        
        		$.each(items, function(itemNo, item) {
        			
        			if (items[0] == dist0) {
        				enrollment = items[1];
        				$("#enrollment").html(enrollment);  
        				checkE = 1;      				
        			}
                	
        		});       
    		}); 
    		if (checkE == 0) $("#enrollment").html('- Not available -');        			        			   
		});
		
		$.get('csv_files/sat.csv', function(data) {
    		// Split the lines
    		var lines = data.split('\n');
    		var checkS = 0;
    		
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
						checkS = 1;
        			}
                	       			        			
        		});       
    		});
    		if (checkS==0) {
                		$("#sat-read").html('- Not available -'); 
                		$("#sat-math").html('- Not available -'); 
                		$("#sat-write").html('- Not available -'); 
                	}    
		});
		
		$(function () {
    		$('#scatter_sat').highcharts({
        		chart: {
            		type: 'scatter',
            		zoomType: 'xy'
        		},
        		title: {
            		text: 'SAT scores dependencies'
        		},
        		subtitle: {
            		text: 'averaged for the school, https://data.cityofnewyork.us'
        		},
        		xAxis: {
            		title: {
                		enabled: true,
                		text: 'Peer Index'
            		},
            		startOnTick: true,
            		endOnTick: true,
            		showLastLabel: true
       			},
        		yAxis: {
            		title: {
                		text: 'SAT scores'
            		}
        		},
        		legend: {
            		layout: 'vertical',
            		align: 'left',
            		verticalAlign: 'top',
            		x: 100,
            		y: 70,
            		floating: true,
            		backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            		borderWidth: 1
        		},
        		plotOptions: {
            		scatter: {
                		marker: {
                    		radius: 5,
                    		states: {
                        		hover: {
                            		enabled: true,
                            		lineColor: 'rgb(100,100,100)'
                        		}
                    		}
                		},
                		states: {
                    		hover: {
                        		marker: {
                            		enabled: false
                        		}
                    		}
                		},
                		tooltip: {
                    		headerFormat: '<b>{series.name}</b><br>',
                    		pointFormat: '{point.x}, {point.y}'
                		}
            		}
        		},
        		series: [{
            		name: 'Critical Reading Mean',
            		color: 'rgba(223, 83, 83, .5)',
            		data: [[   2.16,  391.  ],
       [   2.24,  394.  ],
       [   2.42,  418.  ],
       [   3.55,  568.  ],
       [   3.81,  630.  ],
       [   1.67,  405.  ],
       [   2.44,  422.  ],
       [   2.28,  382.  ],
       [   2.28,  397.  ],
       [   2.82,  424.  ],
       [   2.5 ,  405.  ],
       [   2.16,  381.  ],
       [   2.52,  411.  ],
       [   2.22,  409.  ],
       [   2.34,  401.  ],
       [   2.58,  395.  ],
       [   2.78,  465.  ],
       [   2.68,  484.  ],
       [   3.25,  495.  ],
       [   3.45,  523.  ],
       [   3.22,  561.  ],
       [   2.85,  475.  ],
       [   2.97,  454.  ],
       [   3.6 ,  555.  ],
       [   3.34,  512.  ],
       [   2.24,  369.  ],
       [   2.93,  446.  ],
       [   2.38,  419.  ],
       [   1.94,  379.  ],
       [   3.  ,  465.  ],
       [   2.29,  367.  ],
       [   2.52,  418.  ],
       [   2.18,  381.  ],
       [   4.03,  674.  ],
       [   2.79,  451.  ],
       [   1.95,  371.  ],
       [   3.18,  465.  ],
       [   2.47,  411.  ],
       [   2.48,  420.  ],
       [   2.82,  415.  ],
       [   2.32,  345.  ],
       [   2.38,  390.  ],
       [   3.14,  416.  ],
       [   2.2 ,  372.  ],
       [   2.43,  425.  ],
       [   2.74,  419.  ],
       [   2.4 ,  393.  ],
       [   2.2 ,  378.  ],
       [   2.24,  370.  ],
       [   2.83,  427.  ],
       [   2.26,  399.  ],
       [   2.21,  406.  ],
       [   2.15,  364.  ],
       [   2.19,  374.  ],
       [   2.08,  376.  ],
       [   3.51,  573.  ],
       [   3.64,  558.  ],
       [   2.34,  407.  ],
       [   3.26,  481.  ],
       [   2.28,  414.  ],
       [   2.2 ,  390.  ],
       [   3.1 ,  485.  ],
       [   2.09,  360.  ],
       [   2.53,  362.  ],
       [   3.05,  451.  ],
       [   2.06,  380.  ],
       [   2.13,  369.  ],
       [   2.53,  424.  ],
       [   2.46,  349.  ],
       [   2.43,  420.  ],
       [   3.14,  465.  ],
       [   2.66,  423.  ],
       [   2.03,  364.  ],
       [   3.76,  592.  ],
       [   2.17,  383.  ],
       [   2.26,  366.  ],
       [   2.22,  388.  ],
       [   2.28,  385.  ],
       [   2.89,  436.  ],
       [   2.29,  342.  ],
       [   2.44,  399.  ],
       [   1.66,  322.  ],
       [   2.12,  372.  ],
       [   2.11,  345.  ],
       [   2.74,  401.  ],
       [   2.86,  460.  ],
       [   2.08,  418.  ],
       [   2.14,  377.  ],
       [   2.05,  382.  ],
       [   2.56,  381.  ],
       [   2.34,  416.  ],
       [   1.95,  367.  ],
       [   1.7 ,  370.  ],
       [   2.4 ,  400.  ],
       [   2.66,  395.  ],
       [   2.23,  389.  ],
       [   1.85,  377.  ],
       [   1.94,  359.  ],
       [   2.12,  380.  ],
       [   2.13,  374.  ],
       [   2.22,  414.  ],
       [   2.06,  381.  ],
       [   2.04,  373.  ],
       [   2.06,  377.  ],
       [   1.68,  356.  ],
       [   1.91,  370.  ],
       [   1.93,  371.  ],
       [   2.29,  391.  ],
       [   1.67,  359.  ],
       [   2.44,  401.  ],
       [   2.58,  395.  ],
       [   2.95,  447.  ],
       [   2.2 ,  359.  ],
       [   2.07,  362.  ],
       [   1.83,  388.  ],
       [   2.14,  394.  ],
       [   1.97,  335.  ],
       [   1.88,  366.  ],
       [   1.96,  369.  ],
       [   2.78,  423.  ],
       [   1.75,  347.  ],
       [   2.48,  413.  ],
       [   2.34,  399.  ],
       [   2.12,  402.  ],
       [   1.95,  332.  ],
       [   2.55,  475.  ],
       [   2.26,  374.  ],
       [   2.58,  382.  ],
       [   2.39,  373.  ],
       [   2.06,  365.  ],
       [   1.85,  313.  ],
       [   2.43,  404.  ],
       [   2.34,  333.  ],
       [   2.69,  418.  ],
       [   2.04,  386.  ],
       [   2.03,  358.  ],
       [   2.09,  377.  ],
       [   2.13,  375.  ],
       [   1.96,  389.  ],
       [   2.4 ,  425.  ],
       [   2.75,  421.  ],
       [   3.91,  632.  ],
       [   1.86,  364.  ],
       [   2.69,  406.  ],
       [   3.18,  389.  ],
       [   2.38,  406.  ],
       [   1.94,  340.  ],
       [   1.92,  380.  ],
       [   3.79,  635.  ],
       [   2.58,  363.  ],
       [   2.26,  393.  ],
       [   2.49,  356.  ],
       [   2.33,  373.  ],
       [   2.35,  399.  ],
       [   2.81,  432.  ],
       [   2.11,  369.  ],
       [   2.17,  404.  ],
       [   1.62,  354.  ],
       [   2.31,  419.  ],
       [   1.71,  380.  ],
       [   2.19,  331.  ],
       [   1.93,  359.  ],
       [   2.  ,  372.  ],
       [   2.63,  427.  ],
       [   1.99,  359.  ],
       [   2.03,  393.  ],
       [   1.97,  368.  ],
       [   1.97,  340.  ],
       [   2.06,  364.  ],
       [   1.89,  383.  ],
       [   1.95,  415.  ],
       [   2.17,  408.  ],
       [   2.09,  291.  ],
       [   1.75,  333.  ],
       [   1.98,  386.  ],
       [   1.91,  355.  ],
       [   1.84,  346.  ],
       [   2.57,  387.  ],
       [   2.25,  394.  ],
       [   2.36,  393.  ],
       [   2.48,  419.  ],
       [   3.81,  588.  ],
       [   2.76,  414.  ],
       [   2.2 ,  367.  ],
       [   2.17,  416.  ],
       [   3.07,  453.  ],
       [   2.25,  390.  ],
       [   3.28,  476.  ],
       [   1.89,  362.  ],
       [   2.06,  373.  ],
       [   2.51,  377.  ],
       [   3.63,  536.  ],
       [   2.3 ,  381.  ],
       [   2.43,  365.  ],
       [   2.53,  385.  ],
       [   2.54,  360.  ],
       [   2.41,  397.  ],
       [   2.45,  399.  ],
       [   2.64,  375.  ],
       [   2.02,  353.  ],
       [   2.09,  375.  ],
       [   2.24,  374.  ],
       [   2.14,  385.  ],
       [   2.51,  406.  ],
       [   2.34,  393.  ],
       [   2.28,  373.  ],
       [   2.31,  402.  ],
       [   1.93,  365.  ],
       [   2.03,  370.  ],
       [   2.87,  416.  ],
       [   2.44,  429.  ],
       [   1.79,  369.  ],
       [   1.97,  367.  ],
       [   2.51,  401.  ],
       [   2.35,  400.  ],
       [   2.15,  302.  ],
       [   2.28,  382.  ],
       [   2.21,  357.  ],
       [   2.26,  358.  ],
       [   2.15,  361.  ],
       [   2.12,  371.  ],
       [   3.23,  445.  ],
       [   2.27,  392.  ],
       [   2.98,  412.  ],
       [   2.45,  391.  ],
       [   2.45,  385.  ],
       [   3.32,  459.  ],
       [   2.55,  419.  ],
       [   1.83,  355.  ],
       [   2.93,  435.  ],
       [   2.16,  376.  ],
       [   2.22,  369.  ],
       [   2.2 ,  371.  ],
       [   2.27,  370.  ],
       [   2.51,  413.  ],
       [   2.49,  398.  ],
       [   1.78,  355.  ],
       [   2.35,  409.  ],
       [   2.58,  450.  ],
       [   2.59,  416.  ],
       [   2.29,  387.  ],
       [   2.05,  355.  ],
       [   2.57,  422.  ],
       [   2.36,  370.  ],
       [   2.53,  386.  ],
       [   2.75,  472.  ],
       [   2.65,  414.  ],
       [   2.02,  385.  ],
       [   2.5 ,  426.  ],
       [   3.16,  493.  ],
       [   2.72,  449.  ],
       [   2.21,  380.  ],
       [   3.54,  543.  ],
       [   3.27,  459.  ],
       [   2.25,  394.  ],
       [   2.38,  416.  ],
       [   2.36,  396.  ],
       [   2.82,  407.  ],
       [   2.46,  411.  ],
       [   3.7 ,  545.  ],
       [   2.35,  379.  ],
       [   2.38,  398.  ],
       [   2.58,  386.  ],
       [   2.63,  355.  ],
       [   2.52,  363.  ],
       [   2.65,  420.  ],
       [   2.58,  415.  ],
       [   3.05,  444.  ],
       [   2.45,  325.  ],
       [   2.93,  438.  ],
       [   2.82,  429.  ],
       [   2.45,  391.  ],
       [   2.45,  372.  ],
       [   3.98,  637.  ],
       [   2.7 ,  449.  ],
       [   3.03,  486.  ],
       [   2.92,  457.  ],
       [   2.38,  402.  ],
       [   3.08,  472.  ],
       [   2.8 ,  438.  ],
       [   2.45,  393.  ],
       [   2.91,  455.  ],
       [   2.13,  377.  ],
       [   2.05,  393.  ],
       [   2.38,  380.  ],
       [   2.32,  399.  ],
       [   3.21,  421.  ],
       [   2.87,  468.  ],
       [   2.26,  393.  ],
       [   2.57,  385.  ],
       [   2.89,  455.  ],
       [   3.54,  525.  ],
       [   3.89,  613.  ],
       [   2.59,  408.  ],
       [   2.43,  372.  ],
       [   2.54,  406.  ],
       [   2.34,  394.  ],
       [   2.6 ,  425.  ],
       [   2.55,  413.  ],
       [   2.61,  405.  ],
       [   2.3 ,  406.  ],
       [   2.15,  388.  ],
       [   2.48,  383.  ],
       [   2.41,  405.  ],
       [   2.47,  418.  ],
       [   3.38,  506.  ],
       [   2.45,  440.  ],
       [   2.22,  343.  ],
       [   3.03,  502.  ],
       [   3.58,  560.  ],
       [   2.66,  508.  ],
       [   2.39,  431.  ],
       [   2.2 ,  437.  ],
       [   2.33,  439.  ],
       [   2.82,  459.  ],
       [   2.49,  463.  ],
       [   1.88,  411.  ],
       [   3.89,  638.  ],
       [   2.02,  382.  ],
       [   2.42,  389.  ],
       [   2.07,  363.  ],
       [   1.92,  355.  ],
       [   2.86,  394.  ],
       [   1.91,  357.  ]
            		]
					}, {
            		name: 'Mathematics Mean',
            		color: 'rgba(119, 152, 191, .5)',
            		data: [
            		[   2.24,  419.  ],
       [   2.42,  431.  ],
       [   3.55,  583.  ],
       [   3.81,  608.  ],
       [   1.67,  415.  ],
       [   2.44,  412.  ],
       [   2.28,  364.  ],
       [   2.28,  415.  ],
       [   2.82,  448.  ],
       [   2.5 ,  446.  ],
       [   2.16,  373.  ],
       [   2.52,  406.  ],
       [   2.22,  381.  ],
       [   2.34,  409.  ],
       [   2.58,  376.  ],
       [   2.78,  480.  ],
       [   2.68,  478.  ],
       [   3.25,  465.  ],
       [   3.45,  583.  ],
       [   3.22,  597.  ],
       [   2.85,  488.  ],
       [   2.97,  448.  ],
       [   3.6 ,  596.  ],
       [   3.34,  554.  ],
       [   2.24,  370.  ],
       [   2.93,  458.  ],
       [   2.38,  429.  ],
       [   1.94,  356.  ],
       [   3.  ,  479.  ],
       [   2.29,  395.  ],
       [   2.52,  463.  ],
       [   2.18,  385.  ],
       [   4.03,  735.  ],
       [   2.79,  503.  ],
       [   1.95,  369.  ],
       [   3.18,  454.  ],
       [   2.47,  439.  ],
       [   2.48,  424.  ],
       [   2.82,  405.  ],
       [   2.32,  380.  ],
       [   2.38,  385.  ],
       [   3.14,  612.  ],
       [   2.2 ,  369.  ],
       [   2.43,  429.  ],
       [   2.74,  420.  ],
       [   2.4 ,  412.  ],
       [   2.2 ,  387.  ],
       [   2.24,  378.  ],
       [   2.83,  423.  ],
       [   2.26,  389.  ],
       [   2.21,  378.  ],
       [   2.15,  378.  ],
       [   2.19,  363.  ],
       [   2.08,  373.  ],
       [   3.51,  563.  ],
       [   3.64,  555.  ],
       [   2.34,  425.  ],
       [   3.26,  525.  ],
       [   2.28,  410.  ],
       [   2.2 ,  372.  ],
       [   3.1 ,  531.  ],
       [   2.09,  374.  ],
       [   2.53,  378.  ],
       [   3.05,  445.  ],
       [   2.06,  385.  ],
       [   2.13,  385.  ],
       [   2.53,  421.  ],
       [   2.46,  370.  ],
       [   2.43,  369.  ],
       [   3.14,  481.  ],
       [   2.66,  434.  ],
       [   2.03,  378.  ],
       [   3.76,  627.  ],
       [   2.17,  384.  ],
       [   2.26,  376.  ],
       [   2.22,  388.  ],
       [   2.28,  417.  ],
       [   2.89,  451.  ],
       [   2.29,  384.  ],
       [   2.44,  393.  ],
       [   1.66,  335.  ],
       [   2.12,  351.  ],
       [   2.11,  352.  ],
       [   2.74,  388.  ],
       [   2.86,  455.  ],
       [   2.08,  429.  ],
       [   2.14,  381.  ],
       [   2.05,  376.  ],
       [   2.56,  423.  ],
       [   2.34,  406.  ],
       [   1.95,  372.  ],
       [   1.7 ,  385.  ],
       [   2.4 ,  391.  ],
       [   2.66,  407.  ],
       [   2.23,  375.  ],
       [   1.85,  367.  ],
       [   1.94,  358.  ],
       [   2.12,  389.  ],
       [   2.13,  362.  ],
       [   2.22,  433.  ],
       [   2.06,  361.  ],
       [   2.04,  376.  ],
       [   2.06,  382.  ],
       [   1.68,  376.  ],
       [   1.91,  377.  ],
       [   1.93,  358.  ],
       [   2.29,  399.  ],
       [   1.67,  380.  ],
       [   2.44,  383.  ],
       [   2.58,  398.  ],
       [   2.95,  495.  ],
       [   2.2 ,  347.  ],
       [   2.07,  380.  ],
       [   1.83,  352.  ],
       [   2.14,  404.  ],
       [   1.97,  335.  ],
       [   1.88,  373.  ],
       [   1.96,  397.  ],
       [   2.78,  450.  ],
       [   1.75,  353.  ],
       [   2.48,  390.  ],
       [   2.34,  414.  ],
       [   2.12,  397.  ],
       [   1.95,  379.  ],
       [   2.55,  479.  ],
       [   2.26,  402.  ],
       [   2.58,  375.  ],
       [   2.39,  358.  ],
       [   2.06,  382.  ],
       [   1.85,  316.  ],
       [   2.43,  397.  ],
       [   2.34,  336.  ],
       [   2.69,  411.  ],
       [   2.04,  385.  ],
       [   2.03,  370.  ],
       [   2.09,  375.  ],
       [   2.13,  385.  ],
       [   1.96,  400.  ],
       [   2.4 ,  440.  ],
       [   2.75,  432.  ],
       [   3.91,  685.  ],
       [   1.86,  375.  ],
       [   2.69,  429.  ],
       [   3.18,  383.  ],
       [   2.38,  389.  ],
       [   1.94,  340.  ],
       [   1.92,  385.  ],
       [   3.79,  630.  ],
       [   2.58,  366.  ],
       [   2.26,  363.  ],
       [   2.49,  370.  ],
       [   2.33,  376.  ],
       [   2.35,  402.  ],
       [   2.81,  464.  ],
       [   2.11,  363.  ],
       [   2.17,  400.  ],
       [   1.62,  373.  ],
       [   2.31,  403.  ],
       [   1.71,  384.  ],
       [   2.19,  384.  ],
       [   1.93,  389.  ],
       [   2.  ,  359.  ],
       [   2.63,  416.  ],
       [   1.99,  340.  ],
       [   2.03,  395.  ],
       [   1.97,  349.  ],
       [   1.97,  361.  ],
       [   2.06,  364.  ],
       [   1.89,  360.  ],
       [   1.95,  390.  ],
       [   2.17,  400.  ],
       [   2.09,  333.  ],
       [   1.75,  326.  ],
       [   1.98,  397.  ],
       [   1.91,  369.  ],
       [   1.84,  341.  ],
       [   2.57,  369.  ],
       [   2.25,  371.  ],
       [   2.36,  356.  ],
       [   2.48,  421.  ],
       [   3.81,  652.  ],
       [   2.76,  415.  ],
       [   2.2 ,  361.  ],
       [   2.17,  386.  ],
       [   3.07,  469.  ],
       [   2.25,  360.  ],
       [   3.28,  477.  ],
       [   1.89,  369.  ],
       [   2.06,  377.  ],
       [   2.51,  366.  ],
       [   3.63,  534.  ],
       [   2.3 ,  381.  ],
       [   2.43,  375.  ],
       [   2.53,  390.  ],
       [   2.54,  390.  ],
       [   2.41,  377.  ],
       [   2.45,  393.  ],
       [   2.64,  386.  ],
       [   2.02,  359.  ],
       [   2.09,  386.  ],
       [   2.24,  365.  ],
       [   2.14,  380.  ],
       [   2.51,  409.  ],
       [   2.34,  372.  ],
       [   2.28,  395.  ],
       [   2.31,  414.  ],
       [   1.93,  358.  ],
       [   2.03,  348.  ],
       [   2.87,  417.  ],
       [   2.44,  421.  ],
       [   1.79,  367.  ],
       [   1.97,  364.  ],
       [   2.51,  412.  ],
       [   2.35,  405.  ],
       [   2.15,  339.  ],
       [   2.28,  387.  ],
       [   2.21,  391.  ],
       [   2.26,  378.  ],
       [   2.15,  376.  ],
       [   2.12,  366.  ],
       [   3.23,  425.  ],
       [   2.27,  390.  ],
       [   2.98,  427.  ],
       [   2.45,  396.  ],
       [   2.45,  351.  ],
       [   3.32,  482.  ],
       [   2.55,  413.  ],
       [   1.83,  358.  ],
       [   2.93,  428.  ],
       [   2.16,  375.  ],
       [   2.22,  372.  ],
       [   2.2 ,  363.  ],
       [   2.27,  371.  ],
       [   2.51,  419.  ],
       [   2.49,  402.  ],
       [   1.78,  367.  ],
       [   2.35,  471.  ],
       [   2.58,  471.  ],
       [   2.59,  486.  ],
       [   2.29,  492.  ],
       [   2.05,  395.  ],
       [   2.57,  459.  ],
       [   2.36,  427.  ],
       [   2.53,  429.  ],
       [   2.75,  503.  ],
       [   2.65,  465.  ],
       [   2.02,  393.  ],
       [   2.5 ,  419.  ],
       [   3.16,  543.  ],
       [   2.72,  478.  ],
       [   2.21,  416.  ],
       [   3.54,  578.  ],
       [   3.27,  460.  ],
       [   2.25,  372.  ],
       [   2.38,  396.  ],
       [   2.36,  389.  ],
       [   2.82,  432.  ],
       [   2.46,  420.  ],
       [   3.7 ,  548.  ],
       [   2.35,  427.  ],
       [   2.38,  431.  ],
       [   2.58,  402.  ],
       [   2.63,  428.  ],
       [   2.52,  372.  ],
       [   2.65,  440.  ],
       [   2.58,  428.  ],
       [   3.05,  494.  ],
       [   2.45,  415.  ],
       [   2.93,  485.  ],
       [   2.82,  425.  ],
       [   2.45,  423.  ],
       [   2.45,  398.  ],
       [   3.98,  644.  ],
       [   2.7 ,  471.  ],
       [   3.03,  551.  ],
       [   2.92,  530.  ],
       [   2.38,  411.  ],
       [   3.08,  531.  ],
       [   2.8 ,  455.  ],
       [   2.45,  390.  ],
       [   2.91,  423.  ],
       [   2.13,  372.  ],
       [   2.05,  390.  ],
       [   2.38,  401.  ],
       [   2.32,  424.  ],
       [   3.21,  464.  ],
       [   2.87,  491.  ],
       [   2.26,  400.  ],
       [   2.57,  400.  ],
       [   2.89,  490.  ],
       [   3.54,  532.  ],
       [   3.89,  650.  ],
       [   2.59,  429.  ],
       [   2.43,  388.  ],
       [   2.54,  415.  ],
       [   2.34,  358.  ],
       [   2.6 ,  435.  ],
       [   2.55,  402.  ],
       [   2.61,  430.  ],
       [   2.3 ,  412.  ],
       [   2.15,  389.  ],
       [   2.48,  371.  ],
       [   2.41,  456.  ],
       [   2.47,  434.  ],
       [   3.38,  495.  ],
       [   2.45,  452.  ],
       [   2.22,  447.  ],
       [   3.03,  505.  ],
       [   3.58,  587.  ],
       [   2.66,  523.  ],
       [   2.39,  446.  ],
       [   2.2 ,  442.  ],
       [   2.33,  441.  ],
       [   2.82,  482.  ],
       [   2.49,  482.  ],
       [   1.88,  429.  ],
       [   3.89,  673.  ],
       [   2.02,  369.  ],
       [   2.42,  390.  ],
       [   2.07,  364.  ],
       [   1.92,  361.  ],
       [   2.86,  420.  ],
       [   1.91,  345.  ]
            		]
					}, {
            		name: 'Writing Mean',
            		color: 'rgba(255,255,0, .5)',
            		data: [
            		[   2.16,  385.  ],
       [   2.24,  387.  ],
       [   2.42,  402.  ],
       [   3.55,  568.  ],
       [   3.81,  630.  ],
       [   1.67,  385.  ],
       [   2.44,  407.  ],
       [   2.28,  366.  ],
       [   2.28,  391.  ],
       [   2.82,  423.  ],
       [   2.5 ,  415.  ],
       [   2.16,  377.  ],
       [   2.52,  411.  ],
       [   2.22,  412.  ],
       [   2.34,  391.  ],
       [   2.58,  386.  ],
       [   2.78,  448.  ],
       [   2.68,  472.  ],
       [   3.25,  499.  ],
       [   3.45,  528.  ],
       [   3.22,  567.  ],
       [   2.85,  466.  ],
       [   2.97,  435.  ],
       [   3.6 ,  567.  ],
       [   3.34,  523.  ],
       [   2.24,  359.  ],
       [   2.93,  440.  ],
       [   2.38,  406.  ],
       [   1.94,  354.  ],
       [   3.  ,  472.  ],
       [   2.29,  373.  ],
       [   2.52,  415.  ],
       [   2.18,  368.  ],
       [   4.03,  678.  ],
       [   2.79,  453.  ],
       [   1.95,  368.  ],
       [   3.18,  461.  ],
       [   2.47,  396.  ],
       [   2.48,  398.  ],
       [   2.82,  397.  ],
       [   2.32,  325.  ],
       [   2.38,  387.  ],
       [   3.14,  419.  ],
       [   2.2 ,  368.  ],
       [   2.43,  419.  ],
       [   2.74,  413.  ],
       [   2.4 ,  376.  ],
       [   2.2 ,  370.  ],
       [   2.24,  360.  ],
       [   2.83,  418.  ],
       [   2.26,  383.  ],
       [   2.21,  391.  ],
       [   2.15,  357.  ],
       [   2.19,  377.  ],
       [   2.08,  371.  ],
       [   3.51,  575.  ],
       [   3.64,  567.  ],
       [   2.34,  397.  ],
       [   3.26,  469.  ],
       [   2.28,  406.  ],
       [   2.2 ,  383.  ],
       [   3.1 ,  475.  ],
       [   2.09,  362.  ],
       [   2.53,  356.  ],
       [   3.05,  470.  ],
       [   2.06,  354.  ],
       [   2.13,  361.  ],
       [   2.53,  410.  ],
       [   2.46,  363.  ],
       [   2.43,  401.  ],
       [   3.14,  466.  ],
       [   2.66,  404.  ],
       [   2.03,  359.  ],
       [   3.76,  575.  ],
       [   2.17,  379.  ],
       [   2.26,  353.  ],
       [   2.22,  378.  ],
       [   2.28,  373.  ],
       [   2.89,  421.  ],
       [   2.29,  333.  ],
       [   2.44,  382.  ],
       [   1.66,  327.  ],
       [   2.12,  359.  ],
       [   2.11,  349.  ],
       [   2.74,  396.  ],
       [   2.86,  457.  ],
       [   2.08,  415.  ],
       [   2.14,  379.  ],
       [   2.05,  376.  ],
       [   2.56,  384.  ],
       [   2.34,  435.  ],
       [   1.95,  354.  ],
       [   1.7 ,  354.  ],
       [   2.4 ,  387.  ],
       [   2.66,  388.  ],
       [   2.23,  375.  ],
       [   1.85,  368.  ],
       [   1.94,  338.  ],
       [   2.12,  371.  ],
       [   2.13,  366.  ],
       [   2.22,  397.  ],
       [   2.06,  352.  ],
       [   2.04,  367.  ],
       [   2.06,  368.  ],
       [   1.68,  368.  ],
       [   1.91,  363.  ],
       [   1.93,  343.  ],
       [   2.29,  386.  ],
       [   1.67,  371.  ],
       [   2.44,  387.  ],
       [   2.58,  399.  ],
       [   2.95,  454.  ],
       [   2.2 ,  356.  ],
       [   2.07,  358.  ],
       [   1.83,  378.  ],
       [   2.14,  389.  ],
       [   1.97,  340.  ],
       [   1.88,  371.  ],
       [   1.96,  366.  ],
       [   2.78,  435.  ],
       [   1.75,  351.  ],
       [   2.48,  420.  ],
       [   2.34,  406.  ],
       [   2.12,  396.  ],
       [   1.95,  337.  ],
       [   2.55,  470.  ],
       [   2.26,  364.  ],
       [   2.58,  363.  ],
       [   2.39,  366.  ],
       [   2.06,  375.  ],
       [   1.85,  296.  ],
       [   2.43,  383.  ],
       [   2.34,  285.  ],
       [   2.69,  398.  ],
       [   2.04,  381.  ],
       [   2.03,  346.  ],
       [   2.09,  375.  ],
       [   2.13,  373.  ],
       [   1.96,  382.  ],
       [   2.4 ,  417.  ],
       [   2.75,  439.  ],
       [   3.91,  643.  ],
       [   1.86,  358.  ],
       [   2.69,  403.  ],
       [   3.18,  364.  ],
       [   2.38,  388.  ],
       [   1.94,  351.  ],
       [   1.92,  369.  ],
       [   3.79,  619.  ],
       [   2.58,  364.  ],
       [   2.26,  387.  ],
       [   2.49,  355.  ],
       [   2.33,  362.  ],
       [   2.35,  373.  ],
       [   2.81,  424.  ],
       [   2.11,  380.  ],
       [   2.17,  388.  ],
       [   1.62,  350.  ],
       [   2.31,  392.  ],
       [   1.71,  379.  ],
       [   2.19,  341.  ],
       [   1.93,  350.  ],
       [   2.  ,  373.  ],
       [   2.63,  424.  ],
       [   1.99,  338.  ],
       [   2.03,  389.  ],
       [   1.97,  358.  ],
       [   1.97,  335.  ],
       [   2.06,  344.  ],
       [   1.89,  387.  ],
       [   1.95,  397.  ],
       [   2.17,  401.  ],
       [   2.09,  291.  ],
       [   1.75,  330.  ],
       [   1.98,  383.  ],
       [   1.91,  366.  ],
       [   1.84,  356.  ],
       [   2.57,  369.  ],
       [   2.25,  371.  ],
       [   2.36,  377.  ],
       [   2.48,  409.  ],
       [   3.81,  581.  ],
       [   2.76,  412.  ],
       [   2.2 ,  360.  ],
       [   2.17,  408.  ],
       [   3.07,  441.  ],
       [   2.25,  373.  ],
       [   3.28,  445.  ],
       [   1.89,  349.  ],
       [   2.06,  359.  ],
       [   2.51,  365.  ],
       [   3.63,  527.  ],
       [   2.3 ,  366.  ],
       [   2.43,  373.  ],
       [   2.53,  384.  ],
       [   2.54,  354.  ],
       [   2.41,  387.  ],
       [   2.45,  367.  ],
       [   2.64,  369.  ],
       [   2.02,  340.  ],
       [   2.09,  394.  ],
       [   2.24,  374.  ],
       [   2.14,  375.  ],
       [   2.51,  393.  ],
       [   2.34,  370.  ],
       [   2.28,  368.  ],
       [   2.31,  382.  ],
       [   1.93,  360.  ],
       [   2.03,  348.  ],
       [   2.87,  425.  ],
       [   2.44,  424.  ],
       [   1.79,  366.  ],
       [   1.97,  364.  ],
       [   2.51,  404.  ],
       [   2.35,  399.  ],
       [   2.15,  325.  ],
       [   2.28,  381.  ],
       [   2.21,  343.  ],
       [   2.26,  372.  ],
       [   2.15,  365.  ],
       [   2.12,  381.  ],
       [   3.23,  415.  ],
       [   2.27,  381.  ],
       [   2.98,  420.  ],
       [   2.45,  388.  ],
       [   2.45,  381.  ],
       [   3.32,  452.  ],
       [   2.55,  411.  ],
       [   1.83,  348.  ],
       [   2.93,  414.  ],
       [   2.16,  363.  ],
       [   2.22,  380.  ],
       [   2.2 ,  356.  ],
       [   2.27,  376.  ],
       [   2.51,  403.  ],
       [   2.49,  378.  ],
       [   1.78,  355.  ],
       [   2.35,  407.  ],
       [   2.58,  440.  ],
       [   2.59,  409.  ],
       [   2.29,  377.  ],
       [   2.05,  355.  ],
       [   2.57,  418.  ],
       [   2.36,  381.  ],
       [   2.53,  385.  ],
       [   2.75,  468.  ],
       [   2.65,  396.  ],
       [   2.02,  361.  ],
       [   2.5 ,  418.  ],
       [   3.16,  491.  ],
       [   2.72,  445.  ],
       [   2.21,  380.  ],
       [   3.54,  559.  ],
       [   3.27,  446.  ],
       [   2.25,  375.  ],
       [   2.38,  414.  ],
       [   2.36,  389.  ],
       [   2.82,  417.  ],
       [   2.46,  407.  ],
       [   3.7 ,  541.  ],
       [   2.35,  372.  ],
       [   2.38,  391.  ],
       [   2.58,  373.  ],
       [   2.63,  359.  ],
       [   2.52,  363.  ],
       [   2.65,  421.  ],
       [   2.58,  401.  ],
       [   3.05,  427.  ],
       [   2.45,  311.  ],
       [   2.93,  442.  ],
       [   2.82,  421.  ],
       [   2.45,  389.  ],
       [   2.45,  366.  ],
       [   3.98,  642.  ],
       [   2.7 ,  462.  ],
       [   3.03,  492.  ],
       [   2.92,  454.  ],
       [   2.38,  398.  ],
       [   3.08,  467.  ],
       [   2.8 ,  433.  ],
       [   2.45,  387.  ],
       [   2.91,  420.  ],
       [   2.13,  362.  ],
       [   2.05,  380.  ],
       [   2.38,  380.  ],
       [   2.32,  404.  ],
       [   3.21,  424.  ],
       [   2.87,  462.  ],
       [   2.26,  391.  ],
       [   2.57,  385.  ],
       [   2.89,  439.  ],
       [   3.54,  515.  ],
       [   3.89,  612.  ],
       [   2.59,  412.  ],
       [   2.43,  381.  ],
       [   2.54,  394.  ],
       [   2.34,  388.  ],
       [   2.6 ,  418.  ],
       [   2.55,  388.  ],
       [   2.61,  405.  ],
       [   2.3 ,  391.  ],
       [   2.15,  380.  ],
       [   2.48,  370.  ],
       [   2.41,  408.  ],
       [   2.47,  408.  ],
       [   3.38,  499.  ],
       [   2.45,  424.  ],
       [   2.22,  346.  ],
       [   3.03,  515.  ],
       [   3.58,  570.  ],
       [   2.66,  502.  ],
       [   2.39,  434.  ],
       [   2.2 ,  425.  ],
       [   2.33,  430.  ],
       [   2.82,  467.  ],
       [   2.49,  457.  ],
       [   1.88,  386.  ],
       [   3.89,  617.  ],
       [   2.02,  374.  ],
       [   2.42,  376.  ],
       [   2.07,  358.  ],
       [   1.92,  353.  ],
       [   2.86,  395.  ],
       [   1.91,  351.  ]]
        		}]
    		});
		});
		
	}
	});
});