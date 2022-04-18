let filename = "researchareas";
window.onload = function () {
    let requestURL = "data/researchareas.json";
    let datarequestURL = "data/projectslist.json";
    let request = axios.get(requestURL);
    let datarequest = axios.get(datarequestURL);
    let scrollloc = window.location.href.split("#")[1];
    let maincontentContainer = document.getElementsByClassName('main-content')[0];

    axios.all([request, datarequest]).then(axios.spread((...responses) => {
        let researchareacontent = responses[0].data;
        let projects = responses[1].data;
        let webelements = researchareacontent;
        let content = getContent(webelements);
        content += '<div>' + '<ul style="font-size: smaller;font-weight: 600;">' + buildProjectsList(projects) + '</ul>' + '</div>';
        let contentElement = document.createElement('div');
        contentElement.classList.add('content');
        contentElement.innerHTML = content.trim();
        maincontentContainer.appendChild(contentElement);
        addfooter();
        var currentUrl = window.location.href;
        var divID = currentUrl.split("#", 2);
        //document.getElementById(divID[1].toString()).scrollIntoView(true); Need to figure it out
        let scrollelm = document.getElementById(scrollloc);
        if (scrollloc != null)
            scrollelm.scrollIntoView({ block: "center" });
    })).catch(errors => {
        console.log(errors);
    })
}

let buildProjectsList = function(projectslist) {
    content = '';
    projectslist.forEach(project => {
        content += '<li><a href="/projects/' + project.Number + '"> ' + project.Title + '</a></li>'
    });
    return content;
}