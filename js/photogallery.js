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
        content += '<div class="row">' +
                '<div class="col-lg-4 col-md-12 mb-4 mb-lg-0"' +
                'style="'+
                'display: grid;'+
                'grid-template-columns: repeat(3, 5fr);'+
                'gap: 10px;'+
                'min-width: fit-content;>' + 
                buildGallery(WISERteam) + 
                buildGallery(Musicians) + 
                buildGallery(WISERindustry) + 
                buildGallery(WISERpresentations) + 
                '</div>';
        let contentElement = document.createElement('div');
        contentElement.classList.add('content');
        contentElement.innerHTML = content.trim();
        maincontentContainer.appendChild(contentElement);
        addfooter();
    })).catch(errors => {
        console.log(errors);
    })
}

let buildGallery = function(images){
    let content = '';
    images.forEach((image) => {
        content+='<img '+
        'src="' + image.URL + '"' +
        'class="w-100 shadow-1-strong rounded mb-4"' +
        'style="width:100%"'+
      '/>';
    });
    return content;
}

$('.carousel').carousel({
    pause: "false",
    interval: 2000

});