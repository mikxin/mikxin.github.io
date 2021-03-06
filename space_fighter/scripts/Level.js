/******************
* File: Level.js
* Authors: Scott Larson, Joseph Francke, Mik Xin Tan, Dongyoung Cho
* Date: 9 Nov 2012
*******************/

var height;
var width;

//all level setters, getters, creation, etc
function loadLevel( level )
{

	//update current level var
	currentWorld = level;

	//load new level
	switch(level)
		{
			case 1: 
				level1();
				break;
			case 2: 
				level2();
				break;
			case 3:
				level3();
				break;
			default:
			alert("Invalid level number - defaulted to 1");
			level1();
		}
}

function level1()
{

    alerts.innerHTML = "World 1<br/> Good Luck!";
    setTimeout(function(){alerts.innerHTML = ""},3000);
    
    setTimeout(function(){
        alerts.innerHTML = "Buy upgrades to destroy asteroids faster";
        setTimeout(function(){alerts.innerHTML = ""},3000);
        }, 15000);
        
	playerShip.body.SetPosition(new b2Vec2( 10, 10 ));

	width = 60;
	height = 40;
	//create a hard boundary so that objects don't escape the screen

	boundary = makeBoundary(width, height);
	/*
	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.3;
	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_staticBody;  //staticBody (never moves)
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(width, 0.1);
	bodyDef.position.Set(0, 0);
	topWall = world.CreateBody(bodyDef);
	topWall.CreateFixture(fixDef); //top wall
	bodyDef.position.Set(0, height);
	bottomWall = world.CreateBody(bodyDef);
	bottomWall.CreateFixture(fixDef); //bottom wall
	fixDef.shape.SetAsBox(0.1, height);
	bodyDef.position.Set(0, 0);
	leftWall = world.CreateBody(bodyDef);
	leftWall.CreateFixture(fixDef); //left wall
	bodyDef.position.Set(width, 0);
	rightWall = world.CreateBody(bodyDef);
	rightWall.CreateFixture(fixDef); //right
*/
	//debug draw div is 600x400, set draw scale using width

	//setup debug draw
	var debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
		//debug draw div is 600x400, calculate draw scale and fill to width
		debugDraw.SetDrawScale(300.0 / width);  //smaller scale "zooms out"
		debugDraw.SetFillAlpha(0.5);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);

	homeStation = makeStation(10, height / 2);
	portal = makeWarpGate(width - 10, height / 2);
	portal.mesh.position.z = 2;


	enemyList.add(makeEnemy(1, 40, 20));
	enemyList.add(makeEnemy(1, 50, 30));
	enemyList.add(makeEnemy(1, 40, 30));
	enemyList.add(makeEnemy(1, 50, 20));

	//add asteroids
	for(var i = 0; i < 30; ++i) 
	{
	    asteroidList.add(makeAsteroid(Math.random() * width, Math.random() * height));
	}

	//load background image and sprites
	background1(width, height);
}

function level2()
{
    
    alerts.innerHTML = "World 2<br/> One step closer to Earth!";
    setTimeout(function(){alerts.innerHTML = ""},3000);
    
	playerShip.body.SetPosition(new b2Vec2( 10, 10 ));

	width = 120;
	height = 80;

	//create a hard boundary so that objects don't escape the screen

	boundary = makeBoundary(width, height);

	//debug draw div is 600x400, set draw scale using width

	//setup debug draw
	var debugDraw = new b2DebugDraw();3
		debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
		//debug draw div is 600x400, calculate draw scale and fill to width
		debugDraw.SetDrawScale(300.0 / width);  //smaller scale "zooms out"
		debugDraw.SetFillAlpha(0.5);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);

	homeStation = makeStation(10, height / 2);
	portal = makeWarpGate(width - 10, height / 2);
	portal.mesh.position.z = 2;


	enemyList.add(makeEnemy(1, 40, 20));
	enemyList.add(makeEnemy(1, 60, 30));
	enemyList.add(makeEnemy(0, 80, 30));
    enemyList.add(makeEnemy(0, 100, 40));

	enemyList.add(makeEnemy(1, 110, 40));
	enemyList.add(makeEnemy(1, 90, 50));
	enemyList.add(makeEnemy(0, 70, 60));
    enemyList.add(makeEnemy(0, 50, 70));

	//add asteroids
	for(var i = 0; i < 50; ++i) 
	{
	    asteroidList.add(makeAsteroid(Math.random() * width, Math.random() * height));
	}

	//load background image and sprites
	background2(width, height);
}
 
function level3() 
{
    alerts.innerHTML = "World 3<br/> One gate away from Earth!";
    setTimeout(function(){alerts.innerHTML = ""},3000);

	playerShip.body.SetPosition(new b2Vec2( 10, 10 ));

	width = 150;
	height = 100;

	//create a hard boundary so that objects don't escape the screen

	boundary = makeBoundary(width, height);

	//debug draw div is 600x400, set draw scale using width

	//setup debug draw
	var debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
		//debug draw div is 600x400, calculate draw scale and fill to width
		debugDraw.SetDrawScale(300.0 / width);  //smaller scale "zooms out"
		debugDraw.SetFillAlpha(0.5);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);

	homeStation = makeStation(10, height / 2);
	portal = makeWarpGate(width - 10, height / 2);
	portal.mesh.position.z = 2;

	enemyList.add(makeEnemy(1, 20, 25));
	enemyList.add(makeEnemy(1, 30, 65));
    enemyList.add(makeEnemy(1, 40, 85));
	enemyList.add(makeEnemy(1, 50, 45));
    enemyList.add(makeEnemy(1, 60, 5));

	enemyList.add(makeEnemy(0, 70, 5));
	enemyList.add(makeEnemy(0, 80, 45));
	enemyList.add(makeEnemy(0, 90, 85));
	enemyList.add(makeEnemy(0, 100, 65));
	enemyList.add(makeEnemy(0, 110, 25));

	enemyList.add(makeEnemy(2, 130, 10));
	enemyList.add(makeEnemy(2, 130, 90));



	//add asteroids
	for(var i = 0; i < 60; ++i) 
	{
	    asteroidList.add(makeAsteroid(Math.random() * width, Math.random() * height));
	}

	//load background image and sprites
	background3(width, height);
}

function destroyLevel()
{
	//delete current level
	playerShip.sensorDir = {};
    playerShip.sensorList = newDLL();
	asteroidList.empty();    
	enemyList.empty();
	crystalList.empty();
	bulletList.empty();
	homeStation.clean();
	//empty destroy list?
	portal.clean();
	//delete background sprites
	background.remove(spriteGroup);
	world.DestroyBody(boundary);

	//empty box2d world of remaining hard boundaries
	//world.DestroyBody(leftWall);
	//world.DestroyBody(rightWall);
	//world.DestroyBody(topWall);
	//world.DestroyBody(bottomWall);
}