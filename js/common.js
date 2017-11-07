/* jshint esversion:6 , browser: true */
/*jshint -W030*/

let maxRound = 5
let currentRound = 1;
var blueScore = 0;
var redScore = 0;
var blueIsSelected = false,
    redIsSelected = false;

function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    cancelFullScreen.call(doc);
  }
}


/** Check if video is loaded and remove block screen */
window.addEventListener('load', function () {
    var video = document.querySelector('#bgvid');
    var preloader = document.querySelector('.blockScreen');

    function checkLoad() {
        if (video.readyState === 4) {
            TweenMax.to(".blockScreen", 0.3, {
                autoAlpha: 0,
                delay: "1"
            });
            toggleFullScreen();
            document.body.requestFullscreen();
        } else {
            setTimeout(checkLoad, 100);
        }
    }
    checkLoad();
}, false);

/** Opening Splash Screen */
$(document).ready(function () {
    TweenMax.fromTo("#introTypo", 1, {
        scale: 0,
        y: "+=300px"
    }, {
        scale: 1,
        y: "-=300px",
        delay: "2",
        ease: Power4.easeOut
    });
});


$("#startButton").on("click touchstart", function (event) {
    TweenMax.to(".splashScreen, .splashScreen *", 0.2, {
        autoAlpha: 0,
        delay: 1
    }, 1);
    TweenMax.to(".guide", 1, {
        autoAlpha: 0,
        delay: 5,
        onComplete: setStage
    }, 1);
});

var readyGoText = new TimelineMax({});

function setStage() {
    playSetSound();
    readyGoText.to("#readyTitle", 0.4, {
        transform: "translateZ(0)"
    }).to("#readyTitle", 0.2, {
        opacity: 0
    }, "+=1").to("#goTitle", 0.4, {
        transform: "translateZ(0)"
    }).to("#goTitle", 0.4, {
        opacity: 0,
        onComplete: function () {
            TweenMax.to(".readyStage", 0.3, {
                autoAlpha: 0
            });
        }
    }, "+=1");
}
readyGoText.set(".readyStage", {
    perspective: 1000
}).set("#readyTitle", {
    transform: "translateZ(3700px)"
}).set("#goTitle", {
    transform: "translateZ(3700px)"
});


var animation = bodymovin.loadAnimation({
    container: document.getElementById('loadingContainer'), // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'data/loading.json' // the path to the animation json
});

//Set grid
var $grid = $('.grid').isotope({
    getSortData: {
        number: '.number'
    },
    layoutMode: 'fitRows',
    fitRows: {
        gutter: 10
    },
    transitionDuration: '0.2s',
    sortBy: 'random'
});

$grid.isotope('updateSortData').isotope();


//****Shuffle randomly
setInterval(function () {
    $grid.isotope('shuffle');
}, 1000);

/** Database -> Set base for set 1/2 */
var countries = ["australia", "brazil", "china", "germany", "great britain", "india", "Iran", "Kenya", "New Zealand", "Pakistan", "Poland", "Russia", "South Africa", "Ukraine", "Vietnam"];

//Title
$(".country-title").html(countries[currentRound]);

//1st - Load correct image
var currentimgName = countries[currentRound].replace(" ", "%20");
function loadCorrectImg() {
    $(".correct").css("background-image", "url(../images/flags/" + currentimgName + ".png)");
}
loadCorrectImg();

//Load random images
var newArrImg;

function loadRandomImg() {
    newArrImg = _.sample(_.range(1,195), 6);
    console.log (newArrImg);
    for (var i = 2; i < 5; i++) {
        $(".selection-blocks-" + i).css("background-image", "url(../images/flags/random/" + newArrImg[i] + ".png)");
    }
};
loadRandomImg();
/** Score system */


function updateScore() {
    $(".red-score").html(redScore);
    $(".blue-score").html(blueScore);
}

//Load random images -- BLUE : sideNumber = 0, RED : sideNumber = 1  
var numberOfWrong = 0;

