let filename = "photogallery";
window.onload = function () {
    let requestURL = "data/photogallery.json";
    let imageDirMusiciansURL = "data/imageDirMusicians.json";
    let imageDirWISERindustryURL = "data/imageDirWISERindustry.json";
    let imageDirWISERpresentationsURL = "data/imageDirWISERpresentations.json";
    let imageDirWISERteamURL = "data/imageDirWISERteam.json";
    let request = axios.get(requestURL);
    let Musicians = axios.get(imageDirMusiciansURL);
    let WISERindustry = axios.get(imageDirWISERindustryURL);
    let WISERpresentations = axios.get(imageDirWISERpresentationsURL);
    let WISERteam = axios.get(imageDirWISERteamURL);
    let maincontentContainer = document.getElementsByClassName('main-content')[0];

    axios.all([request, Musicians, WISERindustry, WISERpresentations, WISERteam]).then(axios.spread((...responses) => {
        let web = responses[0].data;
        let Musicians = responses[1].data;
        let WISERindustry = responses[2].data;
        let WISERpresentations = responses[3].data;
        let WISERteam = responses[4].data;
        let webelements = web;
        let content = getContent(webelements);
        let distincttabs = ['WISER Team','WISER Industry','Musicians','WISER Presentations'];
        let tabattribute = 'ABC';
        let activeIndex = 0;
        content += '<div id = "research-area-tabs"><ul class="nav nav-pills" style="font-weight: bold; text-transform: uppercase;padding-bottom: 5px;">' +
            '<li class="nav-item">' +
            '<a id="all-tab" class="nav-link" aria-current="page" >' + "All" + '</a></li>';
        content += '<li class="nav-item">' +
            '<a id="' + 1 + '-tab" onclick= "searchfunction2(\'' + 'WISER Team' + '\', ' + 1 + ')" class="nav-link" aria-current="page" >WISER Team</a></li>';
        content += '<li class="nav-item">' +
        '<a id="' + 2 + '-tab" onclick= "searchfunction2(\'' + 'WISER Industry' + '\', ' + 2 + ')" class="nav-link" aria-current="page" >WISER Industry</a></li>';
        content += '<li class="nav-item">' +
        '<a id="' + 3 + '-tab" onclick= "searchfunction2(\'' + 'Musicians' + '\', ' + 3 + ')" class="nav-link" aria-current="page" >Musicians</a></li>';
        content += '<li class="nav-item">' +
        '<a id="' + 4 + '-tab" onclick= "searchfunction2(\'' + 'WISER Presentations' + '\', ' + 4 + ')" class="nav-link" aria-current="page" >WISER Presentations</a></li>';
        content += '</ul></div>';
        content += '<div id="experts-content">';
        let tabContent = [buildImageTabContent(WISERteam,'ex1-tabs-1','ex1-tab-1',true),buildImageTabContent(WISERindustry,'ex1-tabs-3','ex1-tab-3'),buildImageTabContent(Musicians,'ex1-tabs-2','ex1-tab-2'),buildImageTabContent(WISERpresentations,'ex1-tabs-4','ex1-tab-4')];
        content = '<div class=tabs>' + createTabNavigation2(distincttabs, tabattribute, activeIndex);
        content += '<p></p>'
        content += buildTabContent2(distincttabs, tabattribute, tabContent, activeIndex) + '</div>';
        let contentElement = document.createElement('div');
        contentElement.classList.add('content');
        contentElement.innerHTML = content.trim();
        maincontentContainer.appendChild(contentElement);
        addfooter();
    })).catch(errors => {
        console.log(errors);
    })
}

let buildTabContent2 = function (distincttabs, tabname, tabContent, activeIndex) {
    let content = '<div class="tab-content" id="pills-tabContent">';

    for (let i = 0; i < distincttabs.length; i++) {
        let tabId = tabname + i.toString();
        if (i == activeIndex) {
            content += '<div class="tab-pane fade in active show" id="pills-' + tabId + '" role="tabpanel">';
        }
        else {
            content += '<div class="tab-pane fade" id="pills-' + tabId + '" role="tabpanel">';
        }
        content += tabContent[i];
        content += '</div>';
    }
    content += '</div>';
    return content;
}

let createTabNavigation2 = function (distincttabs, tabname, activeindex = 0) {
    let navigationContent = '<ul class="nav nav-pills" id="pills-tab" role="tablist">';
    for (let i = 0; i < distincttabs.length; i++) {
        let linkElement = '';
        let tabId = tabname + i.toString();
        if (i == activeindex) {
            linkElement = '<li role="presentation" class="active"><a href="#pills-' + tabId + '"class="nav-link active show" id="#pills-' + tabId + '" aria-controls="pills-' + tabId + '" role="tab" data-toggle="pill">' + distincttabs[i] + '</a></li>';
        }
        else {
            linkElement = '<li role="presentation"><a href="#pills-' + tabId + '"class="nav-link" id="#pills-' + tabId + '" aria-controls="pills-' + tabId + '" role="tab" data-toggle="pill">' + distincttabs[i] + '</a></li>';
        }
        navigationContent = navigationContent + linkElement;
    }
    navigationContent += '</ul>';
    return navigationContent;
}

searchfunction2 = function (searchtext, tabIndex) {
    //getting individual content withing sub-accordions to toggle display
    let fundingopps = document.getElementById("fundingopps");
    let searchElems = document.getElementsByClassName('research-areas');
    let tabs = document.getElementsByClassName('tab-pane');
    let panels = document.getElementsByClassName("panel");
    for (let index = 0; index < 4; index++) {
        let tabId = index + "-tab";
        document.getElementById(tabId).classList.remove('active');
    }
    // add active class for current tabIndex
    let currentId = tabIndex + "-tab";
    document.getElementById(currentId).classList.add('active');
}

let buildGallery = function(images){
    let content = '';
    images.forEach((image) => {
        content+='<div class="hover-zoom">';
        content+='<img '+
        'src="' + image.URL + '"' +
        'class="w-100 shadow-1-strong rounded mb-4"' +
        'style="width:100%"'+
      '/></div>';
    });
    return content;
}

let buildImageTabContent = function(folder,id,arialabelledby,active=false){
    content = '';
    content += '<div class="row">' +
                '<div class="col-lg-4 col-md-12 mb-4 mb-lg-0"' +
                'style="'+
                'display: grid;'+
                'grid-template-columns: repeat(3, 5fr);'+
                'gap: 10px;'+
                'min-width: fit-content;">';
    content += buildGallery(folder);
    content += '</div>';
    content += '</div>';
    // content += '</div>';
    return content;
}

$('.carousel').carousel({
    pause: "false",
    interval: 2000

});