function Airship(name) {	
    var self = this;
    this.node = scene.getSceneNodeFromName(name); //.createClone(scene.getSceneNodeFromName(name).getParent());
	this.node.Visible = true;
	
	this.velocity = new CL3D.Vect3d(0,0,0);
	this.direction = new CL3D.Vect3d(0, 0, 1);

	this.speed = 1;
	this.hzSpeed = 0.5;
	this.rotSpeed = 3;
    this.dragFactor = 0.98;

    this.turnFactor = 0.01;
    self.toTurn = false;
    this.curStreamIndex = 1;

    this.health = playerMaxhealth;
    this.mana = 100;
    this.lastManaUpdate = 0.0;
    this.stars = 0;
    this.curPulse = null;

    this.witchDPS = 0.3;

    this.justHitAsteroid = false;

    this.invunrable = false;
    scene.getSceneNodeFromName('forcefield1').Visible = false;
    this.shield = scene.getSceneNodeFromName('forcefield1').createClone(this.node); ;
    this.shield.Visible = false;

    this.handleInput = function () {
        var left = self.direction.crossProduct(new CL3D.Vect3d(0, 1, 0));
        var rot = self.direction.getHorizontalAngle();
        left.multiplyThisWithScal(self.hzSpeed);

        if (KB.isKeyDown['W'] && player.node)
            self.node.Pos.addToThis(self.direction);

        if (KB.isKeyDown['Q'] && player.node) {
            self.node.Rot.Y -= self.rotSpeed;
        }

        if (KB.isKeyDown['E'] && player.node) {
            self.node.Rot.Y += self.rotSpeed; ;
        }

        //This is the getString result of pressing left arrow
        if (KB.isKeyDown['%'] && player.node)
            self.node.Pos.addToThis(left);

        if (KB.isKeyDown['S'] && player.node)
            self.node.Pos.substractFromThis(self.direction); ;

        //This is the getString result of pressing right arrow
        if (KB.isKeyDown['\''] && player.node)
            self.node.Pos.addToThis(left.multiplyWithScal(-1));

        if (KB.isKeyDown[' '] && player.node && self.mana > 0) {
            var bulletBounds = new CL3D.Box3d();
            bulletBounds.addInternalPointByVector(self.node.Pos);
            bulletBounds.addInternalPointByVector(self.node.Pos.add(new CL3D.Vect3d(100, 0, 0)));
            bulletBounds.addInternalPointByVector(self.node.Pos.add(new CL3D.Vect3d(-100, 0, 0)));
            bulletBounds.addInternalPointByVector(self.node.Pos.add(new CL3D.Vect3d(0, 0, 100)));
            bulletBounds.addInternalPointByVector(self.node.Pos.add(new CL3D.Vect3d(0, 0, -100)));
            shoot(self, self.node.Pos.clone(), self.direction.clone(), bulletBounds);
            self.mana -= 6;
        }

        if (KB.isKeyDown['1'] && player.node && playerCoins >= cost['coin'] && self.invunrable == false) {
            self.invunrable = true;
            playerCoins -= cost['coin'];
            self.shield.Visible = true;
            setTimeout(self.resetInvulnerability, 5000);
        }

        if (KB.isKeyDown['2'] && player.node && playerCoins >= cost['slow']) {
            playerCoins -= cost['slow'];
            isSlowTime = true;
            setTimeout(function () { isSlowTime = false; }, 3000);
        }

        if (KB.isKeyDown['3'] && player.node && playerCoins >= cost['pulse'] && self.curPulse == null) {
            playerCoins -= cost['pulse'];
            self.curPulse = new Pulse(self.node.Pos);
        }

    }

    this.updateVelocity = function () {
        var insideStream = false;
        if (self.curStreamIndex < airstreams.length - 1 && airstreams[self.curStreamIndex].node.getTransformedBoundingBox().isPointInside(self.node.Pos)) {
            insideStream = true;
            if (self.toTurn && self.velocity.dotProduct(airstreams[self.curStreamIndex].direction) / player.speed < 0.95) {
                self.velocity.multiplyThisWithScal(1 - self.turnFactor);
                self.velocity.addToThis(airstreams[self.curStreamIndex].direction.multiplyWithScal(self.speed * self.turnFactor));
            }
            else
                self.velocity = airstreams[self.curStreamIndex].direction.multiplyWithScal(self.speed);
        }
        else if (self.curStreamIndex < airstreams.length - 2 && airstreams[self.curStreamIndex + 1].node.getTransformedBoundingBox().isPointInside(self.node.Pos)) {
            self.curStreamIndex++;
            insideStream = true;
        }
        else {
            for (var i = airstreams.length - 1; i >= 0; i--) {
                if (airstreams[i].node.getTransformedBoundingBox().isPointInside(self.node.Pos)) {
                    self.velocity = airstreams[i].direction.multiplyWithScal(self.speed);
                    insideStream = true;
                    break;
                }
            }
        }
        if (!insideStream) {
            self.velocity.multiplyThisWithScal(self.dragFactor);
            self.decreaseHealth(this.witchDPS);
        }
    }

    this.update = function () {
        if (paused) {
            return;
        }

        if (airstreams && !self.justHitAsteroid) {
            self.updateVelocity();
        }
        self.node.Pos.addToThis(self.velocity);

        self.handleInput();

        var mat = new CL3D.Matrix4(true);
        mat.setRotationDegrees(self.node.Rot);
        self.direction.X = 0;
        self.direction.Y = 0;
        self.direction.Z = 1;
        mat.rotateVect(self.direction);

        for (var i = 0; i < collectibles.length; i++) {
            if (this.node.getTransformedBoundingBox().intersectsWithBox(collectibles[i].node.getTransformedBoundingBox()) && collectibles[i].node.Visible == true) {
                if (collectibles[i].type == "health") {
                    self.increaseHealth(20);
                } else if (collectibles[i].type == "mana") {
                    self.increaseMana(10);
                } else if (collectibles[i].type == "star") {
                    playerStars++;
                } else if (collectibles[i].type == "coin") {
                    playerCoins+=5;
                }
                collectibles[i].node.Visible = false;
            }

        }

        for (var i = 0; i < asteroids.length; i++) {
            if (self.node.getTransformedBoundingBox().intersectsWithBox(asteroids[i].node.getTransformedBoundingBox()) && asteroids[i].node.Visible == true) {
                //asteroids[i].node.Visible = false;

                if (!self.justHitAsteroid) {
                    self.justHitAsteroid = true;
                    self.decreaseHealth(25);
                    self.velocity.multiplyThisWithScal(-1);
                    setTimeout(function () { self.justHitAsteroid = false; }, 500)
                }
                else {
                    self.velocity.multiplyThisWithScal(0.8);
                }
                self.node.updateAbsolutePosition();
            }
        }

        //Increase the mana at 1 mana per second
        var date = new Date()
        if (date.getTime() - self.lastManaUpdate > 1.5 && !KB.isKeyDown[' ']) {
            self.lastManaUpdate = date.getTime();
            self.increaseMana(1);
        }

    }

	this.onClick = function () {

	    //alert("airship"+"  " + clickedButton);
	    if (clickedButton == LEFT_BUTTON)
	        ;
	    else if (clickedButton == RIGHT_BUTTON) {
	        ;
	    }
	}

	this.increaseHealth = function (value) {
	    self.health = Math.min(100, self.health + value);
	}

    this.decreaseHealth = function (value) {
        if (!self.invunrable) {
            self.health = Math.max(0, self.health - value);
        }
    }

    this.increaseMana = function (value) {
        self.mana = Math.min(100, self.mana + value);
    }


	this.animator = new CL3D.Animator();
	this.node.addAnimator(this.animator);

	this.gotShot = function (shooter, bullet) {
	    if (shooter != self && !self.invunerable) {
	        self.decreaseHealth(bullet.damage);
	    }
	}

	this.resetInvulnerability = function () {
	    self.invunrable = false;
	    self.shield.Visible = false;
	}

	this.mouseDown = function (x, y) {
	}

}



