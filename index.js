// This example displays a marker at the center of Australia.
// When the user clicks the marker, an info window opens.
function linkAPI() {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src= 'https://maps.googleapis.com/maps/api/js?key='+config.GMAPS_KEY;
    document.body.appendChild(s);
}

function initMap(videoList) {
    var theVideo = videoList[0];
    console.log('THE VIDEO', theVideo);
    var uk = { lat: 55.3781, lng: -3.4360 }
    var london = { lat: 51.5074, lng: -0.1278 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: uk
    });
    videoList.map(x => createVideoNode(x, map));
}

function getVideos() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', 'http://localhost:3000/videos');
    xmlHttp.send();
    xmlHttp.onreadystatechange = (e) => {
        let videos = JSON.parse(xmlHttp.responseText);
        console.log('videos:', videos);
        initMap(videos);
    }
}

function createVideoNode(videoData, theMap) {
    console.log('createVideoNode() called with videoData:', videoData);
    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Placeholder Title</h1>' +
        '<div id="bodyContent">' +
        '<iframe width="560" height="315" src=' + videoData.videoURL + ' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>' +
        '</iframe>' +
        '</div>' +
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var marker = new google.maps.Marker({
        position: videoData.location,
        map: theMap,
        title: videoData.title
    });
    marker.addListener('click', function () {
        infowindow.open(theMap, marker);
    });
}
linkAPI();
getVideos();