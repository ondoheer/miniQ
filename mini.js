var miniQ, _;

(function(){
	miniQ = _ = function(target){
		return new MiniQ(target);
	};

	var MiniQ = function(target){
		// checks for proper constructor object format
		if (typeof target != 'string' ){
			// esto debería salir de librería de errores
			console.log("Error, you didin't select a string");
		}
		else { // we asume that if a string was given it was correct
			// check if it's a class
			if (target[0] == '.'){
				var selector = document.getElementsByClassName(target.slice(1));
				for (var i = 0; i < selector.length; i++){
					this[i] = selector[i];
					
				}
				this.length = selector.length;
				return this;

			} else if (target[0] == '#'){
				var selector = document.getElementById(target.slice(1));
				this.length = 1;
				this[0] = selector;				
				return this;

			} else {
				var selector = document.getElementsByTagName(target);
				for (var i = 0; i < selector.length; i++){
					this[i] = selector[i];
					
				}
				this.length = selector.length;
				return this;
			}
		}
	};

	MiniQ.prototype = {
		
		//metodos
		css: function(property, value){
			for (var i = 0; i < this.length; i++){
				if(this[i].style.hasOwnProperty(property)){
					
					this[i].style[property] = value;
				}				
			}
			return this;
		},
		attr: function(attribute, value){
			for(var i = 0; i < this.length; i++){
				this[i].setAttribute(attribute, value);
				
			}
			return this;
		}


			
		
	};
}());

