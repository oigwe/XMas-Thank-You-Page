

var Snowflake = (function() {

	var flakes;
	var flakesTotal = 250;
	var wind = 0;
	var mouseX;
	var mouseY;

	function Snowflake(size, x, y, vx, vy) {
		this.size = size;
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.hit = false;
		this.melt = false;
		this.div = document.createElement('div');
		this.div.classList.add('snowflake');
		this.div.style.width = this.size + 'px';
		this.div.style.height = this.size + 'px';
	}

	Snowflake.prototype.move = function() {
		if (this.hit) {
			if (Math.random() > 0.995) this.melt = true;
		} else {
			this.x += this.vx + Math.min(Math.max(wind, -10), 10);
			this.y += this.vy;
		}

		// Wrap the snowflake to within the bounds of the page
		if (this.x > window.innerWidth + this.size) {
			this.x -= window.innerWidth + this.size;
		}

		if (this.x < -this.size) {
			this.x += window.innerWidth + this.size;
		}

		if (this.y > window.innerHeight + this.size) {
			this.x = Math.random() * window.innerWidth;
			this.y -= window.innerHeight + this.size * 2;
			this.melt = false;
		}

		var dx = mouseX - this.x;
		var dy = mouseY - this.y;
		this.hit = !this.melt && this.y < mouseY && dx * dx + dy * dy < 2400;
	};

	Snowflake.prototype.draw = function() {
		this.div.style.transform =
		this.div.style.MozTransform =
		this.div.style.webkitTransform =
			'translate3d(' + this.x + 'px' + ',' + this.y + 'px,0)';
	};

	function update() {
		for (var i = flakes.length; i--; ) {
			var flake = flakes[i];
			flake.move();
			flake.draw();
		}
		requestAnimationFrame(update);
	}

	Snowflake.init = function(container) {
		flakes = [];

		for (var i = flakesTotal; i--; ) {
			var size = (Math.random() + 0.2) * 12 + 1;
			var flake = new Snowflake(
				size,
				Math.random() * window.innerWidth,
				Math.random() * window.innerHeight,
				Math.random() - 0.5,
				size * 0.3
			);
			container.appendChild(flake.div);
			flakes.push(flake);
		}
    
    container.onmousemove = function(event) {
	  	mouseX = event.clientX;
  		mouseY = event.clientY;
  		wind = (mouseX - window.innerWidth / 2) / window.innerWidth * 6;
  	};

	  container.ontouchstart = function(event) {
		  mouseX = event.targetTouches[0].clientX;
		  mouseY = event.targetTouches[0].clientY;
		  event.preventDefault();
  	};

  	window.ondeviceorientation = function(event) {
	  	if (event) {
		  	wind = event.gamma / 10;
  		}
  	};
    
  	update();
	};

	return Snowflake;

}());

window.onload = function() {
  setTimeout(function() {
  	Snowflake.init(document.getElementById('snow'));
  }, 500);
}

const playlist = {
    name: 'Thank You',
    description: 'See You In 2019!',
    songs: [
        {name: 'Susana',
        artists: ['Thanks For Your Encouragement & Support Throughout These First 3 Months'],  
      }, 
      { name:"Joyce",
        artists:[" Thank you for your patience when I’ve asked to not give up on me while I try to push further. Thank you for your kindness and for the hard effort you put into teaching us the material. "], 
    },
        { name: "Michael",
        artists: [" Thank you for your brotherhood. For looking out when we need to focus through class and making sure that we are on track. Thank you for your transparency as a person where you help those around you be comfortable because of your personality. Thank you for your extra tutoring times when you are willing and able to."], 
},
        { name: "Mo",
        artists: ["Thank you for making the material looking easier than it may seem. Thank you for your soft patience towards us and for making the notes from GitHub interesting as we struggle through the material. Thank you for showing up the extra days you do not teach to help us individually."] , 
},
        { name: "Taq",
          artists: ["Thank you for the effort you put in when we provide feedback. Thank you for teaching us at a level where you believe we may grasp if we are to push pass our presumed capabilities. Thank you for your encouragement."] , 
},  
        { name: "Carlos",
        artists: [ " Thank you for your boldness. For taking one for your team when you covered for Taq while he reviewed css for the exam.  "], 
},   
        { name: "Liz",
        artists : [ "Thank you all of the efforts you put. You really go above and beyond for us. You are a really genuine person who through your works your genuineness is shown. I appreciate all of the efforts and care you put into Pursuit. Thank you for building us up. "],
},
{
    name: 'Taq',
    artists: ['You must be tired of us by now but, thank you for your time and patience with us.'],
  },

{
    name: 'Mo',
    artists: ['Thank you for your time and effort'],
  },

{
    name: 'Michael',
    artists: ['Sorry for all the bad code you had to grade'],
  },
    
{
    name: 'Liz',
    artists: ['Best PM of all time!'],
  },
  {name:'Liz',
  artists:[ `Thank you so much for your encouragement and your compassion, for
  being always there to push us forward whenever we are feeling down. `] }, 
  {name:'Taq',
  artists:[ `Thank you for all of your efforts to teach us something new, it takes someone truly passionate to teach the way you do(and for the Munchkins)`] },
  {name: 'Mo', 
  artists:[`Thank you for all of your patience and incredible support you have shown us. Time and time again it goes on to show how much you believe in us`] },
  {name: 'Carlos',
  artists:[ `Thank you for putting things into perspective for us, for being always upfront and keeping things real`] },	 
      
]};

  const objectToHTML = (song) => {
    return `<div class='row mb-2'style='overflow:auto'>
      <div class='col-11'>
        <p class='mb-0 mt-1 song-name style='font-color:black;'>${song.name}</p>
        <p class='my-0 song-artists'>${song.artists}</p>
      </div>
    </div>`;
  }

  const render = (playlist) => {

    const title = document.querySelector('.display-4');
    title.innerText = playlist.name;
  
    const desc = document.querySelector('.lead');
    desc.innerText = playlist.description;
  
    const song_list = document.querySelector('.song-list');
  
    let combinedHTML = '';
  
    for (let i = 0; i < playlist.songs.length; i++) {
      combinedHTML += objectToHTML(playlist.songs[i]);
    }
    song_list.innerHTML = combinedHTML;
    console.log(combinedHTML);
  }
  
  render(playlist);
  
  
  const input = document.querySelector('.js-input');
  input.addEventListener('input', () => {
    
    const newList = {
        name: 'Thank You',
        description: 'See You In 2019!',
    }
  
    let arr = [];
  
    
  
    for (let i = 0; i < playlist.songs.length; i++) {
  
      let sName = playlist.songs[i].name;
      
      let lowerA = playlist.songs[i].artists.toString().toLowerCase();
      let lowerS = sName.toLowerCase();
      let lowerV = input.value.toLowerCase();
  
  
      if (lowerS.includes(lowerV) === true) {
          arr.push(playlist.songs[i]);
      }
  
      else if (lowerA.includes(lowerV) === true) {
        arr.push(playlist.songs[i]);
    }
  
    }
  
    newList['name'] = playlist.name;
    newList['description'] = playlist.description;
    newList['songs'] = arr;
  
  
    render(newList);
  
  });
  