import ExampleBubbleChart from './ExampleBubbleChart.js';
import BubbleChart from './BubbleChart.js';
import BarChart from './BarChart.js';

d3.csv('banque_mondiale.csv')
	.then(function(data) {
		var exampleBubbleChart = new ExampleBubbleChart({
			data: data,
			element: '#exampleBubbleChart'
		});

		var bubbleChart = new BubbleChart({
			data: data,
			element: '#bubbleChart'
		});
	});

d3.tsv('top_films_2018.tsv')
	.then(function(data) {
		var barChart = new BarChart({
			data: data,
			element: '#barChart'
		});
	});
