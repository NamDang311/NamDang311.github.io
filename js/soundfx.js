/** Nomal click */

var normalTune = new Howl({
    src: ['../sound/btnclick.wav'],
});

function buttonSound(){
    normalTune.play();
}
$("button").on("click touchstart", function (event) {
    var throttled = _.throttle(buttonSound, 1000);
    
});

/** Play sound when making selection */
var correctTune = new Audio('../sound/correct.mp3');
var incorrectTune = new Audio('../sound/incorrect.mp3');

$(".correct").on("click touchstart", function (event) {
//    _.throttle(checkSide("true", $(".correct").index(this)), 3000);
    checkSide("true", $(".correct").index(this));
    correctTune.play();
});
$(".incorrect").on("click touchstart", function (event) {
    checkSide("false", $(".incorrect").index(this));
    incorrectTune.play();
});

/** Staging fx*/
var stagingSound = new Howl({
    src: ['../sound/stage.mp3'],
    onend: function () {
        sceneSound_1.play();
    }
});
var sceneSound_1 = new Howl({
    src: ['../sound/soundtracks/1.mp3'],
    onend: function () {
        sceneSound_2.play();
    }
});
var sceneSound_2 = new Howl({
    src: ['../sound/soundtracks/2.mp3'],
     onend: function () {
        sceneSound_3.play();
    }
});
var sceneSound_3 = new Howl({
    src: ['../sound/soundtracks/3.mp3'],
     
});


function playSetSound() {
    stagingSound.play();
}


