export default class BarChart {

	constructor(options) {
		this.data = options.data
		this.element = options.element;
		this.draw();
	}

	draw() {

		// Nesting goes here

		this.height = 600;
		this.width = 1000;
		this.margin = 40;

		this.createSVG();
		this.createScales();
		this.createAxes();
		this.createBars();

	}

	createSVG() {
		this.svg = d3.select(this.element)
			.append('svg')
				.attr('width', this.width)
				.attr('height', this.height);
	}

	createScales() {

		this.xScale = null;

		this.yScale = null;

	}

	createAxes() {

		this.xAxis = d3.axisBottom(this.xScale)
			.tickSize(0);

		this.svg.append('g')
			.attr('class', 'xAxis')
			.attr('transform', `translate(0, ${this.height - this.margin})`)
			.call(this.xAxis);

		this.yAxis = d3.axisLeft(this.yScale)
			.ticks(10, 'r');

		this.svg.append('g')
			.attr('class', 'yAxis')
			.attr('transform', `translate(${this.margin}, 0)`)
			.call(this.yAxis);

	}

	createBars() {

		var that = this;

		this.bars = this.svg.append('g');

		// Code goes here
	
	}

}