function checkSide(value, sideNumber) {
    if (value == "true") { //If click correct option
        if (sideNumber === 0) { //On blue side 
            // Add score
            blueScore++;
            updateScore();
            blueIsSelected = !blueIsSelected;

            // Correct annnounce
            showBlueBlock("correct");
            showRedBlock("incorrect", 0);

            //Move next around
            _.delay(setNextRound, 4000);

        } else { // On red side
            // Add score
            redScore++;
            updateScore();
            redIsSelected = !redIsSelected;

            // Correct annnounce
            showRedBlock("correct");
            showBlueBlock("incorrect", 0);

            //Move next around
            _.delay(setNextRound, 4000);
        }
    } else { //If click incorrect option
        if (sideNumber < 3) { //On blue side
            showBlueBlock("incorrect");
            checkNumberOfWrong();
        } else { //On red side
            showRedBlock("incorrect");
            checkNumberOfWrong();
        }
    }
}

function checkNumberOfWrong() {
    if (numberOfWrong == 0) {
        numberOfWrong++;
    } else {
        _.delay(setNextRound, 4000);
        numberOfWrong = 0;
    }

}

/** Correct/Incorrect Announcement */
function showBlueBlock(checkResult, showImage) {
    if (showImage === 0) {

    } else {
        $(".block-area-top img").attr(`src`, `../images/blue/${checkResult}/${currentRound}.gif`);
    }
    $(".block-area-top").addClass("top-half");
    if (checkResult === "correct") {
        $(".block-area-top").addClass("correctColor");
    } else {
        $(".block-area-top").addClass("incorrectColor");
    }
}

function showRedBlock(checkResult, showImage) {
    if (showImage === 0) {

    } else {
        $(".block-area-bottom img").attr(`src`, `../images/red/${checkResult}/${currentRound}.gif`);
    }

    $(".block-area-bottom").addClass("bottom-half");
    if (checkResult == "correct") {
        $(".block-area-bottom").addClass("correctColor");
    } else {
        $(".block-area-bottom").addClass("incorrectColor");
    }
}

function resetSideBlock() {
    //Clear img src
    $(".block-area-bottom img").attr(`src`, `#`);
    $(".block-area-top img").attr(`src`, `#`);

    //Clear side block
    $(".block-area-top").removeClass('correctColor incorrectColor top-half');
    $(".block-area-bottom").removeClass('correctColor incorrectColor bottom-half');
}

/** Check if team has made selection */
var roundDeclare = new TimelineMax({
    paused: true
});

TweenMax.set(".roundAnnouncement", {
    autoAlpha: 0
});
roundDeclare.to(".roundAnnouncement", 0.4, {
    autoAlpha: 1,
    onComplete: resetSideBlock
}).from("#roundCall", 0.2, {
    y: "-=450%"
}).to("#roundCall", 0.2, {
    y: "+=450%"
}, "+=1").to(".roundAnnouncement", 0.4, {
    autoAlpha: 0
});

var finishGame = new TimelineMax ({paused:true});
TweenMax.set("#finalCall", {
    autoAlpha: 0
});
finishGame.to(".roundAnnouncement", 0.4, {
    autoAlpha: 1,
}).to("#finalCall",4,{autoAlpha:1},"+=1.5");

function setNextRound() {
    if (currentRound === maxRound) {
        // if max round reached, declare winner
        if (redScore > blueScore){
        $("#finalCall").html("Winner<br/>Red Team");
          $("#finalCall").addClass("redColor");  
        finishGame.play(0);
        } else {
            $("#finalCall").html("Blue Team<br/>Win");
             $("#finalCall").addClass("blueColor"); 
        finishGame.play(0);
        }
        
    } else {
        //continue
        currentRound++;
        $("#roundCall").html("Round " + currentRound);
        roundDeclare.play(0);
        currentimgName = countries[currentRound].replace(" ", "%20");
        $(".country-title").html(countries[currentRound]);
        loadCorrectImg();
        loadRandomImg();
        resetSelectedStatus();
    }
}

function resetSelectedStatus() {
    blueIsSelected = false;
    redIsSelected = false;
}
