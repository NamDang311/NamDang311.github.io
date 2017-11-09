/* jshint esversion:6 , browser: true */
/*jshint -W030*/

let maxRound = 5;
let currentRound = 1;
var blueScore = 0;
var redScore = 0;
var blueIsSelected = false,
    redIsSelected = false;

/*Preload images*/
var imgs = [];
var preloadState = false;
for (var z = 1; z < 6; z++) {
    imgs.push("../images/red/correct/" + z + ".gif");
    imgs.push("../images/red/incorrect/" + z + ".gif");
    imgs.push("../images/blue/correct/" + z + ".gif");
    imgs.push("../images/blue/incorrect/" + z + ".gif");
}

$.preload(imgs, {
    all: function () {
        preloadState = true;
    }
});


/** Check if video is loaded and remove block screen */
window.addEventListener('load', function () {
    var preloader = document.querySelector('.blockScreen');

    function checkLoad() {
        if (preloadState === true) {
            TweenMax.to(".blockScreen", 0.3, {
                autoAlpha: 0,
            });
        } else {
            setTimeout(checkLoad, 100);
        }
    }
    checkLoad();
}, false);

/** Opening Splash Screen */
$(document).ready(function () {
    TweenMax.fromTo("#startButton", 1, {
        opacity: 0
    }, {
        opacity: 1,
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.5
    });
});


$("#startButton").on("click touchstart", function (event) {
    TweenMax.to(".splashScreen, .splashScreen *", 0.2, {
        autoAlpha: 0,
        delay: 1
    }, 1);
});

$(".guide").on("click touchstart", function (){
    TweenMax.to(".guide", 1, {
        autoAlpha: 0,
        onComplete: setStage
    }, 1);
});

// First ready-go stage motion
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

            //run countdown 
            countdown.play();
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


//var animation = bodymovin.loadAnimation({
//    container: document.getElementById('loadingContainer'), // the dom element that will contain the animation
//    renderer: 'svg',
//    loop: true,
//    autoplay: true,
//    path: 'data/loading.json' // the path to the animation json
//});

//Set grid
var $grid = $('.grid').isotope({
    getSortData: {
        number: '.number'
    },
    layoutMode: 'fitRows',
    fitRows: {
        gutter: 20
    },
    transitionDuration: '0.2s',
    sortBy: 'random'
});

$grid.isotope('updateSortData').isotope();


//****Shuffle randomly
setInterval(function () {
    $grid.isotope('shuffle');
}, 1000);

/** Countries Database */
var countries = ["", "russia", "china", "cuba", "indonesia", "morocco", "estonia"];

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
    newArrImg = _.sample(_.range(1, 254), 6);
    for (var i = 2; i < 5; i++) {
        $(".selection-blocks-" + i).css("background-image", "url(../images/flags/random/" + newArrImg[i] + ".png)");
    }
}
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
            countdown.pause();
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
            countdown.pause();
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
    if (numberOfWrong === 0) {
        numberOfWrong++;
    } else {
        _.delay(setNextRound, 4000);
         countdown.pause();
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
    $(".block-area-bottom img").attr(`src`, `../images/placeholder.png`);
    $(".block-area-top img").attr(`src`, `../images/placeholder.png`);

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
roundDeclare.to(".roundAnnouncement", 0, {
    autoAlpha: 1,
    onComplete: resetSideBlock
}).from("#roundCall", 0.2, {
    y: "-=500%"
}).to("#roundCall", 0.2, {
    y: "+=500%"
}, "+=1").to(".roundAnnouncement", 0.4, {
    autoAlpha: 0,
    onComplete: function () {
        countdown.play(0);
    }
});

var finishGame = new TimelineMax({
    paused: true
});
TweenMax.set("#finalCall", {
    autoAlpha: 0
});
finishGame.to(".roundAnnouncement", 0.4, {
    autoAlpha: 1,
}).to("#finalCall", 4, {
    autoAlpha: 1
}, "+=1.5");

var countdown = new TimelineMax({
    paused: true,
});
countdown.fromTo("#countdown", 10, {
    width: "0"
}, {
    width: "100%",
    ease: Power0.easeNone,
    onComplete: setNextRound
});

var endingSound = new Howl({
    src: ['../sound/roundwinner.mp3'],
     
});

function playEndSound(){
    sceneSound_1.stop();
    sceneSound_2.stop();
    sceneSound_3.stop();
    endingSound.play();
}
function setNextRound() {
    countdown.stop(0);
    if (currentRound === maxRound) {
        // if max round reached, declare winner
        if (redScore > blueScore) {
            $("#finalCall").html("Winner<br/>Red Team");
            $("#finalCall").addClass("redColor");
            finishGame.play(0);
            playEndSound();
        } else {
            if (redScore == blueScore) {
                $("#finalCall").html("<br/>DRAW");
                finishGame.play(0);
                playEndSound();

            } else {
                $("#finalCall").html("Blue Team<br/>Win");
                $("#finalCall").addClass("blueColor");
                finishGame.play(0);
                playEndSound();
            }
        }

    } else {
        //continue next round
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
