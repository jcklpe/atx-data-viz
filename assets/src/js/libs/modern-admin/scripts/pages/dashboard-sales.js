/*=========================================================================================
    File Name: dashboard-analytics.js
    Description: intialize advance cards
    ----------------------------------------------------------------------------------------
    Item Name: Modern Admin - Clean Bootstrap 4 Dashboard HTML Template
   Version: 3.0
    Author: Pixinvent
    Author URL: hhttp://www.themeforest.net/user/pixinvent
    ==========================================================================================*/
$(window).on('load', function ()
{

    // Revenue - CharJS Line
    Chart.defaults.derivedLine = Chart.defaults.line;
    var draw = Chart.controllers.line.prototype.draw;
    var custom = Chart.controllers.line.extend({
        draw: function ()
        {
            draw.apply(this, arguments);
            var ctx = this.chart.chart.ctx;
            var _stroke = ctx.stroke;
            ctx.stroke = function ()
            {
                ctx.save();
                ctx.shadowColor = '#ffb6c0';
                ctx.shadowBlur = 30;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 20;
                _stroke.apply(this, arguments)
                ctx.restore();
            }
        }
    });

    // first chart
    Chart.controllers.derivedLine = custom;
    var ctx = document.querySelector("#weeklyRidesChart").getContext('2d');
    var weeklyRidesChart = new Chart(ctx, {
        type: 'derivedLine',
        data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [
                {
                    label: "bicycles",
                    data: [0, 0, 0, 0, 0, 0, 0],
                    borderWidth: 4,
                    borderColor: '#FF4961',
                    pointBackgroundColor: "#FFF",
                    pointBorderColor: "#FF4961",
                    pointHoverBackgroundColor: "#FFF",
                    pointHoverBorderColor: "#FF4961",
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    fill: false,
                },
                {
                    label: "scooter",
                    data: [0, 0, 0, 5, 0, 5, 0],
                    borderWidth: 4,
                    borderDash: [8, 4],
                    borderColor: '#c3c3c3',
                    pointBackgroundColor: "#FFF",
                    pointBorderColor: "#c3c3c3",
                    pointHoverBackgroundColor: "#FFF",
                    pointHoverBorderColor: "#c3c3c3",
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    fill: false,
                }]
        },
        options: {
            responsive: true,
            tooltips: {
                displayColors: false,
                callbacks: {
                    label: function (e, d)
                    {
                        // return '${e.xLabel} : ${e.yLabel}'
                    },
                    title: function ()
                    {
                        return;
                    }
                }
            },
            legend: {
                display: false,

            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                    },
                }],
                yAxes: [{
                    ticks: {
                        padding: 15,
                        stepSize: 50,
                        max: 1100,
                        min: 0,
                    },
                    gridLines: {
                        display: true,
                        drawBorder: false,
                        lineWidth: 1,
                        zeroLineColor: '#e5e5e5',
                    }
                }]
            }
        }
    });



    //- THIS IS THE THING
    // Hit Rate Chart - CharJS Doughnut
    Chart.defaults.hitRateDoughnut = Chart.defaults.doughnut;
    var draw = Chart.controllers.doughnut.prototype.draw;
    var customDoughnut = Chart.controllers.doughnut.extend({
        draw: function ()
        {
            draw.apply(this, arguments);
            var ctx = this.chart.chart.ctx;
            var _fill = ctx.fill;
            var width = this.chart.width,
                height = this.chart.height;

            var fontSize = (height / 114).toFixed(2);
            this.chart.ctx.font = fontSize + "em Verdana";
            this.chart.ctx.textBaseline = "middle";



            ctx.fill = function ()
            {
                ctx.save();
                ctx.shadowColor = '#bbbbbb';
                ctx.shadowBlur = 30;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 12;
                _fill.apply(this, arguments)
                ctx.restore();
            }
        }
    });



    Chart.controllers.hitRateDoughnut = customDoughnut;
    var ctx = document.getElementById("hit-rate-doughnut");
    //-  this is the one I'm trying to target
    var myDoughnutChart = new Chart(ctx, {
        type: 'hitRateDoughnut',
        data: {
            labels: ["Bicycle", "Scooters"],
            datasets: [{
                label: "Favourite",
                backgroundColor: ["#FF4961", "#c3c3c3"],
                data: [0, 0],
            }]
        },
        options: {
            responsive: true,
            title: {
                display: false
            },
            legend: {
                display: false
            },
            layout: {
                padding: {
                    left: 16,
                    right: 16,
                    top: 16,
                    bottom: 16
                }
            },
            cutoutPercentage: 92,
            animation: {
                animateScale: false,
                duration: 2500
            }
        }
    });







    //- ADD DATA TO CHARTS!

    async function addData()
    {
        //- BIKE RIDES
        //assign out promises return values to an array
        const [bm, bt, bw, bth, bfr, bsa, bsu] = await Promise.all([mondayBikeRideCount, tuesdayBikeRideCount, wednesdayBikeRideCount, thursdayBikeRideCount, fridayBikeRideCount, saturdayBikeRideCount, sundayBikeRideCount]);

        //- scoot scoot scoot
        const [sm, st, sw, sth, sfr, ssa, ssu] = await Promise.all([mondayScooterRideCount, tuesdayScooterRideCount, wednesdayScooterRideCount, thursdayScooterRideCount, fridayScooterRideCount, saturdayScooterRideCount, sundayScooterRideCount]);

        // replace the values in the new promise array into the chart array
        weeklyRidesChart.data.datasets[0].data[0] = `${bm}`;
        weeklyRidesChart.data.datasets[0].data[1] = `${bt}`;
        weeklyRidesChart.data.datasets[0].data[2] = `${bw}`;
        weeklyRidesChart.data.datasets[0].data[3] = `${bth}`;
        weeklyRidesChart.data.datasets[0].data[4] = `${bfr}`;
        weeklyRidesChart.data.datasets[0].data[5] = `${bsa}`;
        weeklyRidesChart.data.datasets[0].data[6] = `${bsu}`;

        weeklyRidesChart.data.datasets[1].data[0] = `${sm}`;
        weeklyRidesChart.data.datasets[1].data[1] = `${st}`;
        weeklyRidesChart.data.datasets[1].data[2] = `${sw}`;
        weeklyRidesChart.data.datasets[1].data[3] = `${sth}`;
        weeklyRidesChart.data.datasets[1].data[4] = `${sfr}`;
        weeklyRidesChart.data.datasets[1].data[5] = `${ssa}`;
        weeklyRidesChart.data.datasets[1].data[6] = `${ssu}`;





        //assign promise array to a variable
        var promiseBikeArray = weeklyRidesChart.data.datasets[0].data;

        var promiseScooterArray = weeklyRidesChart.data.datasets[1].data;

        // use array map to convert strings to ints
        promiseBikeArray = promiseBikeArray.map((x) => parseInt(x));

        promiseScooterArray = promiseScooterArray.map((x) => parseInt(x));

        //create a function to add array numbers together.
        function getSum(total, num)
        {
            return total + num;
        }

        //create a function to calculate the percentage
        function per(num, amount)
        {
            let total = num + amount;
            return percentage = Math.trunc(num / total * 100);
        }

        // sum up all the parts of the array
        const weekBikeTotal = promiseBikeArray.reduce(getSum);
        const weekScooterTotal = promiseScooterArray.reduce(getSum);

        // calculate the percentages of rides taken with each kind of mode of transportation
        const bikePercentage = per(weekBikeTotal, weekScooterTotal);
        const scooterPercentage = per(weekScooterTotal, weekBikeTotal);


        //- inject numbers into chart data
        myDoughnutChart.data.datasets[0].data[0] = `${bikePercentage}`;
        myDoughnutChart.data.datasets[0].data[1] = `${scooterPercentage}`;

        //add title
        let mostPopular = Math.max(`${bikePercentage}`, `${scooterPercentage}`);
        // console.group(customDoughnut.draw.text);








        //- insert weekly total into the title
        document.getElementById("bike-total").innerHTML = `${weekBikeTotal} ` + " Rides";
        document.getElementById("scooter-total").innerHTML = `${weekScooterTotal} ` + " Rides";
        weeklyRidesChart.update();
        myDoughnutChart.update();

    }

    addData();

    //- END of ADD DATA



});
//- END OF WINDOW LOAD WRAPPER FUNCTION