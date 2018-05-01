$(document).ready(function() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://codeit.pro/codeitCandidates/serverFrontendTest/company/getList", true);
    xhr.send();
    var data;
    data = JSON.parse(xhr.responseText);

    alert(data);

    data = JSON.parse(xhr.responseText);



    var xhrNews = new XMLHttpRequest();
    xhrNews.open("GET", "http://codeit.pro/codeitCandidates/serverFrontendTest/news/getList", false);
    xhrNews.send();
    var dataNews;
    dataNews = JSON.parse(xhrNews.responseText);
    alert(dataNews.status);

    document.querySelector(".result-total").innerHTML = data.list.length;










}