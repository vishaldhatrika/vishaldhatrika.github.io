var tt_playing=false;
var cp_playing=false;

var techToolsGlide = new Glide('#glideTechTools',{
      type: 'carousel',
      animationTimingFunc: 'linear',
      animateDuration: 1500,
      hoverpause: false,
      autoplay: 1500,
      perView: 7,
      peek: {
            before: 0,
            after: 0
      },
      breakpoints: {
            1450: {
                  perView: 6,
            },
            1300: {
                  perView: 5,
            },
            1000: {
                  perView: 4,
            },
            835: {
                  perView: 3,
            },
            670: {
                  perView: 2,
            },
            500: {
                  perView: 1,
            }
      }
}).mount();
tt_playing=true;


var codeProfGlide = new Glide('#glideCodeProfiles',{
      type: 'carousel',
      animationTimingFunc: 'linear',
      animateDuration: 1500,
      hoverpause: false,
      autoplay: 1500,
      perView: 7,
      peek: {
            before: 0,
            after: 0
      },
      breakpoints: {
            1450: {
                  perView: 6,
            },
            1300: {
                  perView: 5,
            },
            1000: {
                  perView: 4,
            },
            835: {
                  perView: 3,
            },
            670: {
                  perView: 2,
            },
            500: {
                  perView: 1,
            }
      }
}).mount();
cp_playing=true;

var cpBtn = document.querySelector("#toggleCodingProfAutoplay").addEventListener("click",function (e) {
      var complete=false;
      if( !complete && cp_playing==true){
            cp_playing=false;
            codeProfGlide.pause();
            e.target.innerText = 'play_circle';
            complete=true;
      }
      if(!complete && cp_playing==false){
            cp_playing=true;
            codeProfGlide.play();
            e.target.innerText = 'pause_circle';
            complete=true;
      }
});

var ttBtn = document.querySelector("#toggleTechToolsAutoplay").addEventListener("click",function (e) {
      var complete=false;
      if( !complete && tt_playing==true){
            tt_playing=false;
            techToolsGlide.pause();
            e.target.innerText = 'play_circle';
            complete=true;
      }
      if(!complete && tt_playing==false){
            tt_playing=true;
            techToolsGlide.play();
            e.target.innerText = 'pause_circle';
            complete=true;
      }
});