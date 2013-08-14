//var engine = startCopperLichtFromFile('3darea', 'copperlichtdata/game_scene.ccbjs');
var curLevel = 0;
var engine = new CL3D.CopperLicht('3darea', false, 60,false);
engine.load('copperlichtdata/' + levels[curLevel].data);
var camera, camAnimator, light;
var scene;
var paused = false;
var newMaterialType;

var context2d;
var loading = true;
var currentlyChatting = false;
var currentChatPos = 0;
var chatUpdated = true;

var win = false;
var lostLevel = false;
var wonLevel = false;
var gameover = false;

var playerCoins = 0;
var playerStars = 0;
var playerLives = 5;
var playerMaxhealth = 100;

var light1, light2;

var screenWidth = 1024, screenHeight = 768;
document.body.style.overflow = "hidden";

var context;

var isSlowTime = false;
var frame = 0;
var slowRatio = 3;

function update() {
    frame = (frame + 1) % 60;
    if (loading) return;
    if (currentlyChatting && chatUpdated) {
        if (currentChatPos < levels[curLevel].chat.length) {
            hud.chatting(levels[curLevel].chat[currentChatPos][0], levels[curLevel].chat[currentChatPos][1]);
        } else {
            //Set level specific things here
            currentlyChatting = false;
            levelStartTime = new Date().getTime();
            if(levels[curLevel].power) setTimeout(castEvilSpell, levels[curLevel].power)
            currentChatPos = 0;
            paused = true;
            setTimeout(function () { paused = false; }, 1000);
        }
        chatUpdated = false;
    }
    if (lostLevel) {
        if (chatUpdated == false) {
            hud.chatting(lostChat[0], lostChat[1]);
            //chatUpdated = false;
        }
        else {
            lostLevel = false;
            hud.resetChat();
            playerLives--;
            restartLevel();
        }
        return;
    }
    if (wonLevel) {
        if (chatUpdated == false) {
            hud.chatting(leveldoneChat[0], leveldoneChat[1]);
        }
        else {
            hud.resetChat();
            wonLevel = false;
            nextLevel();
        }
        return;
    }
    if (gameover) {
        if (chatUpdated == false) {
            hud.chatting(gameoverChat[0], gameoverChat[1]);
        }
        else {
            gameover = false;
            hud.resetChat();
            restartGame();
        }
        return;
    }
    if (win && chatUpdated) {
        if (currentChatPos < levels[curLevel].chat.length) {
            //alert();
            hud.chatting(levels[curLevel].chat[currentChatPos][0], levels[curLevel].chat[currentChatPos][1]);
        }
    }
    if (currentlyChatting || win || lostLevel || wonLevel || gameover) return;
    //if (isSlowTime) alert("");
    if (!isSlowTime || frame % slowRatio == 0) {
        for (var i = 0; i < asteroids.length; i++) {
            asteroids[i].update();
        }
        player.update();
        updateWorld();
        for (var i=0; i< enemies.length; i++)
            enemies[i].update();
        updateBullets();
        updateForCollisions();
    }
	var camPos = player.node.Pos.clone();
	shipLookAt = player.direction.clone();
	shipLookAt.normalize();
	shipLookAt.multiplyThisWithScal(10);
	camPos.addToThis(player.direction.multiplyWithScal(-10));
    camPos.addToThis(new CL3D.Vect3d(0,20,0));
	//camPos.substractFromThis(shipLookAt);
	scene.getActiveCamera().Pos = camPos;
	//light.Pos = scene.getActiveCamera().Pos;
    //camAnimator.lookAt(player.node.Pos);
	//camAnimator.lookAt(player.node.Pos.add(new CL3D.Vect3d(0, 10, 0)));
	camAnimator.lookAt(player.node.Pos.add(player.direction.multiplyWithScal(10)));
	//camAnimator.lookAt(player.node.Pos);
	
}

engine.getRenderer().OnChangeMaterial = function (mattype) {
    var renderer = engine.getRenderer();
    if (renderer && mattype == portal.portalShaderType) {
        portal.update();
    }
    else if (renderer && mattype == airstreams[0].shaderType) {
        for (var i = airstreams.length - 1; i >= 0; i--) {
            airstreams[i].update();
        }
    }
};

function initLevel() {
    //Level specific stuff here
    player.speed = levels[curLevel].speed;
    player.witchDPS = levels[curLevel].witch;
    levelTimer = levels[curLevel].time;
}

// this is called when loading the 3d scene has finished
engine.OnLoadingComplete = function () {
    //context2d = document.getElementById('2dcanvas').getContext('2d');
    //chat("witch", "some text");
    
    scene = engine.getScene();
    if (scene) {
        light1 = new CL3D.LightSceneNode();
        light2 = new CL3D.LightSceneNode();

        hideSceneObjects();
        initWorld();
        initLevel();
        hud = new HUD();
        // also, force the 3d engine to update the scene every frame
        scene.setRedrawMode(CL3D.Scene.REDRAW_EVERY_FRAME);

        camPos = player.node.Pos.clone();
        camPos.X += 21;
        camPos.Y += 20;
        scene.getActiveCamera().Pos = camPos;

        camAnimator = new CL3D.AnimatorCameraFPS(scene.getActiveCamera(), engine);
        camAnimator.onKeyUp = camAnimator.onKeyDown = function (event) { };
        camAnimator.MayMove = false;
        scene.getActiveCamera().addAnimator(camAnimator);
        //camAnimator.setMayMove(false);
        camAnimator.lookAt(player.node.Pos);



        scene.getActiveCamera().addChild(light1);
        scene.getActiveCamera().addChild(light2);
        //scene.getRootSceneNode().addChild(light);
        light1.Pos = scene.getActiveCamera().Pos.add(new CL3D.Vect3d(0, -100, 0));
        light2.Pos = scene.getActiveCamera().Pos.add(new CL3D.Vect3d(0, 150, 0));
        light1.Attenuation = Infinity; // = light2.Attenuation = Infinity;

        scene.AmbientLight.R = scene.AmbientLight.G = scene.AmbientLight.B = 0.5;

        engine.OnAnimate = update;
        loading = false;
        currentlyChatting = true;
        //winGame()
    }
}

function restartLevel() {
    loading = true;
    chatUpdated = true;
    resetKeyboard();
    engine.load('copperlichtdata/' + levels[curLevel].data);
}

function nextLevel() {
    curLevel++;
    playerMaxhealth += 20;
    if (curLevel < levels.length-1) {
        chatUpdated = true;
        resetKeyboard();
        loading = true;
        engine.load('copperlichtdata/' + levels[curLevel].data);
    } else {
        winGame();
    }
}

function restartGame() {
    playerLives = 3;
    curLevel = 0;
    chatUpdated = true;
    resetKeyboard();
    loading = true;
    engine.load('copperlichtdata/' + levels[curLevel].data);
    playerCoins = 0;
    playerStars = 0;
}

function winGame() {
    win = true;
    chatUpdated = true;
}


function unCastEvilSpell() {
    for (var i = airstreams.length - 1; i >= 0; i--) {
        airstreams[i].node.Visible = true;
    }
}

function castEvilSpell() {
    hud.chatting("Avoiiding alll myy traapss I seeee... ", "witch.png");
    setTimeout(hud.chatting, 1700, "HOW DO YOU LIKE THIS?", "witch.png");
    setTimeout(hud.resetChat, 4000);
    setTimeout(actuallyCastIt, 3000);
}
function actuallyCastIt() {
    for (var i = airstreams.length - 1; i >= 0; i--) {
        airstreams[i].node.Visible = false;
    }
    setTimeout(unCastEvilSpell, 5000);
}


