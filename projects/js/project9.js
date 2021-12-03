let requestURL = "../data/project9.json";
let request = new XMLHttpRequest();
//getting content Element to append grants information
let maincontentContainer = document.getElementsByClassName('main-content')[0];
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function () {
    let content = '';
    const datajson = request.response;
    //condition for checking if browser is Internet Explorer
    let data = ((false || !!document.documentMode)) ? JSON.parse(datajson) : datajson;
    let contentElement = document.createElement('div');
    contentElement.classList.add('content');
    contentElement.innerHTML = getContent(data.webelements);
    maincontentContainer.appendChild(contentElement);
    contentElement = document.createElement('div');
    contentElement.classList.add('display-flex');
    contentElement.innerHTML = buildteam(data.members);
    maincontentContainer.appendChild(contentElement);
    addfooter();
}

let buildteam = function (members) {
    content = "";
    for (let i = 0; i < members.length; i++) {
        let member = members[i];
        content += '<div class = "col-lg-3 col-md-4 col-sm-6" style="height: 300px; padding-top: 20px;">' ;
        if (member.link == undefined) {
            '<a href = "../speakers/' + member.link + '">' ;
        }
        content += '<p class = "speakers-info">';
        if (member.email == undefined) {
            content += '<img class = "speakers-img" style="height: 200.887px; width: 200.887px; border-radius: 50%;" src= "../assets/images/Researchers/placeholder.jpg" />';
        }
        else {
            content += '<img class = "speakers-img" style="height: 200.887px; width: 200.887px; border-radius: 50%;" src= "../assets/images/Researchers/' + member.email + '.jpg" />';
        }
        content += '<br>' +
            '<span class = "title">' +
            '<strong>' + member.name + '</strong>' +
            '<br>' +
            '<span style="font-size: 16px;">' +
            member.university +
            '</span>' +
            '</span>' +
            '</p>' +
            '</a>' +
            '</div>';
    }
    return content;
}

$('.carousel').carousel({
    pause: "false",
    interval: 2000

});