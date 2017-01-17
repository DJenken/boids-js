class V2{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}

	static Add(va, vb){
		var result 	= new V2(0,0);
		result.x 	= va.x + vb.x;
		result.y 	= va.y + vb.y;

		return result;
	}

	static AddMany(vectors){
		var result = new V2(0,0);
		for (var i = 0; i < vectors.length; i++){
			result.x += vectors[i].x;
			result.y += vectors[i].y;
		}
		return result;
	}

	static Subtract(va, vb){
		var result 	= new V2(0,0);
		result.x 	= va.x - vb.x;
		result.y 	= va.y - vb.y;

		return result;
	}

	static SubtractMany(vectors){
		var result = new V2(0,0);
		for (var i = 0; i < vectors.length; i++){
			result.x -= vectors[i].x;
			result.y -= vectors[i].y;
		}
		return result;
	}

	static Multiply(v, scalar){
		var result 	= new V2(0,0);
		result.x 	= v.x * scalar;
		result.y 	= v.y * scalar;
		return result;
	}

	static Divide(v, scalar){
		if(scalar == 0){
			console.error("Cannot divide by 0");
		}
		var result 	= new V2(0,0);
		result.x 	= Math.floor(v.x / scalar);
		result.y 	= Math.floor(v.y / scalar);
		return result;	
	}

	static Dot(va, vb){
		var px 		= va.x * vb.x;
		var py 		= va.y * vb.y;
		var result 	= px + py;
		return result;
	}

	static Magnitude(v){
		var xSqr 	= v.x * v.x;
		var ySqr 	= v.y * v.y;
		var result 	= Math.sqrt(V2.Dot(v,v));
		return result;
	}
}
