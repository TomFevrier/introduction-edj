export default class BarChart {

	constructor(options) {
		this.data = options.data
		this.element = options.element;
		this.draw();
	}

	draw() {

		/*
		La méthode d3.nest() permet de grouper les données en fonction d'une clé.
		Elle se décomposent en deux méthodes :
		- key() prend en paramètre une fonction accesseur qui renvoie la
		propriété qui sert de clé
		- entries() prend en paramètre les données
		A cela peut se rajouter la méthode rollup(), qui précise quelle valeur
		associer à chaque clé
		*/
		this.nest = d3.nest()
			.key(function(d) {
				return d.genre;
			})
			.rollup(function(v) {
				/*
				Au lieu de renvoyer le tableau contenant tous les films d'un
				genre donné, on ne renvoie que le nombre de films
				*/
				return v.length;
			})
			.entries(this.data);

		// On trie le tableau par ordre décroissant du nombre de films
		this.nest = this.nest.sort(function(a, b) {
			return b.value - a.value;
		});

		console.log(this.nest);

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

		// Voir la doc : https://github.com/d3/d3-scale
		this.xScale = d3.scaleBand()
			// La méthode map() renvoie ici la liste des clés de this.nest
			.domain(this.nest.map(function(e) {
				return e.key;
			}))
			.rangeRound([this.margin, this.width - this.margin])
			/*
			paddingInner() et paddingOuter() configurent l'espacement entre les
			barres et autour des barres respectivement
			*/
			.paddingInner(0.1)
			.paddingOuter(0.1);

		this.yScale = d3.scaleLinear()
			.domain([0, 8])
			.rangeRound([this.height - this.margin, this.margin]);

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

		this.bars.selectAll('rect')
			.data(this.nest).enter()
			.append('rect')
				.attr('x', function(d) {
					return that.xScale(d.key);
				})
				.attr('y', this.yScale(0))
				.attr('width', this.xScale.bandwidth())
				.attr('height', 0)
				.attr('fill', 'purple')
				.transition()
				.duration(2000)
					/*
					Pour animer les barres, il faut animer à la fois la hauteur
					des rectangles (de 0 jusqu'à la hauteur voulue) mais aussi
					sa position y (du bas de l'échelle jusqu'à la valeur voulue)
					*/
					.attr('y', function(d) {
						return that.yScale(d.value);
					})
					.attr('height', function(d) {
						return that.yScale(0) - that.yScale(d.value);
					})

	}

}
