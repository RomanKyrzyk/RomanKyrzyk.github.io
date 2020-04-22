/*************************************
Name: Roman Kyrzyk
Class: CMPT304
Description: Pacman but the pellets disappear and no ghosts
Last Modified: March 7, 2020
**************************************/
let paragraphtagnum=0;
let currentdir=999;
const speed=4,frames=1;//speed is milleseconds per movement or inverse derivative, frames is how many pixels moved
//at a time.
let dir,horizontal=0,vertical=400,horizstring,verticstring;
let key=0, direction='u';
let pelletnum=0,pelletTotal=1000,eatenPellets=0,pelletLast=10000,pelletChange=0;
let pelletRank=0, internal=0,last_value=0;
let gameover=0;
document.write("<p></p>");
document.getElementsByTagName("p")[paragraphtagnum].setAttribute("id","pacman");
paragraphtagnum++;
let pacmanRadius=20,pelletRadius=8,pelletPrev;

const pacman=document.getElementById("pacman").style;



class Pellet { //makes a class with pellet to keep track of individual values.
    constructor() {
        this.xPosition;
        this.yPosition;
        this.identity;
        this.lasting;
		this.startingAt;
    }
    get xPos() {
        return this.xPosition;//Get and set are needed to access the members as far as I can see
    }
    set xPos(x) {
        this.xPosition=x;
    }
    get yPos() {
        return this.yPosition;
    }
    set yPos(y) {
        this.yPosition=y;
    }
    get id() {
        return this.identity;
    }
    set id(i) {
        this.identity=i;
    }
    get last() {
        return this.lasting;
    }
    set last(l) {
        this.lasting=l;
    }
	get start() {
		return this.startingAt;
	}
	set start(s) {
		this.startingAt=s;
	}
}

pelletobjects=new Pellet();
pelletobjects=new Array(pelletTotal);
for (let init1=0;init1<pelletTotal;init1++) {
    pelletstring="l"+init1;
    document.write("<h1></h1>")
    document.getElementsByTagName("h1")[init1].setAttribute("id",pelletstring);
    document.getElementsByTagName("h1")[init1].style.visibility="hidden";
    pelletobjects[init1]=new Pellet();
    pelletobjects[init1].id=pelletstring;
}
createTwo(false);


setInterval(function() {
	if (gameover==0) {
    internal++;
	pelletChange=pelletnum;
	for (let erasec=0;erasec<pelletnum;erasec++) {
		if (internal-pelletobjects[erasec].start>=pelletobjects[erasec].last) {//If the difference in time between the current time and starting time of
		//a pellet and sees if for that same pellet the time difference is to when it's supposed to dissapear

                idstring=pelletobjects[erasec].id;
                document.getElementById(idstring).style.visibility="hidden";//the Box will stay if I don't make it invisible
                pelletobjects.splice(erasec,1);//splice removes and readjusts js arrays
                pelletChange--;
		}
	}
	pelletnum=pelletChange;
	switch (internal%4) {//With so many options, I use switch to make it more clear. Also switch is
	//there for multiple possible values like here.
		case 0:
			pacman.backgroundImage="url('closed.png')";/*Goes from the first value closed("all close the
				same) and then the the middle frame, then last frame then back to middle frame where it
				can be looped from the first frame. It displays a different image depending on what the
				direction is. Was tired that night and forgot that I could've just used dir.
			*/
		break;
		case 1:
			switch (direction) {
				case 'u':pacman.backgroundImage="url('open1U.png')";
				break;
				case 'd':pacman.backgroundImage="url('open1D.png')";
				break;
				case 'l':pacman.backgroundImage="url('open1L.png')";
				break;
				case 'r':pacman.backgroundImage="url('open1R.png')";
				break;
			}
		break;
		case 2:
			switch (direction) {
				case 'u':pacman.backgroundImage="url('open2U.png')";
				break;
				case 'd':pacman.backgroundImage="url('open2D.png')";
				break;
				case 'l':pacman.backgroundImage="url('open2L.png')";
				break;
				case 'r':pacman.backgroundImage="url('open2R.png')";
				break;
			}
		break;
		case 3:
			switch (direction) {
				case 'u':pacman.backgroundImage="url('open1U.png')";
				break;
				case 'd':pacman.backgroundImage="url('open1D.png')";
				break;
				case 'l':pacman.backgroundImage="url('open1L.png')";
				break;
				case 'r':pacman.backgroundImage="url('open1R.png')";
				break;
			}
		break;
	}
	}
}, 1);


