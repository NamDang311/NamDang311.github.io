/** Nomal click */

var normalTune = new Howl({
    src: ['../sound/btnclick.wav'],
});

$("button").on("click touchstart", function (event) {
    normalTune.play();
});

/** Play sound when making selection */
var correctTune = new Audio('../sound/correct.mp3');
var incorrectTune = new Audio('../sound/incorrect.mp3');

$(".correct").on("click touchstart", function (event) {
    checkSide("true", $(".correct").index(this));
    correctTune.play();
});
$(".incorrect").on("click touchstart", function (event) {
    checkSide("false", $(".incorrect").index(this));
    console.log($(".incorrect").index(this));
    incorrectTune.play();
});

/** Staging fx*/
var stagingSound = new Howl({
    src: ['../sound/stage.mp3'],
    onend: function () {
        sceneSound_1.play();
        // Kill readyStage overlay
//        $(".readyStage").hide();
    }
});
var sceneSound_1 = new Howl({
    src: ['../sound/soundtracks/1.mp3'],
});

function playSetSound() {
    stagingSound.play();
}

