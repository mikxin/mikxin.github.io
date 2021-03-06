var mask = {
    ASTEROID :          0x0001,
    PLAYER_SHIP :       0x0002,
    ENEMY_SHIP :        0x0004,
    STATION :           0x0008,
    PLAYER_BULLETS :    0x0010,
    ENEMY_BULLETS :     0x0020,
    ENEMY_SENSOR:       0x0040,
    STATION_SENSOR:     0x0080,
	BOUNDARY:     		0x0100,
	CRYSTAL_SENSOR:		0x0200,
	CRYSTAL_MASK:		0x030f,
	

    NON_BULLETS :       0x000f,
    ENEMY_TARGETS :     0x001a,
    PLAYER_TARGETS :    0x002d,
    ALL :      		    0x01ff
};  

var listener = new Box2D.Dynamics.b2ContactListener;
listener.BeginContact = function (contact) {

    var fixtureA = contact.GetFixtureA();
    var fixtureB = contact.GetFixtureB();

    //the following line would tell you what two things are colliding
    //console.log(contact.GetFixtureA().GetBody().userData.ID + " " + contact.GetFixtureB().GetBody().userData.ID);	

    //right now I assigned 0's for bodies and 1's for sensors, and 2's for bullets
    //for now the bullets just announce that they hit something

    if (fixtureA.GetUserData() == undefined || fixtureB.GetUserData() == undefined) {
        //console.log("collision includes something that has no ID");
    }
    else if (fixtureA.GetUserData() == 1) {
        fixtureA.GetBody().userData.sensorList.add(fixtureB.GetBody());
        fixtureA.GetBody().userData.sensorDir[fixtureB.GetBody().userData.ID] = fixtureA.GetBody().userData.sensorList.end;
    }
    else if (fixtureB.GetUserData() == 1) {
        fixtureB.GetBody().userData.sensorList.add(fixtureA.GetBody());
        fixtureB.GetBody().userData.sensorDir[fixtureA.GetBody().userData.ID] = fixtureB.GetBody().userData.sensorList.end;
    }
    else if (fixtureA.GetUserData() == 2) {
		particleExplosion(fixtureA.GetBody().GetPosition(), 75);
		var damage = fixtureA.GetBody().userData.power;
        fixtureA.GetBody().userData.damage(damage);
        fixtureB.GetBody().userData.damage(damage);

    }
    else if (fixtureB.GetUserData() == 2) {
		particleExplosion(fixtureB.GetBody().GetPosition(), 75);
		var damage = fixtureB.GetBody().userData.power;
        fixtureA.GetBody().userData.damage(damage);
        fixtureB.GetBody().userData.damage(damage);
    }
    else if ((fixtureA.GetUserData() == 3 && fixtureB.GetUserData() == 4)) {
        fixtureB.GetBody().userData.crystals++;
        destroyList.push(fixtureA.GetBody().userData);
    }
    else if (fixtureA.GetUserData() == 4 && fixtureB.GetUserData() == 3) {
        fixtureA.GetBody().userData.crystals++;
        destroyList.push(fixtureB.GetBody().userData);
    }
	else if (fixtureA.GetUserData() == 9) {
        playerShip.sensorList.add(fixtureB.GetBody());
        playerShip.sensorDir[fixtureB.GetBody().userData.ID] = playerShip.sensorList.end;
    }
    else if (fixtureB.GetUserData() == 9) {
		
        playerShip.sensorList.add(fixtureA.GetBody());
        playerShip.sensorDir[fixtureA.GetBody().userData.ID] = playerShip.sensorList.end;
    }
    else if (fixtureA.GetUserData() == 6 || fixtureB.GetUserData() == 6) {
        gamePaused = true;
        playerDocked = true; 
        //show instructions rather than straight away pop up menu
        alerts.innerHTML = "Your ship is docked. <br/> Press Z for purchase menu <br/> R to resume game";
        
        //purchaseMenu();
    }
	else if (fixtureA.GetUserData() == 7 || fixtureB.GetUserData() == 7) {
        gamePaused = true;
        atGate = true; 
        alerts.innerHTML = "You reach the warp gate. <br/> Press Z for level menu <br/> R to resume game";
        //levelMenu();
    }
	else if (contact.GetFixtureA().GetUserData() == 8) {
        var dir = outOfBoundsDir;
        var key = contact.GetFixtureB().GetBody().userData.ID;
		if(outOfBoundsDir[key]){
			outOfBoundsList.remove(outOfBoundsDir[key]);
			delete outOfBoundsDir[key];
		}
    }
	else if (contact.GetFixtureB().GetUserData() == 8) {
        var dir = outOfBoundsDir;
        var key = contact.GetFixtureA().GetBody().userData.ID;
		if(outOfBoundsDir[key]){
			outOfBoundsList.remove(outOfBoundsDir[key]);
			delete outOfBoundsDir[key];
		}
    }
}
listener.EndContact = function (contact) {
    if (contact.GetFixtureA().GetUserData() == undefined || contact.GetFixtureB().GetUserData() == undefined) {
        //console.log("collision includes something that has no ID");
    }
    else if (contact.GetFixtureA().GetUserData() == 1) {
        var temp = contact.GetFixtureA().GetBody().userData;
        var dir = temp.sensorDir;
        var key = contact.GetFixtureB().GetBody().userData.ID;

        //console.log(key);
        //console.log(dir[key].stored.userData.ID);


        temp.sensorList.remove(dir[key]);
        delete dir[key];
    }
    else if (contact.GetFixtureB().GetUserData() == 1) {
        var temp = contact.GetFixtureB().GetBody().userData;
        var dir = temp.sensorDir;
        var key = contact.GetFixtureA().GetBody().userData.ID;

        //console.log(key);
        //console.log(dir[key].stored.userData.ID);

        temp.sensorList.remove(dir[key]);
        delete dir[key];
    }
    else if (contact.GetFixtureA().GetUserData() == 8) {
		outOfBoundsList.add(contact.GetFixtureB().GetBody());
        outOfBoundsDir[contact.GetFixtureB().GetBody().userData.ID] = outOfBoundsList.end;
    }
	else if (contact.GetFixtureB().GetUserData() == 8) {
		outOfBoundsList.add(contact.GetFixtureA().GetBody());
        outOfBoundsDir[fixtureA.GetFixtureB().GetBody().userData.ID] = outOfBoundsList.end;
    }
	else if (contact.GetFixtureA().GetUserData() == 9) {
        var dir = playerShip.sensorDir;
        var key = contact.GetFixtureB().GetBody().userData.ID;
		if(dir[key]){
			playerShip.sensorList.remove(dir[key]);
			delete dir[key];
		}
    }
    else if (contact.GetFixtureB().GetUserData() == 9) {
        var dir = playerShip.sensorDir;
        var key = contact.GetFixtureA().GetBody().userData.ID;
		if (dir[key]){
			playerShip.sensorList.remove(dir[key]);
			delete dir[key];
		}
    }

}
listener.PostSolve = function(contact, impulse) {
	
}
listener.PreSolve = function(contact, oldManifold) {

}
this.world.SetContactListener(listener);

