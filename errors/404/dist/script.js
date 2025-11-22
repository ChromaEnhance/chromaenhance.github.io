// Colors and mouth shapes (convertis en coordonnées pour animation CSS)
var 
    furLightColor = "#FFF",
    furDarkColor = "#67b1e0",
    skinLightColor = "#ddf1fa",
    skinDarkColor = "#88c9f2",
    lettersSideLight = "#3A7199",
    lettersSideDark = "#051d2c",
    lettersFrontLight = "#67B1E0",
    lettersFrontDark = "#051d2c",
    lettersStrokeLight = "#265D85",
    lettersStrokeDark = "#031219";

// Mouth chatter timeline - utilise scale au lieu de morph
var chatterTL = gsap.timeline({paused: true, repeat: -1, yoyo: true});
chatterTL
    .to('#mouth', {duration: 0.1, scaleY: 0.8, transformOrigin: "center"}, 0)
    .to('#chin', {duration: 0.1, y: 1.5}, 0);

// Yeti main timeline
var yetiTL = gsap.timeline({paused: true, repeat: -1});
yetiTL
    .call(() => { chatterTL.play(); }, null, 0)
    
    // Arm and flashlight shake
    .to(['#armL', '#flashlightFront'], {duration: 0.075, x: 7}, 2.5)
    .to(['#armL', '#flashlightFront'], {duration: 0.075, x: 0}, 2.575)
    .to(['#armL', '#flashlightFront'], {duration: 0.075, x: 7}, 2.65)
    .to(['#armL', '#flashlightFront'], {duration: 0.075, x: 0}, 2.725)
    .to(['#armL', '#flashlightFront'], {duration: 0.075, x: 7}, 2.8)
    .to(['#armL', '#flashlightFront'], {duration: 0.075, x: 0}, 2.875)

    // Light flicker sequence
    .call(goLight, null, 3.2)
    .call(goDark, null, 3.3)
    .call(goLight, null, 3.4)

    // Pause chatter and change mouth
    .call(() => {
        chatterTL.pause();
        gsap.to('#mouth', {duration: 0.1, scaleY: 1, transformOrigin: "center"});
    }, null, 3.2)

    // Mouth (scale instead of morph), tooth, arm, and eyes animation
    .to('#mouth', {duration: 0.25, scaleY: 0.4, scaleX: 0.8, transformOrigin: "center"}, 5)
    .to('#tooth1', {duration: 0.1, y: -5}, 5)
    .to('#armR', {duration: 0.5, x: 10, y: 30, rotation: 10, transformOrigin: "bottom center", ease: "power1.out"}, 4)
    .to(['#eyeL', '#eyeR'], {duration: 0.25, scaleX: 1.4, scaleY: 1.4, transformOrigin: "center center"}, 5)

    // More light flicker
    .call(goDark, null, 8)
    .call(goLight, null, 8.1)
    .call(goDark, null, 8.3)
    .call(goLight, null, 8.4)
    .call(goDark, null, 8.6)

    // Reset mouth, tooth, arm, and eyes
    .to('#mouth', {duration: 0.25, scaleY: 1, scaleX: 1, transformOrigin: "center"}, 9)
    .to('#tooth1', {duration: 0.1, y: 0}, 9)
    .to('#armR', {duration: 0.5, x: 0, y: 0, rotation: 0, transformOrigin: "bottom center", ease: "power1.out"}, 9)
    .to(['#eyeL', '#eyeR'], {duration: 0.25, scaleX: 1, scaleY: 1, transformOrigin: "center center"}, 9)
    .call(() => { chatterTL.play(); }, null, 9.25)

    // Repeat arm and flashlight shake
    .to(['#armL', '#flashlightFront'], {duration: 0.075, x: 7}, 11.5)
    .to(['#armL', '#flashlightFront'], {duration: 0.075, x: 0}, 11.575)
    .to(['#armL', '#flashlightFront'], {duration: 0.075, x: 7}, 11.65)
    .to(['#armL', '#flashlightFront'], {duration: 0.075, x: 0}, 11.725)
    .to(['#armL', '#flashlightFront'], {duration: 0.075, x: 7}, 11.8)
    .to(['#armL', '#flashlightFront'], {duration: 0.075, x: 0}, 11.875);

// Functions to switch light/dark
function goDark() {
    gsap.set('#light', {visibility: "hidden"});
    gsap.set('.lettersSide', {fill: lettersSideDark, stroke: lettersStrokeDark});
    gsap.set('.lettersFront', {fill: lettersFrontDark, stroke: lettersStrokeDark});
    gsap.set('#lettersShadow', {opacity: 0.05});
    gsap.set('.hlFur', {fill: furDarkColor});
    gsap.set('.hlSkin', {fill: skinDarkColor});
}

function goLight() {
    gsap.set('#light', {visibility: "visible"});
    gsap.set('.lettersSide', {fill: lettersSideLight, stroke: lettersStrokeLight});
    gsap.set('.lettersFront', {fill: lettersFrontLight, stroke: lettersStrokeLight});
    gsap.set('#lettersShadow', {opacity: 0.2});
    gsap.set('.hlFur', {fill: furLightColor});
    gsap.set('.hlSkin', {fill: skinLightColor});
}

// Initialize
goDark();
yetiTL.play();
