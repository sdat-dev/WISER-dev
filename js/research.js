let filename = "research";
window.onload = function () {
    let requestURL = "data/research.json";
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
        var currentUrl = window.location.href;
        var shortUrl=currentUrl.substring(0,currentUrl.lastIndexOf("/"));
        content += '<div>' + '<ul style="font-size: smaller;font-weight: 600;">' + buildProjectsList(projects,shortUrl) + '</ul>' + '</div>';
        let contentElement = document.createElement('div');
        contentElement.classList.add('content');
        contentElement.innerHTML = content.trim();
        maincontentContainer.appendChild(contentElement);
        addfooter();
        let scrollelm = document.getElementById(scrollloc);
        if (scrollloc != null)
            scrollelm.scrollIntoView({ block: "center" });
    })).catch(errors => {
        console.log(errors);
    })
}

let buildProjectsList = function(projectslist,shortUrl) {
    content = '';
    projectslist.forEach(project => {
        content += '<li><a href="' + shortUrl + '/projects/' + project.Number.toLowerCase() + '"> ' + project.Title + '</a></li>'
    });
    return content;
}