function makeBoundary(width, height){
	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.3;
	fixDef.isSensor = true;
	fixDef.filter.categoryBits = mask.BOUNDARY;
    fixDef.filter.maskBits = mask.NON_BULLETS;
	fixDef.userData = 8;
	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_staticBody;  //staticBody (never moves)
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(width/2, height/2);
	bodyDef.position.Set(width/2, height/2);
	body = world.CreateBody(bodyDef);
	body.CreateFixture(fixDef);
	outOfBoundsDir = {};
    outOfBoundsList = newDLL();
	return body;
}
	
function makeAsteroidBody(x, y, asteroid) {
    var AsteroidBodyDef = new b2BodyDef;
    AsteroidBodyDef.type = b2Body.b2_dynamicBody;
    AsteroidBodyDef.position.Set(x, y);
    var body = world.CreateBody(AsteroidBodyDef);
    var AsteroidFixDef = new b2FixtureDef;
    AsteroidFixDef.shape = new b2CircleShape(1.0);
    AsteroidFixDef.density = 1.0;
    AsteroidFixDef.friction = 0.5;
    AsteroidFixDef.restitution = 0.1;
	AsteroidFixDef.userData = 0;
	AsteroidFixDef.filter.categoryBits = mask.ASTEROID;
	AsteroidFixDef.filter.maskBits = mask.ALL;
    body.CreateFixture(AsteroidFixDef);
	body.userData = asteroid;
	randomImpulse(body, 4);
    return body;
}

