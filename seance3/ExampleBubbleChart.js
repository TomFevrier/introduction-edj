export default class BubbleChart {

	constructor(options) {
		this.data = options.data;
		this.element = options.element;
		this.draw();
	}

	draw() {

		this.height = 600;
		this.width = 1000;
		this.margin = 40;

		this.createSVG();
		this.createScales();
		this.createAxes();
		this.createCircles();
		this.createTooltip();

	}

	createSVG() {
		this.svg = d3.select(this.element)
			.append('svg')
				.attr('width', this.width)
				.attr('height', this.height);
	}

	createScales() {

		this.xScale = d3.scaleLog()
			.domain(d3.extent(this.data, function(d) {
				return +d.gdp;
			}))
			.rangeRound([this.margin, this.width - this.margin]);

		this.yScale = d3.scaleLinear()
			.domain(d3.extent(this.data, function(d) {
				return +d.life_expectancy;
			}))
			.rangeRound([this.height - this.margin, this.margin]);

		this.radiusScale = d3.scaleSqrt()
			.domain(d3.extent(this.data, function(d) {
				return +d.population;
			}))
			.rangeRound([3, 50]);

		this.colorScale = d3.scaleOrdinal()
			.domain(['North America', 'South America', 'Asia', 'Europe', 'Africa', 'Oceania'])
			.range(d3.schemeCategory10);

	}

	createAxes() {

		this.xAxis = d3.axisBottom(this.xScale)
			.ticks(5, function(d) {
				return d3.format('~s')(d / 1e6);
			});

		this.svg.append('g')
			.attr('class', 'xAxis')
			.attr('transform', `translate(0, ${this.height - this.margin})`)
			.call(this.xAxis);

		this.yAxis = d3.axisLeft(this.yScale)
			.ticks(20, 'r');

		this.svg.append('g')
			.attr('class', 'yAxis')
			.attr('transform', `translate(${this.margin}, 0)`)
			.call(this.yAxis);

	}

	createCircles() {

		var that = this;

		this.circles = this.svg.append('g');

		this.circles.selectAll('circle')
			.data(this.data).enter()
			.append('circle')
				.on('mouseover', function(d) {
					that.tooltip.html(`<p><b>${d.country}</b></p>`)
						.style('left', function() {
							return `${d3.event.pageX}px`;
						})
						.style('top', function() {
							return `${d3.event.pageY - 28}px`;
						})
					that.tooltip
						.transition()
						.duration(200)
						.style('opacity', .9)
				})
				.attr('cx', function(d) {
					return that.xScale(+d.gdp);
				})
				.attr('cy', function(d) {
					return that.yScale(+d.life_expectancy);
				})
				.attr('r', function(d) {
					return 0;
				})
				.attr('fill', function(d) {
					return that.colorScale(d.continent);
				})
				.transition()
				.duration(2000)
					.attr('r', function(d) {
						return that.radiusScale(+d.population);
					})
				.style('cursor', 'pointer');


	}

	createTooltip() {
		this.tooltip = d3.select(this.element).append('div')
		    .attr('class', 'tooltip')
		    .style('opacity', 0);

	}

}
