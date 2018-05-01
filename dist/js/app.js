$(document).ready(function() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://codeit.pro/codeitCandidates/serverFrontendTest/company/getList", false);
    xhr.send();

    var xhrNews = new XMLHttpRequest();
    xhrNews.open("GET", "http://codeit.pro/codeitCandidates/serverFrontendTest/news/getList", false);
    xhrNews.send();


    var data;
    data = JSON.parse(xhr.responseText);
    var dataNews;
    dataNews = JSON.parse(xhrNews.responseText);

    setTimeout(function () {
        $(".preloader").removeClass("preloader");
        $(".result-total").text(data.list.length + " companies");
    }, 3000);

    var ul = document.createElement('ul');
    document.querySelector(".result-companies").appendChild(ul);

    for(var i = 0; i < data.list.length; i++) {
        addLi(i);
    }

    function addLi(num) {
        var a = document.createElement('a');
        a.innerHTML = data.list[num].name;
        var li = document.createElement('li');
        li.appendChild(a);
        var parent = document.body.getElementsByTagName('ul')[0];
        parent.appendChild(li);
    }




    //---------charts------------------

    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Task', 'H'],
            ['US',     11],
            ['Eat',      2],
            ['Commute',  2],
            ['Watch TV', 2],
            ['Sleep',    7]
        ]);

        var options = {
            title: '',
            'width': 320,
            'height': 250,
            backgroundColor: 'transparent',
            is3D: true,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
    }

});