function makeCrystalBody(position, velocity, crystal) {
	var x = position.x;
	var y = position.y;
	x += Math.random();
	y += Math.random();
	var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position.Set(x, y);
    var body = world.CreateBody(bodyDef);
    var fixDef = new b2FixtureDef;
    fixDef.shape = new b2CircleShape(.2);
    fixDef.density = 1.0;
    fixDef.friction = 0.5;
    fixDef.restitution = 0.1;
	fixDef.userData = 3;
	fixDef.filter.categoryBits = mask.ASTEROID;
	fixDef.filter.maskBits = mask.CRYSTAL_MASK;
    body.CreateFixture(fixDef);
	body.userData = crystal;
	body.ApplyImpulse(new b2Vec2(velocity.x*body.GetMass(), velocity.y*body.GetMass()), body.GetWorldCenter());
	body.SetLinearDamping(0.2);
	randomImpulse(body, .3);
	if( position.x < 0 || position.x > width || position.y < 0 || position.y > height){
		outOfBoundsList.add(body);
		outOfBoundsDir[crystal.ID] = outOfBoundsList.end;
    }
    return body;
}

function makeSoldierBody(x, y, soldier) {
    var bodyDef = new b2BodyDef; //create a body Definition
    bodyDef.type = b2Body.b2_dynamicBody;  //set bodyDef to dynamic since this ship will move, we could do static if it doesn't move, or kinematic if it has a predefined movement
    bodyDef.position.x = x;  //add a starting position to the body
    bodyDef.position.y = y;
    var body = world.CreateBody(bodyDef);  //add this b2Body to the world and save a reference to it in playerShip
    var fixDef = new b2FixtureDef; //create a fixture (something to collide with)
    //    fixDef.shape = new b2PolygonShape;  //make that fixture a polygon
    //	fixDef.shape.SetAsBox(0.7, 0.7);  //makes a box, takes parameters( halfWidth, halfHeight ), this means the box will be 0.6 wide and 2 meters high
    fixDef.shape = new b2CircleShape(1.5);
    fixDef.density = 1.0; //how dense is our player ship
    fixDef.friction = 0.5; //how much friction does its surface have
    fixDef.restitution = 0.3; //how much will it bounce when it hits things (from 0 to 1 -> 0 being no bounce)
    fixDef.userData = 0;
    fixDef.filter.categoryBits = mask.ENEMY_SHIP;
    fixDef.filter.maskBits = mask.ALL;
    body.CreateFixture(fixDef); //add the fixture to the playerShip body.  We could add multiple fixtures here for complicated ships

    var fixDef = new b2FixtureDef;
    fixDef.shape = new b2CircleShape(5);
    fixDef.isSensor = true;
    fixDef.userData = 1;
    fixDef.filter.categoryBits = mask.ENEMY_SENSOR;
    fixDef.filter.maskBits = mask.NON_BULLETS;
    body.CreateFixture(fixDef);
    body.userData = soldier;
    return body;
}

function makeScoutBody(x, y, scout) {
    var bodyDef = new b2BodyDef; //create a body Definition
    bodyDef.type = b2Body.b2_dynamicBody;  //set bodyDef to dynamic since this ship will move, we could do static if it doesn't move, or kinematic if it has a predefined movement
    bodyDef.position.x = x;  //add a starting position to the body
    bodyDef.position.y = y;
    var body = world.CreateBody(bodyDef);  //add this b2Body to the world and save a reference to it in playerShip
    var fixDef = new b2FixtureDef; //create a fixture (something to collide with)
    //    fixDef.shape = new b2PolygonShape;  //make that fixture a polygon
    //	fixDef.shape.SetAsBox(0.7, 0.7);  //makes a box, takes parameters( halfWidth, halfHeight ), this means the box will be 0.6 wide and 2 meters high
    fixDef.shape = new b2CircleShape(1);
    fixDef.density = 1.0; //how dense is our player ship
    fixDef.friction = 0.5; //how much friction does its surface have
    fixDef.restitution = 0.3; //how much will it bounce when it hits things (from 0 to 1 -> 0 being no bounce)
    fixDef.userData = 0;
    fixDef.filter.categoryBits = mask.ENEMY_SHIP;
    fixDef.filter.maskBits = mask.ALL;
    body.CreateFixture(fixDef); //add the fixture to the playerShip body.  We could add multiple fixtures here for complicated ships

    var fixDef = new b2FixtureDef;
    fixDef.shape = new b2CircleShape(5);
    fixDef.isSensor = true;
    fixDef.filter.categoryBits = mask.ENEMY_SENSOR;
    fixDef.filter.maskBits = mask.NON_BULLETS;
    fixDef.userData = 1;
    body.CreateFixture(fixDef);
    body.userData = scout;
    return body;
}

