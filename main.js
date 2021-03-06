const Snowflake = (function () {
    var flakes;
    const flakesTotal = 250;
    const wind = 0;
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

    Snowflake.prototype.move = function () {
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

        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        this.hit = !this.melt && this.y < mouseY && dx * dx + dy * dy < 2400;
    };

    Snowflake.prototype.draw = function () {
        this.div.style.transform =
            this.div.style.MozTransform =
            this.div.style.webkitTransform =
            'translate3d(' + this.x + 'px' + ',' + this.y + 'px,0)';
    };

    function update() {
        for (let i = flakes.length; i--;) {
            const flake = flakes[i];
            flake.move();
            flake.draw();
        }
        requestAnimationFrame(update);
    }

    Snowflake.init = function (container) {
        flakes = [];

        for (let i = flakesTotal; i--;) {
            const size = (Math.random() + 0.2) * 12 + 1;
            const flake = new Snowflake(
                size,
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight,
                Math.random() - 0.5,
                size * 0.3
            );
            container.appendChild(flake.div);
            flakes.push(flake);
        }

        container.onmousemove = function (event) {
            mouseX = event.clientX;
            mouseY = event.clientY;
            wind = (mouseX - window.innerWidth / 2) / window.innerWidth * 6;
        };

        container.ontouchstart = function (event) {
            mouseX = event.targetTouches[0].clientX;
            mouseY = event.targetTouches[0].clientY;
            event.preventDefault();
        };

        window.ondeviceorientation = function (event) {
            if (event) {
                wind = event.gamma / 10;
            }
        };

        update();
    };

    return Snowflake;

}());

window.onload = function () {
    setTimeout(function () {
        Snowflake.init(document.getElementById('snow'));
    }, 500);
}

