const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Accurate', 'Not Accurate'],
        datasets: [{
            label: 'Differential Privacy',
            data: [0.1, (1 - 0.1)],
            backgroundColor: [
                'rgba(88, 68, 193, 1)',
                'rgba(59, 44, 134, 1)',
            ],
            borderColor: [
                'rgba(0, 0, 0, 1);',
                'rgba(0, 0, 0, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        }
    },
});
sigma = 0.5;
$("#increase-btn").on("click", function (e) {
    e.preventDefault();
    sigma += 0.05;
    console.log(sigma);
    console.log('increase');
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/dp",
        data: { sigma: sigma },
        success: function (result) {
            console.log(result);
            myChart.data.labels.pop();
            myChart.data.labels.pop();
            myChart.data.datasets[0].data.pop();
            myChart.data.datasets[0].data.pop();

            myChart.data.labels.push('Accurate');
            myChart.data.datasets[0].data.push(result.percent);
            myChart.data.labels.push('Not Accurate');
            myChart.data.datasets[0].data.push(1 - result.percent);
            myChart.update();
        },
    });
});

$("#decrease-btn").on("click", function (e) {
    e.preventDefault();
    sigma -= 0.05;
    console.log(sigma);
    console.log('decrease');
    $.ajax({
        type: "POST",
        url: "http://localhost:5000/dp",
        data: { sigma: sigma },
        success: function (result) {
            console.log(result);
            myChart.data.labels.pop();
            myChart.data.labels.pop();
            myChart.data.datasets[0].data.pop();
            myChart.data.datasets[0].data.pop();

            myChart.data.labels.push('Accurate');
            myChart.data.datasets[0].data.push(result.percent);
            myChart.data.labels.push('Not Accurate');
            myChart.data.datasets[0].data.push(1 - result.percent);
            myChart.update();
        },
    });
});
