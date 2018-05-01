$(document).ready(function() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://codeit.pro/codeitCandidates/serverFrontendTest/company/getList", false);
    xhr.send();
    var data;
    data = JSON.parse(xhr.responseText);

    var xhrNews = new XMLHttpRequest();
    xhrNews.open("GET", "http://codeit.pro/codeitCandidates/serverFrontendTest/news/getList", false);
    xhrNews.send();
    var dataNews;
    dataNews = JSON.parse(xhrNews.responseText);

    if(xhr.readyState == 4 && xhrNews.readyState == 4) {
        setTimeout(function () { //чтобы насладиться прелоадами даем 3сек
            $(".preloader").css({"opacity": "0", "transition": "opacity 1s linear"});
            $(".result-total").css({"opacity": "1", "transition": "opacity 3s linear"});
            $(".result-companies").css({"opacity": "1", "transition": "opacity 3s linear"});
            $(".company-partners").css({"opacity": "1", "transition": "opacity 3s linear"});
            $("#piechart_3d").css({"opacity": "1", "transition": "opacity 3s linear"});
            $(".news-companies").css({"opacity": "1", "transition": "opacity 3s linear"});
            $(".add a").css({"opacity": "1", "transition": "opacity 3s linear"});
            $(".preloader").removeClass("preloader");
        }, 3000);
    }
    $(".result-total").text(data.list.length + " companies");
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

//--------------calc data---------------------------
        var arrLocation = [ ];
        arrLocation[0] = data.list[70].location.name;
        var flag = true;
        for (var i = 0; i < data.list.length; i++) {
            for (var j = 0; j < arrLocation.length; j++) {
                if (data.list[i].location.name === arrLocation[j]) {
                    flag = false;
                }
            }
            if (flag) {
                arrLocation.push(data.list[i].location.name);
            }
        }
        console.log(arrLocation);
        var arrLocationCalc = [];
        for (var k = 0; k < arrLocation.length; k++) {
            arrLocationCalc[k] = 0;
            for (var i = 0; i < data.list.length; i++) {
                if (arrLocation[k] === data.list[i].location.name) {
                    arrLocationCalc[k] += 1;
                }
            }
        }
        console.log(arrLocationCalc);

    //---------charts------------------

    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var arrTask = [];
        for (var j = 0; j < arrLocation.length + 1; j++) {
            arrTask[j] = [];
        }
        arrTask[0] = ['Task', 'H'];
        for (var h = 1; h < arrTask.length; h++) {
            arrTask[h][0] = arrLocation[h - 1];
            arrTask[h][1] = arrLocationCalc[h - 1];
        }
        var data = google.visualization.arrayToDataTable(arrTask);

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
//------------------------click companies-----------------------------
    $("ul li a").click(function(){
        var companyName = this.innerHTML;
        var str = " ";
        $(".company-partners").text(function (){
            for(var i = 0; i < data.list.length; i++) {
                if (data.list[i].name === companyName) {
                    for(var j = 0; j < data.list[i].partners.length; j++) {
                        str += data.list[i].partners[j].name + ": " + data.list[i].partners[j].value + "%; ";
                    }
                    return str;
                }
            }
        })
    });
//-----------------------------news------------------------------
    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var year = a.getFullYear();
        var month = ((a.getMonth() + 1) < 10) ? "0" + (a.getMonth() + 1) : (a.getMonth() + 1);
        var date = a.getDate();
        var time = date + '.' + month + '.' + year;
        return time;
    }

    var ulNews = document.createElement('ul');
    document.querySelector(".news-companies").appendChild(ulNews);
    var link = document.createElement('a');
    document.querySelector(".add").appendChild(link);
    link.innerHTML = dataNews.list[0].link;
    link.setAttribute("href", "https://codeit.us/");

    for(var i = 0; i < dataNews.list.length; i++) {
        addLiNews(i);
    }

    function addLiNews(num) {

        var li = document.createElement('li');
        var a = document.createElement('a');
        var img = document.createElement('img');
        var divAuthor = document.createElement('span');
        var divDate = document.createElement('span');
        var pDesc = document.createElement('p');
        var parent = document.body.getElementsByTagName('ul')[1];
        parent.appendChild(li);

        li.appendChild(a);
        li.appendChild(img);
        li.appendChild(divAuthor);
        li.appendChild(divDate);
        li.appendChild(pDesc);
        a.innerHTML = "Title " + (i + 1);
        img.src = dataNews.list[i].img;
        divAuthor.innerHTML = dataNews.list[i].author;
        divDate.innerHTML = timeConverter(dataNews.list[i].date);
        pDesc.innerHTML = dataNews.list[i].description;

    }


});