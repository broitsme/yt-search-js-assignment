let previousToken = null;
let firstToken = '';
let nextToken = null;

function init() {
    const apiKey = 'AIzaSyCTmn2VL1-pni8B6M03bQHVvPV4zp0zUD4';
    gapi.client.setApiKey(apiKey);
    gapi.client.load('youtube', 'v3', function() { console.log("from init"); });
    return true;
}

function search(control) {
    if (!document.getElementById("search-word").value) {
        alert("input something to search");
        return;
    }
    currentToken = control.innerHTML === "Search" ? firstToken : (control.innerHTML === "next" ? nextToken : previousToken);
    let request = getYTRequestObject();
    let videosDiv = document.getElementById('videos');
    videosDiv.innerHTML = '';
    request.execute(function(response) {
        let results = response.result.items;
        let flexList = getYTValuesElement(results);
        nextToken = response.nextPageToken;
        previousToken = response.prevPageToken;
        videosDiv.appendChild(flexList);
    });
    return true;
}

function getYTRequestObject() {
    return gapi.client.youtube.search.list({
        part: "snippet",
        type: "video",
        q: document.getElementById("search-word").value,
        maxResults: 16,
        order: "viewCount",
        pageToken: currentToken
    });
}

function getYTValuesElement(results) {
    let flexList = document.createElement('result-list');
    for (let i = 0; i < results.length; i++) {
        let contentDiv = document.createElement("div");
        contentDiv.setAttribute('class', 'tooltip');
        let imgNode = document.createElement("img");
        imgNode.src = results[i]["snippet"]["thumbnails"]["high"]["url"];
        let titleLinkDiv = document.createElement("div");
        let videoLinkTitle = document.createElement("a");
        videoLinkTitle.href = "https://www.youtube.com/watch?v=" + results[i]["id"]["videoId"];
        videoLinkTitle.innerHTML = results[i]["snippet"]["title"];
        titleLinkDiv.appendChild(videoLinkTitle);
        let descNode = document.createElement("p");
        descNode.innerHTML = results[i]["snippet"]["description"];
        descNode.setAttribute('class', 'tooltiptext');
        let channelTitleNode = document.createElement("h6");
        channelTitleNode.innerHTML = results[i]["snippet"]["channelTitle"] + "\n <br> " + results[i]["snippet"]["publishedAt"].substring(0, 10);
        contentDiv.appendChild(imgNode);
        contentDiv.appendChild(titleLinkDiv);
        contentDiv.appendChild(descNode);
        contentDiv.appendChild(channelTitleNode);
        flexList.appendChild(contentDiv);
    }
    return flexList;
}
