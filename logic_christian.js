//import Chart from 'chart.js/auto'
let year=[]
for (let i=2000; i<2025; i++) {
    year.push(i);
}

const footer = (tooltipItems)=>{
    let total=0;
    tooltipItems.forEach(function(tooltipItem){
        total += tooltipItem.parsed.y;
    });
    return 'Total: '+total;
};

function renderChart(data1, data2, data3, labels){
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: 'Earthquakes',
                barThickness:10,
                backgroundColor: 'green',
                data: data1[0].map(x=>x.deathsTotal)
            },
            {
                label: 'Volcano',
                barThickness:10,
                backgroundColor: 'red',
                data: data2[0].map(x=>x.deathsTotal)
            },
            {
                label: 'Tsunami',
                backgroundColor: 'blue',
                barThickness:10,
                data: data3[0].map(x=>x.deathsTotal)
            }]
        },
        options: {
            interaction: {
                intersect: false,
                mode: 'index',
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        footer: footer,
                    }
                },
            },
            responsive: true,
            scales:{
                x:{
                    stacked: true
                },
                y:{
                    stacked: true,
                    max: 1500
                }
                
            }
        }
    });
}
//console.log(getChartData("Datasets/cleaned_earthquake.json"))
$.when($.ajax("Datasets/cleaned_earthquake.json"), $.ajax("Datasets/cleaned_volcanos.json"), $.ajax("Datasets/cleaned_tsunami.json")).done(function(response1, response2, response3){
    renderChart(response1, response2, response3, year)
    //console.log(response1[0].map(x=>x.deathsTotal))
    
})

//Coding attempts
// function getChartData(url){
//     $.ajax({
//         url: url,
//         async: false,
//         dataType: "json",
//         success: function(result) {
//             let data1=result.map(x=>x.deathsTotal)
//             return(data1);
//         }
//     });
// }

// function remap(data){

// }
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