function makeTankBody(x, y, tank) {
    var bodyDef = new b2BodyDef; //create a body Definition
    bodyDef.type = b2Body.b2_dynamicBody;  //set bodyDef to dynamic since this ship will move, we could do static if it doesn't move, or kinematic if it has a predefined movement
    bodyDef.position.x = x;  //add a starting position to the body
    bodyDef.position.y = y;
    var body = world.CreateBody(bodyDef);  //add this b2Body to the world and save a reference to it in playerShip
    var fixDef = new b2FixtureDef; //create a fixture (something to collide with)
//    fixDef.shape = new b2PolygonShape;  //make that fixture a polygon
//	fixDef.shape.SetAsBox(0.7, 0.7);  //makes a box, takes parameters( halfWidth, halfHeight ), this means the box will be 0.6 wide and 2 meters high
	fixDef.shape = new b2CircleShape(2);
    fixDef.density = 1.0; //how dense is our player ship
    fixDef.friction = 0.5; //how much friction does its surface have
    fixDef.restitution = 0.3; //how much will it bounce when it hits things (from 0 to 1 -> 0 being no bounce)
	fixDef.userData = 0;
	fixDef.filter.categoryBits = mask.ENEMY_SHIP;
	fixDef.filter.maskBits = mask.ALL;
    body.CreateFixture(fixDef); //add the fixture to the playerShip body.  We could add multiple fixtures here for complicated ships
	
    var fixDef = new b2FixtureDef;
	fixDef.shape = new b2CircleShape(5);
	fixDef.isSensor = true;
	fixDef.filter.categoryBits = mask.ENEMY_SENSOR;
	fixDef.filter.maskBits = mask.NON_BULLETS;
	fixDef.userData = 1;
    body.CreateFixture(fixDef);
	body.userData = tank;
    return body;
}

function makePlayerBody(player) {
    var bodyDef = new b2BodyDef; //create a body Definition
    bodyDef.type = b2Body.b2_dynamicBody;  //set bodyDef to dynamic since this ship will move, we could do static if it doesn't move, or kinematic if it has a predefined movement
    bodyDef.position.x = 5;  //add a starting position to the body
    bodyDef.position.y = 5;
	//bodyDef.fixedRotation = true;  //body can collide but no rotation is imparted upon it
    var body = world.CreateBody(bodyDef);  //add this b2Body to the world and save a reference to it in playerShip
    var fixDef = new b2FixtureDef; //create a fixture (something to collide with)
    fixDef.shape = new b2CircleShape(1.5);  //make that fixture a polygon
    fixDef.density = 0.2; //how dense is our player ship
    fixDef.friction = 0.5; //how much friction does its surface have
    fixDef.restitution = 0.3; //how much will it bounce when it hits things (from 0 to 1 -> 0 being no bounce)
	fixDef.userData = 4;
	fixDef.filter.categoryBits = mask.PLAYER_SHIP;
	fixDef.filter.maskBits = mask.ALL;
    body.CreateFixture(fixDef); //add the fixture to the playerShip body.  We could add multiple fixtures here for complicated ships
	body.userData = player;
	
	fixDef = new b2FixtureDef;
    fixDef.shape = new b2CircleShape(4);
    fixDef.isSensor = true;
    fixDef.filter.categoryBits = mask.CRYSTAL_SENSOR;
    fixDef.filter.maskBits = mask.ASTEROID;
    fixDef.userData = 9;
    body.CreateFixture(fixDef);
    return body;
}

//parameters: owner - the b2Body that fired the bullet
function makeBulletBody(owner, bullet, AI, speed, offset) {
	var angle = owner.body.GetAngle() + offset;
	var vector = {};
	
	var bodyDef = new b2BodyDef; 
    bodyDef.type = b2Body.b2_dynamicBody;  
    bodyDef.position.x = owner.getPosX();
    bodyDef.position.y = owner.getPosY();
	bodyDef.angle = angle;
    var body = world.CreateBody(bodyDef);  
    var fixDef = new b2FixtureDef; 
    fixDef.shape = new b2CircleShape(0.1);
    fixDef.density = 1.0; 
	fixDef.userData = 2;
	
	if (AI){
		vector = autoAimVector(owner.body, playerShip.body, speed);
		//vector.x = playerShip.body.GetPosition().x - owner.body.GetPosition().x;
		//vector.y = playerShip.body.GetPosition().y - owner.body.GetPosition().y;
		fixDef.filter.categoryBits = mask.ENEMY_BULLETS;
		fixDef.filter.maskBits = mask.ENEMY_TARGETS;
	}
	else{
		vector.x = Math.cos(angle) * speed;
		vector.y = Math.sin(angle) * speed;
		fixDef.filter.categoryBits = mask.PLAYER_BULLETS;
		fixDef.filter.maskBits = mask.PLAYER_TARGETS;
	}
	
	vector = vectorAddition(vector, owner.body.GetLinearVelocity());
	
    body.CreateFixture(fixDef); 
	body.ApplyImpulse(new b2Vec2(vector.x*body.GetMass(),vector.y*body.GetMass()), body.GetWorldCenter());
	body.userData = bullet;
    return body;
}

