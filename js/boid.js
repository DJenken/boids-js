class Boid {
	constructor(px,py){	
		this.friendZone			= 50;
		this.comfortZone 		= 10;
		this.correctionVelocity = 10;
		this.keepUpFraction		= 8;
		this.topSpeed			= 5;
		this.flock 				= [];

		this.vel 			= V2.Random(this.topSpeed);
		this.pos 			= new V2(px,py);
		this.rot 			= new V2(0,0);

		this.canvas = $('#canvas')[0];
	}

	Update(boids){
		this.flock = this.GetFlock(boids);
		this.Move();
	}

	Draw(context){
		context.fillRect(Math.floor(this.pos.x),Math.floor(this.pos.y),3,3);
	}

	GetFlock(boids){
		let myFlock = [];
		for(let i = 0; i < boids.length; i++){
			if(boids[i] == this){
				continue;
			}
			if(V2.Distance(boids[i].pos, this.pos) < this.friendZone){
				myFlock[myFlock.length] = boids[i];
			}
		}
		return myFlock;
	}

	Move(){
		if(this.flock.length > 0){
			let cohereVel 	= this.Cohere();
			let separateVel = this.Separate();
			let alignVel	= this.Align();
			let boundVel 	= this.Bound();
			this.vel = V2.AddMany([this.vel, cohereVel, separateVel, alignVel, boundVel]);
			this.LimitVelocity();
		}
		this.pos = V2.Add(this.pos, this.vel);
	}

	Cohere(){
		//Perceived center
    	var pc = new V2(0,0);
		
		if(this.flock.length > 0){
	    	for(var i in this.flock){
	    		if(this.flock[i] != this){
	    			pc = V2.Add(pc, this.flock[i].pos);
	    		}
	    	}
    		pc = V2.Divide(pc, (this.flock.length));	
    	}else{
    		pc = this.pos;
    	}
    	
    	
    	var result = V2.Divide(V2.Subtract(pc, this.pos), 100);

		return result;
	}

	Separate(){
		var result = new V2(0,0);

    	for(var i in this.flock){
    		if(this.flock[i] != this){
    			if(V2.Distance(this.flock[i].pos, this.pos) < this.comfortZone){
    				result = V2.Subtract(result, V2.Subtract(this.flock[i].pos, this.pos));
    			}
    		}
    	}

		return result;
	}

	Align(){
		//Perceived velocity
    	var pv = new V2(0,0);
		
		if(this.flock.length > 0){
	    	
	    	for(var i in this.flock){
	    		if(this.flock[i] != this){
	    			pv = V2.Add(pv, this.flock[i].vel);
	    		}
	    	}
	    	pv = V2.Divide(pv, this.flock.length);

    	}else{
    		pv = this.vel;
    	}

    	var result = V2.Divide(V2.Subtract(pv, this.vel), this.keepUpFraction);

		return result;
	}

	Bound(){
		var v = new V2(0,0);

    	if(this.pos.x < 0){
    		v.x = this.correctionVelocity;
    	}
    	if(this.pos.x > this.canvas.width){
    		v.x = -this.correctionVelocity;
    	}
    	if(this.pos.y < 0){
    		v.y = this.correctionVelocity;
    	}
    	if(this.pos.y > this.canvas.height){
    		v.y = -this.correctionVelocity;
    	}

    	return v;
	}

	LimitVelocity(){
		if(V2.Magnitude(this.vel) > this.topSpeed){
    		this.vel = V2.Multiply(V2.Divide(this.vel, V2.Magnitude(this.vel)), this.topSpeed);
    	}
	}

}