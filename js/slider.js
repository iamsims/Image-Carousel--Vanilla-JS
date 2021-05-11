const HEIGHT=400;
const WIDTH=600;
const SHIFT= 10;
const TIME = 10;
var carousel= document.querySelector(".carousel-container");

var forward= document.createElement("button");
forward.className= "carousel-button right"
forward.textContent=">";
carousel.appendChild(forward);

var backward= document.createElement("button");
backward.className= "carousel-button left"
backward.textContent="<";
carousel.appendChild(backward);

function Image(image,index){
    this.index = index;
    this.image = image;
    this.x = 0;
    this.y = WIDTH*index;
    this.image.style.top = this.x +"px";
    this.image.style.left = this.y +"px";
    this.active = true?index==0:false;

    this.setPositions= (y)=>{
        this.y= y;
        this.image.style.top= this.x +"px";
        this.image.style.left = this.y +"px";
    }

    this.getPositions =()=>{
        return {
            x: this.x,
            y: this.y
        };
    }
}

var images = document.querySelectorAll('img');
var imagesList = [];

images.forEach(function(image, index){
    img = new Image(image, index)
    imagesList.push(img);
});

function getActive(){
    activeIndex=0;
    imagesList.forEach(function(image, index){
        if(image.active == true){
            activeIndex= index;
        }
    })
    return activeIndex;
};

function setActive(activeIndex){
    imagesList.forEach(function(image, index){
        image.active= false;
        if(index==activeIndex){
            image.active= true;
        }
    });

    buttonList.forEach(function(button, index){
        button.element.style.opacity = "0.5";

        if(index==activeIndex){
        button.element.style.opacity = "0.8";
        }
    }
    )
};

var navBar = document.createElement("div");
navBar.className = "navigator";
carousel.appendChild(navBar);

function Button(index){
    this.index=index;
    this.element = document.createElement('button');
    this.element.className="nav-button";
    this.active = (index==0)?true:false;
    // this.element.style.background = this.active?"transparent":"grey";
    this.element.style.opacity= this.active?"0.8":"0.5";


    this.element.addEventListener('click', 
    function(){
        console.log("slide from indicator start");
        shift=0;
        activeIndex= getActive();
        ind= this.index;
        direction = Math.sign(activeIndex- ind);
        shiftNumber = Math.abs(activeIndex- ind);    
        
        if (shiftNumber!= 0){
        Slide= setInterval(()=>{
        shift+= SHIFT;
        if(shift==shiftNumber*WIDTH)
        {
        setActive(ind);
        clearInterval(Slide);
        }
        
        imagesList.forEach(function(image){
                y = image.getPositions().y;
                image.setPositions(y+direction*SHIFT);
        });
        
        }, TIME);
        }
        }.bind(this)
    );

};

var buttonList=[];

imagesList.forEach(function(image, index){
    button = new Button(index);
    navBar.appendChild(button.element);
    buttonList.push(button);
    console.log(button)
})

// console.log(getActive(imagesList));

forward.addEventListener('click', ()=>{
    console.log("left slide start");
    shift=0;
    activeIndex= getActive();
    // console.log("startng active index"+activeIndex);

    if (activeIndex!=imagesList.length-1){
        leftSlide= setInterval(()=>{

            shift+= SHIFT;
            if(shift==WIDTH){
                activeIndex = (activeIndex+1)%imagesList.length;
                // console.log("active index after reaching point  "+ activeIndex)
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
    console.log("right slide start");
    shift=0;
    activeIndex = getActive();
    // console.log("startng active index"+activeIndex);

    if (activeIndex!=0){
    rightSlide= setInterval(()=>{

        shift+= SHIFT;
        // console.log(shift);

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
        // console.log(shift);

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