function createTwo(bool) {//bool is for whether it runs twice or not, first time it runs only once
    let isTwice
    if (pelletnum<100&&gameover==0) {//Only 100 go on the screen at once, stops at game over
		if (bool) {
			isTwice=2;
		}
		else {
			isTwice=1;
		}
    for (let twice=0;twice<isTwice;twice++) {

        let tempx,tempy;

        tempx=Math.floor(Math.random()*100);
        tempy=Math.floor(Math.random()*100)-3;
        let idstring=pelletobjects[pelletnum].id;
        verticstring=tempy+"%";//converting it to DOM legible form
        horizstring=tempx+"%";
        document.getElementById(idstring).style.top=verticstring;
        document.getElementById(idstring).style.left=horizstring;
        document.getElementById(idstring).style.visibility="visible";//uses the next value and makes it visible and in a random location
        pelletobjects[pelletnum].last=pelletLast;
        
        pelletobjects[pelletnum].xPos=tempx;
        pelletobjects[pelletnum].yPos=tempy;
		pelletobjects[pelletnum].start=internal;//Sets the starting time value
        pelletnum++;
        }
    }
}


aPellet=new Array();
setInterval(function() {movement(currentdir)//every speed it calls currentdir
},speed);

window.addEventListener("keydown",function(){//when a key is pressed down function is triggered
    movement(event);
});

function movement(event) {
    if (gameover==0) {
    let dir,nokeypressed=0;
    if (event==999) //This is for the very first movement that gives it an irregular value so I can't see how event works.
        dir=39;
    else
        dir=event.keyCode;
    if(pacman.left>="97%")//boundary settings, didn't use it much
        pacman.left="100%"
    else {
        for(let framecount=0;framecount<frames;framecount++) {//glitches on bar and hitbox where it forgets one direction randomly
            switch(dir) {
                case 38://up key
                    if(vertical>=-15){
                        vertical=vertical-1;
						direction='u';
					}
                break;
                case 40://down key
                    if (vertical<=window.innerHeight-(pacmanRadius*2+16)){//Needs to be aligned for the real center in the top left corner & 16 pixels down
                        vertical++;
						direction='d';
					}
                break;
                case 37://left key
                    if(pacman.left>"1%") {
                        horizontal--;
						direction='l';
					}
                break;
                case 39://right key
                    if (horizontal<=window.innerWidth-pacmanRadius*2) {
                        horizontal++;
						direction='r';
					}
                break;
                case 83://If you press s it stops
                break;
                default:
                    nokeypressed=1;//so other keys don't do anything
            }
        }
        if (nokeypressed==0)
            currentdir=event;
        verticstring=vertical+"px";
        horizstring=horizontal+"px";

        pacman.top=verticstring;
        pacman.left=horizstring;
        for (let hitcheck=0;hitcheck<pelletnum;hitcheck++) { //checks every value for hitbox overlap
            if (pelletobjects[hitcheck].xPos*window.innerWidth/100-horizontal<=  pacmanRadius*2-pelletRadius &&//converts the pellet percentage point to pixels
                pelletobjects[hitcheck].xPos*window.innerWidth/100-horizontal>= -(0-pelletRadius+8) &&         //then compares the values.
                pelletobjects[hitcheck].yPos*window.innerHeight/100-vertical<=  (pacmanRadius*2-pelletRadius)  &&
                pelletobjects[hitcheck].yPos*window.innerHeight/100-vertical>= -(16-pelletRadius) ) {
                    
                    document.getElementById(pelletobjects[hitcheck].id).style.visibility="hidden";
                    eatenPellets++;
                    document.getElementById("pelletsnum").innerHTML=eatenPellets;//Adds a new pellet and makes it be considered eaten
                    pelletobjects.splice(hitcheck,1);
                    pelletnum--;
                    pelletLast*=.95;
                    createTwo(true);
                }
        }
        if (pelletnum==0) {
			let gMMessage="Game Over,  your score is : "+eatenPellets;
            document.getElementsByClassName("pellets_text")[0].innerHTML=gMMessage;//Needs to add eatenPellets since the span is deleted if you change the
			//parent's innerHtml
            gameover=2;
        }
    }
}
}
