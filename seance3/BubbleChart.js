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

	}

	createSVG() {
		this.svg = d3.select(this.element)
			.append('svg')
				.attr('width', this.width)
				.attr('height', this.height);
	}

	createScales() {

		console.log(this.data);

		/*
		Il existe de nombreux types d'échelles d3 : linéaire, logarithmique,
		racine carrée, etc. Voir la doc : https://github.com/d3/d3-scale
		Une échelle est définie par :
		- son "domain" : les valeurs minimale et maximale de l'axe en question
		- son "range" : les valeurs correspondantes en pixels sur l'écran
		*/

		/*
		Dans le cas où l'on souhaite que l'axe soit ajusté aux valeurs de nos
		données, on peut utiliser la méthode d3.extent() qui renvoie
		automatiquement les valeurs minimale et maximale de nos données.
		d3.extent() prend deux paramètres :
		- le tableau de données
		- une fonction qui indique de quelle propriété des objets on souhaite
		connaître l'intervalle
		*/

		this.xScale = d3.scaleLog()
			.domain(d3.extent(this.data, function(e) {
				// Le "+" convertit la chaîne de caractères en nombre
				return +e.gdp;
			}))
			.rangeRound([this.margin, this.width - this.margin]);

		this.yScale = d3.scaleLinear()
			.domain(d3.extent(this.data, function(e) {
				return +e.life_expectancy;
			}))
			.rangeRound([this.height - this.margin, this.margin]);
			/*
			Attention, l'axe y va DE HAUT EN BAS : la valeur minimale est en bas
			à gauche, soit à la position verticale "hauteur - marge", et la
			valeur maximale en haut à gauche, à la position verticale "marge"
			*/

		this.radiusScale = d3.scaleSqrt()
			.domain(d3.extent(this.data, function(e) {
				return +e.population;
			}))
			.rangeRound([3, 50]);

		/*
		Une échelle ordinale est une échelle de valeurs discrètes (et non
		continues) : son "domain" est un tableau des valeurs possibles et son
		"range" est un tableau de couleurs (ici, une des palettes proposées par
		d3)
		*/
		this.colorScale = d3.scaleOrdinal()
			.domain(["Europe", "North America", "South America", "Asia", "Oceania", "Africa"])
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

		/*
		Schéma de sélection d3 : on commence par sélectionner les cercles que
		nous allons créer, même s'ils n'existent pas encore (logique/20)
		*/
		this.circles.selectAll('circle')
		// On lie les données et on entre dans la sélection
			.data(this.data).enter()
			.append('circle') // Ajout de chaque cercle
				/*
				La méthode attr() permet de définir l'attribut d'un élément SVG.
				La valeur de l'attribut peut être une valeur fixe ou bien une
				"fonction accesseur" si cette valeur est liée aux données.
				L'accesseur renvoie la valeur de la propriété voulue, passée
				dans l'échelle correspondante.
				*/
				.attr('cx', function(d) {
					return that.xScale(+d.gdp);
				})
				.attr('cy', function(d) {
					return that.yScale(+d.life_expectancy);
				})
				.attr('r', 0)
				.attr('fill', function(d) {
					return that.colorScale(d.continent);
				})
				/*
				Les méthodes transition() et duration() permettent d'animer les
				attributs des éléments SVG. Ici, le rayon des cercles est
				d'abord égal à 0, puis on l'anime progressivement vers sa valeur
				finale en 2 secondes (2000 millisecondes).
				*/
				.transition()
				.duration(2000)
					.attr('r', function(d) {
						return that.radiusScale(+d.population);
					})
	}

}
