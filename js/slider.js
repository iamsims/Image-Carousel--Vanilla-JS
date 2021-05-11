var carousel= document.querySelector(".carousel-container");

var forward= document.createElement("button");
forward.className= "carousel-button right"
forward.textContent=">";
carousel.appendChild(forward);

var backward= document.createElement("button");
backward.className= "carousel-button left"
backward.textContent="<";
carousel.appendChild(backward);

var navBar = document.createElement("div");
navBar.className = "navigator";
carousel.appendChild(navBar);

var images = document.querySelectorAll('img');
var imagesList = [];
var buttonList = [];

images.forEach(function(image, index){
    img = new Image(image, index)
    imagesList.push(img);
    button = new Button(index);
    navBar.appendChild(button.element);
    buttonList.push(button);
});

forward.addEventListener('click', ()=>{
    shift=0;
    activeIndex= getActive();

    if (activeIndex!=imagesList.length-1){
        ind = (activeIndex+1)%imagesList.length;
        translate(ind, 1, -1);
    }

    if (activeIndex==imagesList.length-1){
        translate(0, imagesList.length-1, 1)
    }
    
})

backward.addEventListener('click', ()=>{
    shift=0;
    activeIndex = getActive();

    if (activeIndex!=0){
    ind = (Math.abs(activeIndex-1))%imagesList.length;
    translate(ind, 1, 1);
}

if (activeIndex==0){
    translate(imagesList.length-1, imagesList.length-1, -1);
}
})