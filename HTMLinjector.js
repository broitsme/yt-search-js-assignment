(()=>{
  //to inject basic HTML in index.html
  document.body.appendChild(getLogoElement("youtube-logo-preview-400x400.png"));
  document.body.appendChild(getFormElement());
  document.body.appendChild(getDivNodeWithIdAndClass('videos',''));
})();

function getFormElement(){
  //div element for form
  let formElement = document.createElement('div');
  formElement.setAttribute('class','form');
  formElement.appendChild(getButton('search(this)','border-radius:4em','previous','prev-btn'));
  formElement.appendChild(getInputSearchDivElement());
  formElement.appendChild(getButton('search(this)','border-radius:4em','next','next-btn'));
  return formElement;
}

function getButton(onclickFunction, style, innerHTMLText,className){
  //returns button with given onclickFunction, style and innerHTMLText and class
  let buttonNode = document.createElement('button');
  buttonNode.setAttribute('onclick',onclickFunction);
  buttonNode.innerHTML = innerHTMLText;
  buttonNode.setAttribute('style',style);
  buttonNode.setAttribute('class',className);
  return buttonNode;
}

function getInputSearchDivElement(){
  //returns input and search Button Node
  //input ,search button div
  let inputSearchDivElement = document.createElement('div');
  //input
  let inputNode = document.createElement('input');
  inputNode.setAttribute('type','text');
  inputNode.setAttribute('id','search-word');
  inputNode.setAttribute('placeholder','   search here');
  //button for seach
  let searchButtonNode = getButton('search(this)','border-width: 2px 2px 2px 0px;','Search','search-btn');
  inputSearchDivElement.appendChild(inputNode);
  inputSearchDivElement.appendChild(searchButtonNode);
  return inputSearchDivElement;
}

function getLogoElement(logo){
  //returns logo Node
  let logoElement = getDivNodeWithIdAndClass('','logo');
  let imgNode = document.createElement('img');
  imgNode.className ='logo';
  imgNode.src = logo;
  logoElement.appendChild(imgNode);
  return logoElement;
}

function getDivNodeWithIdAndClass(id, className){
  //returns div node with given id and class
  let element = document.createElement('div');
  element.setAttribute('id',id);
  element.setAttribute('class',className);
  return element;
}
