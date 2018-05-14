
$(document).ready(function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://codeit.pro/codeitCandidates/serverFrontendTest/company/getList", true);
    xhr.send();


    var xhrNews = new XMLHttpRequest();
    xhrNews.open("GET", "http://codeit.pro/codeitCandidates/serverFrontendTest/news/getList", true);
    xhrNews.send();

    var timer = setInterval(function () {
        if(xhr.readyState === 4 && xhrNews.readyState === 4) {
            clearInterval(timer);
            var data;
            data = JSON.parse(xhr.responseText);
            var dataNews;
            dataNews = JSON.parse(xhrNews.responseText);
            var resultTotal = $(".result-total");
            var preloader = $(".preloader");
            var resultCompanies = $(".result-companies");
            var companyPartners = $(".company-partners");
            var form = $("form");
            var diagram = $("#piechart_3d");
            var newsCompanies = $(".news-companies");
            var addBlock = $(".add");

            var adress = document.createElement('a');
            addBlock.append(adress);
            adress.innerHTML = "my CV";
            adress.setAttribute("href", "https://hh.ru/resume/a633e285ff050700d30039ed1f72386f523849");
            var add = $(".add a");

            resultTotal.text(data.list.length + " companies");
            preloader.removeClass("preloader");
            preloader.css({"opacity": "0", "transition": "opacity 1s linear"});
            resultTotal.css({"opacity": "1", "transition": "opacity 3s linear"});
            resultCompanies.css({"opacity": "1", "transition": "opacity 3s linear"});
            companyPartners.css({"opacity": "1", "transition": "opacity 3s linear"});
            form.css({"opacity": "1", "transition": "opacity 3s linear"});
            diagram.css({"opacity": "1", "transition": "opacity 3s linear"});
            newsCompanies.css({"opacity": "1", "transition": "opacity 3s linear"});
            add.css({"opacity": "1", "transition": "opacity 3s linear"});

            var ul = document.createElement('ul');
            resultCompanies.append(ul);

            for (var i = 0; i < data.list.length; i++) {
                addLi(i);
            }

            function addLi(num) {
                var a = document.createElement('a');
                a.innerHTML = data.list[num].name;
                a.setAttribute("data", num);
                var li = document.createElement('li');
                li.appendChild(a);
                var parent = document.body.getElementsByTagName('ul')[0];
                parent.appendChild(li);
            }

    //--------------calc data---------------------------
            var arrLocation = [];
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
            var arrLocationCalc = [];
            for (var k = 0; k < arrLocation.length; k++) {
                arrLocationCalc[k] = 0;
                for (var i = 0; i < data.list.length; i++) {
                    if (arrLocation[k] === data.list[i].location.name) {
                        arrLocationCalc[k] += 1;
                    }
                }
            }
            //---------charts------------------
            google.charts.load("current", {packages: ["corechart"]});
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
                    stroke: "white",
                    is3D: true,
                };
                var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
                chart.draw(data, options);
            }

    //------------------------click companies-----------------------------
            $("ul li a").click(function () {
                var radio = $('input[name=sort]:checked').val();
                var attrA = this.getAttribute('data');
                var str = " ";
                var helpArr = [];
                companyPartners.text(function () {
                    helpArr = data.list[parseInt(attrA)].partners.sort(function (a, b) {
                        return a.value - b.value;
                        })
                    if (radio === "waning") {
                        helpArr.reverse();
                        }
                        for (var j = 0; j < helpArr.length; j++) {
                        str += helpArr[j].name + ": " + helpArr[j].value + "%; ";
                    }
                    return str;
                })
            });

    //-----------------------------news------------------------------
            function timeConverter(UNIX_timestamp) {
                var a = new Date(UNIX_timestamp * 1000);
                var year = a.getFullYear();
                var month = ((a.getMonth() + 1) < 10) ? "0" + (a.getMonth() + 1) : (a.getMonth() + 1);
                var date = a.getDate();
                var time = date + '.' + month + '.' + year;
                return time;
            }

            var ulNews = document.createElement('ul');
            newsCompanies.append(ulNews);

            for (var i = 0; i < dataNews.list.length; i++) {
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
                parent.append(li);

                li.append(a);
                li.append(img);
                li.append(divAuthor);
                li.append(divDate);
                li.append(pDesc);
                a.innerHTML = "Title " + (num + 1);
                img.src = dataNews.list[num].img;
                divAuthor.innerHTML = dataNews.list[num].author;
                divDate.innerHTML = timeConverter(dataNews.list[num].date);
                pDesc.innerHTML = dataNews.list[num].description;
            }
        }
    }, 2000);
});