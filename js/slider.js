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
        leftSlide= setInterval(()=>{

            shift+= SHIFT;
            if(shift==WIDTH){
                activeIndex = (activeIndex+1)%imagesList.length;
                setActive(activeIndex);
                clearInterval(leftSlide);
            }
    
            imagesList.forEach(function(image){
                y = image.getPositions().y;
                image.setPositions(y-SHIFT);
    
            });
    
    
        }, TIME);
    }

    if (activeIndex==imagesList.length-1){
        leftSlide= setInterval(()=>{

            shift+= SHIFT;
            if(shift==2*WIDTH){
                setActive(0);
                clearInterval(leftSlide);
            }
    
            imagesList.forEach(function(image){
                y = image.getPositions().y;
                image.setPositions(y+SHIFT);
    
            });
    
    
        }, TIME);
    }
    
})


backward.addEventListener('click', ()=>{
    shift=0;
    activeIndex = getActive();

    if (activeIndex!=0){
    rightSlide= setInterval(()=>{

        shift+= SHIFT;

        if(shift==WIDTH){
            activeIndex = (Math.abs(activeIndex-1))%imagesList.length;
            setActive(activeIndex);
            clearInterval(rightSlide);
        }

        imagesList.forEach(function(image){
            y = image.getPositions().y;
            image.setPositions(y+SHIFT);

        });


    }, TIME);
}

if (activeIndex==0){
    rightSlide= setInterval(()=>{

        shift+= SHIFT;

        if(shift==2*WIDTH){
            setActive(imagesList.length-1);
            clearInterval(rightSlide);
        }

        imagesList.forEach(function(image){
            y = image.getPositions().y;
            image.setPositions(y-SHIFT);

        });


    }, TIME);
}
})