const thanks = {
    name: 'Thank You',
    description: 'See You In 2019!',
    dedications: [{
            name: "Joyce",
            message: [" Thank you for your patience when I’ve asked to not give up on me while I try to push further. Thank you for your kindness and for the hard effort you put into teaching us the material. "],
        },
        {
            name: "Michael",
            message: [" Thank you for your brotherhood. For looking out when we need to focus through class and making sure that we are on track. Thank you for your transparency as a person where you help those around you be comfortable because of your personality. Thank you for your extra tutoring times when you are willing and able to."],
        },
        {
            name: "Mo",
            message: ["Thank you for making the material looking easier than it may seem. Thank you for your soft patience towards us and for making the notes from GitHub interesting as we struggle through the material. Thank you for showing up the extra days you do not teach to help us individually."],
        },
        {
            name: "Taq",
            message: ["Thank you for the effort you put in when we provide feedback. Thank you for teaching us at a level where you believe we may grasp if we are to push pass our presumed capabilities. Thank you for your encouragement."],
        },
        {
            name: "Carlos",
            message: [" Thank you for your boldness. For taking one for your team when you covered for Taq while he reviewed css for the exam.  "],
        },
        {
            name: "Liz",
            message: ["Thank you all of the efforts you put. You really go above and beyond for us. You are a really genuine person who through your works your genuineness is shown. I appreciate all of the efforts and care you put into Pursuit. Thank you for building us up. "],
        },
        {
            name: 'Taq',
            message: ['You must be tired of us by now but, thank you for your time and patience with us.'],
        },

        {
            name: 'Mo',
            message: ['Thank you for your time and effort'],
        },

        {
            name: 'Michael',
            message: ['Sorry for all the bad code you had to grade'],
        },

        {
            name: 'Liz',
            message: ['Best PM of all time!'],
        },
        {
            name: 'Liz',
            message: [`Thank you so much for your encouragement and your compassion, for
  being always there to push us forward whenever we are feeling down. `]
        },
        {
            name: 'Taq',
            message: [`Thank you for all of your efforts to teach us something new, it takes someone truly passionate to teach the way you do(and for the Munchkins)`]
        },
        {
            name: 'Mo',
            message: [`Thank you for all of your patience and incredible support you have shown us. Time and time again it goes on to show how much you believe in us`]
        },
        {
            name: 'Carlos',
            message: [`Thank you for putting things into perspective for us, for being always upfront and keeping things real`]
        },
        {
            name: 'Everyone',
            message: ["Thanks you for all your hardwork and support, here's a great new year. Happy Holidays!"],
        },
        {
            name: 'Susana',
            message: ["Thank you for the conversations that we've had and all your advice you 've given me"],
        }, {
            name: 'Taq',
            message: ['Over the last couple of months it has been inspiring to learn from someone with such passion'],
        }, {
            name: 'Liz',
            message: ['Your support and care for everyone in class has indispensable for our success and I am grateful to have you as our PM '],
        }, {
            name: 'Susana',
            message: ['Thanks For Your Encouragement & Support Throughout These First 3 Months'],
        },
        {
            name: 'Michael',
            message: ["Another sorry for the bad code you've had to grade, unless it gave you some laughs.  Thanks for keeping a poker face no matter what I say"],
        },
        {
            name: 'Carlos',
            message: ['Much appreciation for your dedication and empathy in helping me outside of class.'],
        },
        {
            name: 'Carlos',
            message: ['Thanks for being friendly and keeping a postive and charismatic attitude in our learning environment. We feel like you are not just our TA, but a friend that we can trust and more importantly share corny jokes with and still get a postive reaction. Thank you for being a part of our community']
        },
        {
            name: 'To Everyone',
            message: ["To Everyone, Thank you for your time, energy and support. The past 3 months has been an amazing journey and I wouldn't trade this experience for anything."]
        },
        {
            name: 'Liz',
            message: ['Thank you for being the best PM and for all your continuous support. Pursuit would not be the same without you!'],
        },
        {
            name: 'Susana',
            message: ['Thank you for being one bawse ass bitch! Very grateful for your presence!'],
        },
        {
            name: 'Michael',
            message: ['Thank for your calm and patient approach to code! Thanks for your time and your advice!'],
        },
        {
            name: 'Joyce',
            message: ['Thanks for all your encouragement and reminders to trust in myself. I’m so grateful to have you as a TA. You’re a bawse!'],
        },
        {
            name: 'Carlos',
            message: ['Thank you for all the extra hours you put in trying to help us understand the material. You’re a real one!'],
        },
        {
            name: 'Taq',
            message: ['Thank you so much for all the insight you provide. We’re lucky to be able to learn from you!'],
        },
        {
            name: 'Mo',
            message: ['Thank you for always trying to break everything down for us into simple terms. You’re very reassuring and it’s much appreciated!'],
        },
    ]
};

const objectToHTML = (dedications1) => {
    return `<div class='row mb-2'style='overflow:auto'>
      <div class='col-11'>
        <p class='mb-0 mt-1 song-name' style="font-weight:bold">${dedications1.name}</p>
        <p class='my-0 song-artists'>${dedications1.message}</p>
      </div>
    </div>`;
}

const render = (thanks) => {

    const title = document.querySelector('.display-4');
    title.innerText = thanks.name;

    const desc = document.querySelector('.lead');
    desc.innerText = thanks.description;

    const song_list = document.querySelector('.thanks-list');

    let combinedHTML = '';

    for (let i = 0; i < thanks.dedications.length; i++) {
        combinedHTML += objectToHTML(thanks.dedications[i]);
    }
    song_list.innerHTML = combinedHTML;
    console.log(combinedHTML);
}

render(thanks);


const input = document.querySelector('.js-input');
input.addEventListener('input', () => {

    const newList = {
        name: 'Thank You',
        description: 'See You In 2019!',
    }

    let arr = [];



    for (let i = 0; i < thanks.dedications.length; i++) {

        let sName = thannks.dedications[i].name;

        let lowerA = thanks.dedications[i].message.toString().toLowerCase();
        let lowerS = sName.toLowerCase();
        let lowerV = input.value.toLowerCase();


        if (lowerS.includes(lowerV) === true) {
            arr.push(thanks.dedications[i]);
        } else if (lowerA.includes(lowerV) === true) {
            arr.push(thanks.dedications[i]);
        }

    }

    newList['name'] = thanks.name;
    newList['description'] = thanks.description;
    newList['songs'] = arr;


    render(newList);

});