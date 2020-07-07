'use strict';
$(document).ready(function () {
    var ctx = document.getElementById('update-chart-1').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: valincome('#fff', [25, 30, 20, 15, 20], '#fff'),
        options: valincomebuildoption(),
    });
    var ctx = document.getElementById('update-chart-2').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: valincome('#fff', [10, 30, 20, 15, 30], '#fff'),
        options: valincomebuildoption(),
    });
    var ctx = document.getElementById('update-chart-3').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: valincome('#fff', [25, 10, 20, 15, 20], '#fff'),
        options: valincomebuildoption(),
    });
    var ctx = document.getElementById('update-chart-4').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: valincome('#fff', [25, 30, 20, 15, 10], '#fff'),
        options: valincomebuildoption(),
    });

    function valincome(a, b, f) {
        if (f == null) {
            f = "rgba(0,0,0,0)";
        }
        return {
            labels: ["1", "2", "3", "4", "5"],
            datasets: [{
                label: "",
                borderColor: a,
                borderWidth: 0,
                hitRadius: 30,
                pointRadius: 0,
                pointHoverRadius: 4,
                pointBorderWidth: 2,
                pointHoverBorderWidth: 12,
                pointBackgroundColor: Chart.helpers.color("#000000").alpha(0).rgbString(),
                pointBorderColor: a,
                pointHoverBackgroundColor: a,
                pointHoverBorderColor: Chart.helpers.color("#000000").alpha(.1).rgbString(),
                fill: true,
                backgroundColor: Chart.helpers.color(f).alpha(1).rgbString(),
                data: b,
            }]
        };
    }

    function valincomebuildoption() {
        return {
            maintainAspectRatio: false,
            title: {
                display: false,
            },
            tooltips: {
                enabled: false,
            },
            legend: {
                display: false
            },
            hover: {
                mode: 'index'
            },
            scales: {
                xAxes: [{
                    display: false,
                    gridLines: false,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: false,
                    gridLines: false,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    },
                    ticks: {
                        min: 1,
                    }
                }]
            },
            elements: {
                point: {
                    radius: 4,
                    borderWidth: 12
                }
            },
            layout: {
                padding: {
                    left: 10,
                    right: 0,
                    top: 15,
                    bottom: 0
                }
            }
        };
    }

    $(function () {
        var data = []
        // data = [{
        //     "year": "472",
        //     "value": "Jan 22"
        // }, {
        //     "year": "1969851",
        //     "value": "Jan 22"
        // }, {
        //     "year": "234",
        //     "value": "Jan 22"
        // }]


        $.ajax({
            type: "get",
            url: "https://covid19-update-api.herokuapp.com/api/v1/cases/graphs/dailyCases",
            dataType: "json",
            success: function (response) {
                for (let i = 1; i < response.graph.data.length; i++) {
                    data.push({"value" : response.graph.data[i], "year" : response.graph.categories[i]})
                }
                        var amchart = AmCharts.makeChart("daily-cases", {
                            "type": "serial",
                            "theme": "light",
                            "marginTop": 0,
                            "marginRight": 0,
                            "dataProvider": data,
                            "valueAxes": [{
                                "axisAlpha": 0,
                                "gridAlpha": 0,
                                "position": "left"
                            }],
                            "graphs": [{
                                "id": "g1",
                                "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
                                "bullet": "round",
                                "bulletSize": 8,
                                "lineColor": "#fe5d70",
                                "lineThickness": 2,
                                "negativeLineColor": "#fe9365",
                                "type": "smoothedLine",
                                "valueField": "value"
                            }],
                            "chartScrollbar": {
                                "graph": "g1",
                                "gridAlpha": 0,
                                "color": "#888888",
                                "scrollbarHeight": 55,
                                "backgroundAlpha": 0,
                                "selectedBackgroundAlpha": 0.1,
                                "selectedBackgroundColor": "#888888",
                                "graphFillAlpha": 0,
                                "autoGridCount": true,
                                "selectedGraphFillAlpha": 0,
                                "graphLineAlpha": 0.2,
                                "graphLineColor": "#c2c2c2",
                                "selectedGraphLineColor": "#888888",
                                "selectedGraphLineAlpha": 1

                            },
                            "chartCursor": {
                                "categoryBalloonDateFormat": "MMM dd",
                                "cursorAlpha": 0,
                                "valueLineEnabled": true,
                                "valueLineBalloonEnabled": true,
                                "valueLineAlpha": 0.5,
                                "fullWidth": true
                            },
                            "dataDateFormat": "MMM dd",
                            "categoryField": "year",
                            "categoryAxis": {
                                "minPeriod": "MMM dd",
                                "parseDates": false,
                                "gridAlpha": 0,
                                "minorGridAlpha": 0,
                                "minorGridEnabled": true
                            },
                            "export": {
                                "enabled": true
                            }
                        });
                        
                        amchart.addListener("rendered", zoomChart);
                        if (amchart.zoomChart) {
                            amchart.zoomChart();
                        }

                        function zoomChart() {
                            amchart.zoomToIndexes(Math.round(amchart.dataProvider.length * 0.4), Math.round(amchart.dataProvider.length * 0.55));
                        }
            }
        });

    });

    var ctx = document.getElementById('app-sale30').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: amuntchart('#11c15b', [1, 15, 30, 15, 25, 35, 45, 20, 25, 30], 'transparent'),
        options: buildchartoption(),
    });
    var ctx = document.getElementById('app-sale104').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: amuntchart('#448aff', [45, 30, 25, 35, 20, 35, 45, 20, 25, 1], 'transparent'),
        options: buildchartoption(),
    });
    var ctx = document.getElementById('app-sale3').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: amuntchart('#ff5252', [1, 45, 24, 40, 20, 35, 10, 20, 45, 30], 'transparent'),
        options: buildchartoption(),
    });
    var ctx = document.getElementById('app-sale4').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: amuntchart('#536dfe', [1, 15, 45, 15, 25, 35, 45, 20, 25, 30], 'transparent'),
        options: buildchartoption(),
    });

    function amuntchart(a, b, f) {
        if (f == null) {
            f = "rgba(0,0,0,0)";
        }
        return {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October"],
            datasets: [{
                label: "",
                borderColor: a,
                borderWidth: 2,
                hitRadius: 30,
                pointHoverRadius: 4,
                pointBorderWidth: 50,
                pointHoverBorderWidth: 12,
                pointBackgroundColor: Chart.helpers.color("#000000").alpha(0).rgbString(),
                pointBorderColor: Chart.helpers.color("#000000").alpha(0).rgbString(),
                pointHoverBackgroundColor: a,
                pointHoverBorderColor: Chart.helpers.color("#000000").alpha(.1).rgbString(),
                fill: true,
                backgroundColor: f,
                data: b,
            }]
        };
    }

    function buildchartoption() {
        return {
            maintainAspectRatio: false,
            title: {
                display: !1
            },
            tooltips: {
                enabled: false,
            },
            legend: {
                display: !1,
                labels: {
                    usePointStyle: !1
                }
            },
            responsive: !0,
            maintainAspectRatio: !0,
            hover: {
                mode: "index"
            },
            scales: {
                xAxes: [{
                    display: !1,
                    gridLines: !1,
                    scaleLabel: {
                        display: !0,
                        labelString: "Month"
                    }
                }],
                yAxes: [{
                    display: !1,
                    gridLines: !1,
                    scaleLabel: {
                        display: !0,
                        labelString: "Value"
                    },
                    ticks: {
                        beginAtZero: !0
                    }
                }]
            },
            elements: {
                point: {
                    radius: 4,
                    borderWidth: 12
                }
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 5,
                    bottom: 0
                }
            }
        };
    }
});