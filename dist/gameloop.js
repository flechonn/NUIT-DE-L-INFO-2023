import { Cloud } from "./cloud.js";
import { gameDate } from "./date.js";
import { Player } from "./player.js";
import { Scenario } from "./scenario.js";
import { healBar } from "./healtbar.js";
import { richessBar } from "./richessebar.js";
import { boneurBar } from "./bonheurbar.js";
import { resourcesBar } from "./ressourcesbar.js";
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var cloud = new Cloud(ctx);
var player = new Player(ctx);
var date = new gameDate(1965, ctx);
var scenario = new Scenario();
var healthBar = new healBar(scenario, document.getElementById("healthFill"));
var richesseBar = new richessBar(scenario, document.getElementById("richesseFill"));
var bonheurBar = new boneurBar(scenario, document.getElementById("bonheurFill"));
var ressourcesBar = new resourcesBar(scenario, document.getElementById("ressourcesFill"));
canvas.width = (window.innerWidth / 10) * 9;
var backgroundImageIndex = 0;
var backgroundImages = [
    "url('images/paysage-1.png')",
    "url('images/paysage-2.png')",
    "url('images/paysage-3.png')",
    "url('images/paysage-4.png')",
    "url('images/paysage-0.png') ",
];
var bg = document.getElementById("changebg");
function cyclebg() {
    console.log("cyclebg");
    document.body.style.backgroundImage = backgroundImages[backgroundImageIndex];
    backgroundImageIndex = (backgroundImageIndex + 1) % backgroundImages.length;
}
bg.addEventListener("click", cyclebg);
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function updateGame() {
    clearCanvas();
    date.drawDate();
    console.log(cloud.isCloudVisible);
    cloud.drawCloud();
    requestAnimationFrame(updateGame);
    healthBar.checkEnd();
    richesseBar.checkEnd();
    bonheurBar.checkEnd();
    ressourcesBar.checkEnd();
}
function makeAChoice(choice) {
    scenario.updateScenario(cloud.getCurrentDilemma(), choice);
    cloud.changeMessage();
    healthBar.changeHealthBar();
    richesseBar.changeRichesseBar();
    bonheurBar.changeBonheurBar();
    ressourcesBar.changeRessourcesBar();
}
var noButton = document.getElementById("noButton");
var yesButton = document.getElementById("yesButton");
noButton.addEventListener("click", cloud.changeMessage.bind(cloud));
yesButton.addEventListener("click", function () {
    healthBar.changeHealthBar();
    healthBar.updateHealthBar();
    richesseBar.changeRichesseBar();
    richesseBar.updateRichesseBar();
    bonheurBar.changeBonheurBar();
    bonheurBar.updateBonheurBar();
    ressourcesBar.changeRessourcesBar();
    ressourcesBar.updateRessourcesBar();
});
yesButton.addEventListener("click", makeAChoice.bind(this, true));
noButton.addEventListener("click", makeAChoice.bind(this, false));
yesButton.addEventListener("click", cloud.changeMessage.bind(cloud));
yesButton.addEventListener("click", date.updateDate.bind(date));
updateGame();
