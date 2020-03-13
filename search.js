let previousToken = null;
firstToken = '';
let nextToken = null;
const apiKey = 'AIzaSyCTmn2VL1-pni8B6M03bQHVvPV4zp0zUD4';

function init() {
    gapi.client.setApiKey(apiKey);
    gapi.client.load('youtube', 'v3', function() { console.log("sup? from init"); });
    return true;
}

function search(control) {
    if (!document.getElementById("search-word").value) {
        alert("input something to search");
        return;
    }
    currentToken = control.innerHTML === "Search" ? firstToken : (control.innerHTML === "next" ? nextToken : previousToken);
    if (currentToken === null) {
        currentToken = firstToken;
    }
    let request = getYTRequestObject();
    let outerDiv = document.getElementById('outerDiv');
    outerDiv.innerHTML = '';
    console.log(outerDiv);
    request.execute(function(response) {
        let results = response.result.items;
        let flexList = getYTValuesInDiv(results);
        console.log(response);
        nextToken = response.nextPageToken;
        previousToken = response.prevPageToken;
        outerDiv.appendChild(flexList);
    });
    return true;
}

// function createLoadingElement() {
//     let loadingOuter = document.createElement('div');
//     loadingOuter.setAttribute('id', 'pulse-wrapper');
//     let loadingInner = document.createElement('div');
//     loadingInner.setAttribute('id', 'pulse');
//     loadingInner.appendChild(document.createElement('span'));
//     loadingInner.appendChild(document.createElement('span'));
//     return loadingOuter;
// }

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

function getYTValuesInDiv(results) {
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
        console.log(results[i]);
        flexList.appendChild(contentDiv);
        console.log(flexList);
    }
    return flexList;
}
document.addEventListener('DOMContentLoaded', test, false);

function test() {

    describe("search must work", () => {
        it("search must be true", () => {
            //assert
            let fakeInputElement = document.createElement('search-word');
            fakeInputElement.value = "abc";

            expect(search(fakeInputElement).toBe(true));
        });

    });
}