
var app = (function(){
	function App(){
		var self = this;

		self.canvas 		= $('#canvas')[0];
		self.context 		= self.canvas.getContext("2d");
		self.fps 			= 30;
		
		self.numOfBoids 	= 400;
		self.boids 			= [];
	}

	App.prototype.Init = function(){
		this.CreateBoids();
		this.Run();
	};

	App.prototype.Run = function(){
        self = this;
        function Frame(){
        	setTimeout(function(){
	            self.Update();
	            self.Draw();
	            requestAnimationFrame(Frame);
        	}, 1000 / self.fps);
        }
        requestAnimationFrame(Frame);
    };

    App.prototype.Update = function(){
		for(let i =0; i < this.boids.length; i++){
            this.boids[i].Update(this.boids);
        }
	};
	
	App.prototype.Draw = function(){
		this.context.clearRect(0, 0, canvas.width, canvas.height);
	   for(let i =0; i < this.boids.length; i++){
            this.boids[i].Draw(this.context);
        }
	};

    App.prototype.CreateBoids = function(){
    	//Create as many boids as num of boids
    	for(var i = 0; i < this.numOfBoids; i++){
    		var posX = Math.floor(Math.random() * this.canvas.width);
    		var posY = Math.floor(Math.random() * this.canvas.height);
    		this.boids[i] = new Boid(posX, posY);
    	}
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
	app.Init();
	app.Run();
});







