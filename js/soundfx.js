/** Nomal click */
var normalTune = new Audio('../sound/btnclick.wav');
$("button").on("click touchstart", function (event) {
    normalTune.play();
});

/** Play sound when making selection */
var correctTune = new Audio('../sound/correct.mp3');
var incorrectTune = new Audio('../sound/correct.wav');
var stagingSound = new Audio('../sound/stage.mp3');
$(".correct").on("click touchstart", function (event) {
    correctTune.play();
});
$(".incorrect").on("click touchstart", function (event) {
    incorrectTune.play();
});

function playSetSound(){
    stagingSound.play();
}