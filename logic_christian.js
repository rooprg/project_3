//import Chart from 'chart.js/auto'
let year=[]
for (let i=2000; i<2025; i++) {
    year.push(i);
}

function getChartData(url){
    $.ajax({
        url: url,
        async: false,
        dataType: "json",
        success: function(result) {
            let data1=result.map(x=>x.deathsTotal)
            return(data1);
        }
    });
}

function remap(data){

}
// $.when(
//     $.ajax({
//         url: url,
//         async: false,
//         dataType: "json",
//         success: function(result) {
//             let data1=result.map(x=>x.deathsTotal)
//             return(data1);
//         }
//     }),
//     $.ajax('http://example2.com')
// )
// .then(function(response1, response2) {
//     console.log(response1);
//     console.log(response2);
// })
// .fail(function(err) {
//     console.log('Something went wrong', err);
// });

// function getChartData(url) {
//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url: url,
//             dataType: "json",
//             success: function(result) {
//                 const data1 = result.map(x => x.deathsTotal);
//                 resolve(data1);
//             },
//             error: function(err) {
//                 reject(err);
//             }
//         });
//     });
// }


function renderChart(data1, data2, data3, labels){
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: 'Earthquakes',
                barThickness:2,
                backgroundColor: 'red',
                data: data1[0].map(x=>x.deathsTotal)
            },
            {
                label: 'Volcano',
                barThickness:2,
                backgroundColor: 'yellow',
                data: data2[0].map(x=>x.deathsTotal)
            },
            {
                label: 'Tsunami',
                backgroundColor: 'blue',
                barThickness:2,
                data: data3[0].map(x=>x.deathsTotal)
            }]
        },
        options: {
            scales:{
                x:{
                    stacked: true
                },
                y:{
                    stacked: true
                }
            }
        }
    });
}
//console.log(getChartData("Datasets/cleaned_earthquake.json"))
$.when($.ajax("Datasets/cleaned_earthquake.json"), $.ajax("Datasets/cleaned_volcano.json"), $.ajax("Datasets/cleaned_tsunami.json")).done(function(response1, response2, response3){
    renderChart(response1, response2, response3, year)
    console.log(response1[0].map(x=>x.deathsTotal))
    
})

