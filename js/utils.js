function Button(index){
    this.index=index;
    this.element = document.createElement('button');
    this.element.className="nav-button";
    this.active = (index==0)?true:false;
    this.element.style.opacity= this.active?"0.8":"0.5";


    this.element.addEventListener('click', 
    function(){
        shift=0;
        activeIndex= getActive();
        ind= this.index;
        direction = Math.sign(activeIndex- ind);
        shiftNumber = Math.abs(activeIndex- ind);    
        translate(ind, shiftNumber, direction);
        }.bind(this)
    );

};

function translate(ind,shiftNumber, direction){
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
        
        }, TIME/shiftNumber);
        }  
}

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