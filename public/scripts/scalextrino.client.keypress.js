$(document).on('ready',function(){
	var baseUrl = 'http://localhost:3000/'
    var sendSpeed = function(motor,speed){
    	$.get(baseUrl + 'motor' + motor + '/' + speed);
    }
	var lastMillis1 = Date.now();
	var lastMillis2 = Date.now();
	var dial1 = $("#gauge1 .dial .inner");
	var gauge1_value = $("#gauge1.gauge .value");

	var dial2 = $("#gauge2 .dial .inner");
	var gauge2_value = $("#gauge2.gauge .value");
	
	var self = this;

	//self.presses = [250,250,250,250,250,250,250,250];
	self.presses1 = [300];
	self.presses2 = [300];
	self.average1 = 0;
	self.average2 = 0;

	self.calculate = function(){
		var sum1 = 0;

		var sum2 = 0;
		self.presses1.forEach(function(el){
			//console.log(el);
			sum1 += parseInt(el,10) - 100;
		});
		self.presses2.forEach(function(el){
			//console.log(el);
			sum2 += parseInt(el,10) - 100;
		});
		//console.log('sum',sum);
		//console.log('self.presses.length',self.presses.length);
		average1 = sum1/self.presses1.length;
		average2 = sum2/self.presses2.length;

		//console.log('average',average);
		var converted1 = (average1*100)/200;
		var converted2 = (average2*100)/200;
		//console.log(self.converted);
		if(converted1 > 100){
			self.dial1_value = 0;
		} else {
			self.dial1_value = 100 -converted1;
		}

		if(converted2 > 100){
			self.dial2_value = 0;
		} else {
			self.dial2_value = 100 -converted2;
		}

		var deg1 = (self.dial1_value * 177.5) / 100;
		sendSpeed(1,(self.dial1_value*255)/100);
		gauge1_value.html(self.dial1_value + '%');
			dial1.css({'transform': 'rotate('+deg1+'deg)'});
		    dial1.css({'-ms-transform': 'rotate('+deg1+'deg)'});
		    dial1.css({'-moz-transform': 'rotate('+deg1+'deg)'});
		    dial1.css({'-o-transform': 'rotate('+deg1+'deg)'}); 
		    dial1.css({'-webkit-transform': 'rotate('+deg1+'deg)'});
		var deg2 = (self.dial2_value * 177.5) / 100;
		gauge2_value.html(self.dial2_value + '%');
			dial2.css({'transform': 'rotate('+deg2+'deg)'});
		    dial2.css({'-ms-transform': 'rotate('+deg2+'deg)'});
		    dial2.css({'-moz-transform': 'rotate('+deg2+'deg)'});
		    dial2.css({'-o-transform': 'rotate('+deg2+'deg)'}); 
		    dial2.css({'-webkit-transform': 'rotate('+deg2+'deg)'});
		
	}

  $(document).keypress(function(event){
  	

  	if(event.keyCode === 122){ //32:spacebar, 122:z,45:-
  		//
  		var now = Date.now();
  		var diff = now - lastMillis1;
  		lastMillis1 = now;
  		if(self.presses1.length < 4){
  			self.presses1.push(diff);
  		} else {
  			self.presses1.shift();
  			self.presses1.push(diff);
  		}
  		self.calculate();
  	}
  	if(event.keyCode === 45){ //32:spacebar, 122:z,45:-
  	
  		var now = Date.now();
  		var diff = now - lastMillis2;
  		lastMillis2 = now;
  		if(self.presses2.length < 4){
  			self.presses2.push(diff);
  		} else {
  			self.presses2.shift();
  			self.presses2.push(diff);
  		}
  		self.calculate();
  	}
  	//console.log(event);
  });

  

});