function makeStationBody(station, x, y) {
    var bodyDef = new b2BodyDef; //create a body Definition
    bodyDef.type = b2Body.b2_staticBody;  //set bodyDef to dynamic since this ship will move, we could do static if it doesn't move, or kinematic if it has a predefined movement
    bodyDef.position.x = x;  //add a starting position to the body
    bodyDef.position.y = y;
	bodyDef.angle =  d2r(-45);
	//bodyDef.fixedRotation = true;  //body can collide but no rotation is imparted upon it
    var body = world.CreateBody(bodyDef);  //add this b2Body to the world and save a reference to it in playerShip
    var fixDef = new b2FixtureDef; //create a fixture (something to collide with)
    fixDef.shape = new b2CircleShape(4); //make that fixture a polygon
    fixDef.density = 1.0; //how dense is our player ship
    fixDef.friction = 0.5; //how much friction does its surface have
    fixDef.restitution = 0.3; //how much will it bounce when it hits things (from 0 to 1 -> 0 being no bounce)
	fixDef.userData = 5;
    body.CreateFixture(fixDef); //add the fixture to the playerShip body.  We could add multiple fixtures here for complicated ships
	fixDef.shape = fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(6, .75);
	fixDef.isSensor = true;
	fixDef.filter.categoryBits = mask.STATION_SENSOR;
	fixDef.filter.maskBits = mask.PLAYER_SHIP;
	fixDef.userData = 6;
    body.CreateFixture(fixDef); //add the fixture to the playerShip body.  We could add multiple fixtures here for complicated ships
	body.userData = station;
    return body;
}
function makeJetParticleBody(jetParticle) {
	var angle = playerShip.body.GetAngle();
	var vector = {};
	
	vector.x = Math.cos(angle) * -1;
	vector.y = Math.sin(angle) * -1;
	
	var bodyDef = new b2BodyDef; 
    bodyDef.type = b2Body.b2_dynamicBody;  
    bodyDef.position.x = playerShip.getPosX() + (vector.x * 1.3);
    bodyDef.position.y = playerShip.getPosY() + (vector.y * 1.3);
	bodyDef.angle = angle;
    var body = world.CreateBody(bodyDef);  
    var fixDef = new b2FixtureDef; 
    fixDef.shape = new b2CircleShape(0.1);
    fixDef.density = 1.0; 
	fixDef.isSensor = true;
	fixDef.userData = 8;
	
	vector.x += Math.random();
	vector.y += Math.random();
	
	fixDef.filter.categoryBits = mask.NON_BULLETS;
	fixDef.filter.maskBits = mask.NON_BULLETS;

    body.CreateFixture(fixDef); 
	body.ApplyImpulse(new b2Vec2(vector.x*body.GetMass(),vector.y*body.GetMass()), body.GetWorldCenter());
	body.userData = jetParticle;
    return body;
}

function makeWarpGateBody(warpGate, x, y) {
    var bodyDef = new b2BodyDef; //create a body Definition
    bodyDef.type = b2Body.b2_staticBody;  //set bodyDef to dynamic since this ship will move, we could do static if it doesn't move, or kinematic if it has a predefined movement
    bodyDef.position.x = x;  //add a starting position to the body
    bodyDef.position.y = y;
	//bodyDef.angle =  d2r(-45);
	//bodyDef.fixedRotation = true;  //body can collide but no rotation is imparted upon it
    var body = world.CreateBody(bodyDef);
    var fixDef = new b2FixtureDef;
    fixDef.shape = new b2CircleShape(2); //make that fixture a polygon
    fixDef.density = 1.0; //how dense is our player ship
    fixDef.friction = 0.5; //how much friction does its surface have
    fixDef.restitution = 0.3; //how much will it bounce when it hits things (from 0 to 1 -> 0 being no bounce)
	fixDef.userData = 7;
	fixDef.isSensor = true;
	fixDef.filter.categoryBits = mask.STATION_SENSOR;
	fixDef.filter.maskBits = mask.PLAYER_SHIP;
    body.CreateFixture(fixDef); //add the fixture to the playerShip body.  We could add multiple fixtures here for complicated ships
	body.userData = warpGate;
    return body;
}

function randomImpulse(body, scale){
	body.ApplyImpulse(new b2Vec2((Math.random() - .5)*scale, (Math.random() - .5)*scale), body.GetWorldCenter());
}
