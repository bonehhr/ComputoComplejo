var rows = localStorage.getItem("rows");
var cols = localStorage.getItem("cols");
var gcolor = localStorage.getItem("grafColor");
var pastGeneration = -1;
var canvas = document.getElementById('Graph');
var data = {
	labels: [],
	datasets: [{
		label: "Pixeles",
		backgroundColor: "#802dff",
		borderColor: "#ff0080",
		pointBackgroundColor: "#ffff80",
		pointRadius: 3,
		data: [],
	}],
};
var labels = {
	scales: {
		xAxes: [{
			scaleLabel: {
				display: true,
				labelString: 'Generación'
			}
		}],
		yAxes: [{
			scaleLabel: {
				display: true,
				labelString: 'Vivos'
			}
		}]
	}
};
var cellsChart = Chart.Line(canvas, {
	data: data,
	options: labels
});
setInterval(function () {
	if (localStorage.getItem("gameOn") == "true") {
		livingCells = localStorage.getItem("livingCells")
		gen = localStorage.getItem("generation")
		
		if(gen != pastGeneration){
			len = cellsChart.data.datasets[0].data.length;
			cellsChart.data.datasets[0].data[len] = (parseInt(livingCells) /(parseInt(rows) * parseInt(cols)))*100;
		
			cellsChart.data.labels[len] = gen;
			cellsChart.update();
			pastGeneration = gen;
		}
	}
}, 1);