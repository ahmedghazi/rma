var Crud = {
	upload:function(){
		console.log("upload !");
	},

	initSG: function(){
		//console.log(this);
		for(var key in this){
			var prop = this[key];
			if(typeof prop == 'function'){
				//console.log("is");
				this['get'+key] = function(){
					return prop;
				};
				this['set'+key] = function(value){
					prop = value;
					return this;
				};
				
			}

		}

	}
};