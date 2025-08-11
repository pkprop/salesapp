var data = {
    labels: [
        "Brand Monitoring",
        "Social Media Management",
        "Setup & Custom Profile Design",
        "Social Media Contests"
    ],
    datasets: [
        {
            data: [48, 23, 17, 22],
            backgroundColor: [
                "#942173",
                "#3cb878",
                "#fcb03b",
                "#f15b26"
            ]
        }]
};
var ctx = document.getElementById("myChart");
$(document).ready(function () {

    $('#myChart').waypoint(function () {
        var myDoughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                legend: {
                    display: false
                }
            },
            animation: {
                animateScale: true
            }
        });
        this.destroy();
    }, {offset: '75%'});
});
