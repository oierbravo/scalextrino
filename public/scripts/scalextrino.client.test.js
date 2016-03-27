$( document ).ready(function() {
    var baseUrl = 'http://localhost:3000/'
    var sendSpeed = function(motor,speed){
    	$.get(baseUrl + 'motor' + motor + '/' + speed);
    }

    
    $('#btnSpeed1').click(function(){
    	var speed = $('#inputSpeed1').val();
    	sendSpeed(1,speed);
    });
    $('#btnSpeed2').click(function(){
    	var speed = $('#inputSpeed2').val();
    	sendSpeed(2,speed);
    });
    
    $( "#slider1" ).slider({
    	min:0,
    	max:10,

    	slide: function(event,ui){
    		var val = $(this).slider('value');
    		sendSpeed(2,val*25.5);
    	}
    });


});