$(document).ready(function() {
	
	$("#submit").click(function(){
		var dist    = $("#dist").val();
		var ident   = $("#id").val();
		/*
		if (ident < 100) {
			var ident = "0" + ident
		}
		*/
		
		var somma   = dist + ident;
		
		var options = {
		    chart: {
		        renderTo: 'scuola-1',
		        defaultSeriesType: 'bar'
		    },
		    title: {
		        text: 'Demographic statistics by school districts'
		    },
		    xAxis: {
		        categories: []
		    },
		    yAxis: {
		        title: {
		            text: 'Percent'
		        }
		    },
		    legend: {
		        reversed: true
		    },
		    plotOptions: {
		        series: {
		            stacking: 'percent'
		        }
		    },
		    series: []
		}
		
		$.get('breakdowns.csv', function(data) {
			// Split the lines
		    var lines = data.split('\n');
		    // Iterate over the lines and add categories or series
		    $.each(lines, function(lineNo, line) {
		        var items = line.split(',');
		        
		        if (items[0] == somma) {
			        
			        
			        
			        // header line containes categories
			        if (lineNo == 0) {
			            $.each(items, function(itemNo, item) {
			                if (itemNo > 0) options.xAxis.categories.push(item);
			            });
			        }
			
			        // the rest of the lines contain data with their name in the first
			        // position
			        else {
			            var series = {
			                data: []
			            };
			            $.each(items, function(itemNo, item) {
			                if (itemNo == 0) {
			                    series.name = item;
			                } else {
			                    series.data.push(parseFloat(item));
			                }
			            });
			
			            options.series.push(series);
			        }
			        
			        
			        
		        }
		        
		        
		    });
		    // Create the chart
		    var chart = new Highcharts.Chart(options);
		});
	});
});