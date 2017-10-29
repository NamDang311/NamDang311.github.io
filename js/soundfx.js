/** Nomal click */
var normalTune = new Audio('../sound/btnclick.wav');


/** Play sound when making selection */
var correctTune = new Audio('../sound/correct.mp3');
var incorrectTune = new Audio('../sound/correct.wav');

$(".correct").on("click touchstart", function (event) {
    correctTune.play();
});
$(".incorrect").on("click touchstart", function (event) {
    incorrectTune.play();
});
