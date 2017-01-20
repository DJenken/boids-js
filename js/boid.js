class Boid {
	constructor(px,py){		
		this.friendZone			= 200;
		this.comfortZone 		= 10;
		this.correctionVelocity = 5;
		this.keepUpFraction		= 16;
		this.topSpeed			= 3;
		this.flock 				= [];

		this.vel 			= V2.Random(this.topSpeed);
		this.pos 			= new V2(px,py);
		this.rot 			= new V2(0,0);
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

	Cohere(){
		//Perceived center
    	var pc = new V2(0,0);
		
		if(this.flock.length > 1){
	    	for(var i in this.flock){
	    		if(this.flock[i] != this){
	    			pc = V2.Add(pc, this.flock[i].pos);
	    		}
	    	}
    	
    		pc = V2.Divide(pc, (this.flock.length - 1));	
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
		
		if(this.flock.length > 1){
	    	
	    	for(var i in this.flock){
	    		if(this.flock[i] != this){
	    			pv = V2.Add(pv, this.flock[i].vel);
	    		}
	    	}
	    	pv = V2.Divide(pv, this.flock.length - 1);

    	}else{
    		pv = this.vel;
    	}

    	var result = V2.Divide(V2.Subtract(pv, this.vel), this.keepUpFraction);

		return result;
	}

	LimitVelocity(){
		if(V2.Magnitude(this.vel) > this.topSpeed){
    		this.vel = V2.Multiply(V2.Divide(this.vel, V2.Magnitude(this.vel)), this.topSpeed);
    	}
	}

	Move(){
		if(this.flock.length > 0){
			let v1 = this.Cohere();
			let v2 = this.Separate();
			let v3 = this.Align();
			//let v4 = this.Bound();
			this.vel = V2.AddMany([this.vel, v1, v2, v3]);
			this.LimitVelocity();
		}
		this.pos = V2.Add(this.pos, this.vel);
	}
}