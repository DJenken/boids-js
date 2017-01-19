
var app = (function(){
	function App(){
		var self = this;

		self.canvas 		= $('#canvas')[0];
		self.context 		= self.canvas.getContext("2d");
		self.fps 			= 30;
		
		self.correctionVelocity = 10;
		self.comfortZone 	= 10;
		self.keepUpFraction = 8;
		self.topSpeed		= 0.5;
		self.numOfBoids 	= 1000;
		self.boids 			= [];
	}

	App.prototype.init = function(){
		this.createBoids();
		this.run();
	};

	App.prototype.run = function(){
        self = this;
        function frame(){
        	setTimeout(function(){
	            self.update();
	            self.draw();
	            requestAnimationFrame(frame);
        	}, 1000 / self.fps);
        }
        requestAnimationFrame(frame);
    };

    App.prototype.update = function(){
		for(let i =0; i < this.boids.length; i++){
            this.boids[i].Update(this.boids);
        }
	};
	
	App.prototype.draw = function(){
		this.context.clearRect(0, 0, canvas.width, canvas.height);
	   for(let i =0; i < this.boids.length; i++){
            this.boids[i].Draw(this.context);
        }
	};

    App.prototype.createBoids = function(){
    	//Create as many boids as num of boids
    	for(var i = 0; i < this.numOfBoids; i++){
    		var posX = Math.floor(Math.random() * this.canvas.width);
    		var posY = Math.floor(Math.random() * this.canvas.height);
    		this.boids[i] = new Boid(posX, posY);
    	}
    }

    App.prototype.moveBoids = function(){
    	//For each boid
    	for(var i in this.boids){
    		var v1 = this.Cohere(this.boids[i]);
    		var v2 = this.Separate(this.boids[i]);
			var v3 = this.Align(this.boids[i]);
			var v4 = this.Bound(this.boids[i]);

    		this.boids[i].vel = V2.AddMany([this.boids[i].vel, v1, v2, v3, v4]);
    		this.LimitVelocity(this.boids[i]);
    		this.boids[i].pos = V2.Add(this.boids[i].pos, this.boids[i].vel);
    	}
    }
    App.prototype.drawBoids = function(){
    	for(var b in this.boids){
			//boid.draw
			this.context.fillRect(this.boids[b].pos.x,this.boids[b].pos.y,3,3);
		}
    }

    App.prototype.Cohere = function(b){

    	//Perceived center
    	var pc = new V2(0,0);

    	for(var i in this.boids){
    		if(this.boids[i] != b){
    			pc = V2.Add(pc, this.boids[i].pos);
    		}
    	}

    	pc = V2.Divide(pc, (this.boids.length - 1));
    	
    	var result = V2.Divide(V2.Subtract(pc, b.pos), 100);

    	return result;
    }

    App.prototype.Separate = function(b){
    	var result = new V2(0,0);

    	for(var i in this.boids){
    		if(this.boids[i] != b){
    			if(V2.Magnitude(this.boids[i].pos, b.pos) < this.comfortZone){
    				result = V2.Subtract(result, V2.Subtract(this.boids[i].pos, b.pos));
    			}
    		}
    	}

    	return result;
    }

    App.prototype.Align = function(b){
    	//Perceived velocity
    	var pv = new V2(0,0);

    	for(var i in this.boids){
    		if(this.boids[i] != b){
    			pv = V2.Add(pv, this.boids[i].vel);
    		}
    	}

    	pv = V2.Divide(pv, this.boids.length - 1)

    	var result = V2.Divide(V2.Subtract(pv, b.vel), this.keepUpFraction);

    	return result;
    }

    App.prototype.Bound = function(b){
    	var v = new V2(0,0);

    	if(b.pos.x < 200){
    		v.x = this.correctionVelocity;
    	}
    	if(b.pos.x > this.canvas.width - 200){
    		v.x = -this.correctionVelocity;
    	}
    	if(b.pos.y < 200){
    		v.y = this.correctionVelocity;
    	}
    	if(b.pos.y > this.canvas.height - 200){
    		v.y = -this.correctionVelocity;
    	}

    	return v;
    }

    App.prototype.LimitVelocity = function(b){
    	if(V2.Magnitude(b.vel) > this.topSpeed){
    		b.vel = V2.Multiply(V2.Divide(b.vel, V2.Magnitude(b.vel)), this.topSpeed);
    	}
    }

	return new App();

})();

$(document).ready(function(){
	app.init();
	app.run();
});







