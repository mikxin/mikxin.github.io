//var doc = document.documentElement;
var scrollVal;

var INTRO_POS = $('#intro').position().top;
var MADISON_POS = $('#madison').position().top;
var SOPH_POS = $('#sophomore').position().top;
var JUN_POS = $('#junior').position().top;
var SEN_POS = $('#senior').position().top;
var GRAD_POS = $('#graduation').position().top;

var INTRO_HEIGHT = $('#intro').height();
var MADISON_HEIGHT = $('#madison').height();
var SOPH_HEIGHT = $('#sophomore').height();
var JUN_HEIGHT = $('#junior').height();
var SEN_HEIGHT = $('#senior').height();
var GRAD_HEIGHT = $('#graduation').height();

//browse through all left and right class and put them in an dictionary
//then push them to a dictionary with id as key.

var insides = [];

var movable = document.getElementsByClassName("left");
var movable2 = document.getElementsByClassName("right");

for(var i = 0; i < movable.length; i++){
	insides.push({
	    key:   movable[i].id,
	    value: false
	});	
}

for(var j = 0; j < movable2.length; j++){
	insides.push({
	    key:   movable2[j].id,
	    value: false
	});	
}

function scrollAction(){
	
	scrollVal = window.pageYOffset;
	
	/********Madison Section*********/	
	
	animate('#madison_text1', INTRO_HEIGHT/2, INTRO_HEIGHT + MADISON_HEIGHT/10);
	animate('#madison_text2', INTRO_HEIGHT/2, INTRO_HEIGHT + MADISON_HEIGHT/10);
	animate('#capitol', INTRO_HEIGHT/2 + 100, INTRO_HEIGHT + MADISON_HEIGHT/10 + 100);
	animate('#bascom', INTRO_HEIGHT/2 + 200, INTRO_HEIGHT + MADISON_HEIGHT/10 + 200);
	
	/********Sophomore Section*********/
	
	animate('#sophomore_label', MADISON_POS + MADISON_HEIGHT/4, SOPH_POS);
	animate('#fall_text', MADISON_POS + MADISON_HEIGHT/3, SOPH_POS);
	animate('#winter_text', MADISON_POS + MADISON_HEIGHT/2, SOPH_POS);
	if(insides["#winter_text"])
		setTimeout(function(){$("#winter_jacket").css("visibility", "visible");}, 500);		
	else
		setTimeout(function(){$("#winter_jacket").css("visibility", "hidden");}, 500);	
		
	animate('#thanksgiving_text', MADISON_POS + MADISON_HEIGHT/2 + 200, SOPH_POS + 200);		
	if(insides["#thanksgiving_text"])
		$("#turkey").css("animation-play-state", "running");
	else
		$("#turkey").css("animation-play-state", "paused");
		
	animate('#disneytrip_text', MADISON_POS + MADISON_HEIGHT/2 + 200, SOPH_POS + 200);
		
	/********Junior Section*********/
	
	animate('#junior_label',SOPH_POS + 200, JUN_POS);
	animate('#crazyyear_text',SOPH_POS + 300, JUN_POS);
	if(insides["#crazyyear_text"])
		$("#brain").css("animation-play-state", "running");
	else
		$("#brain").css("animation-play-state", "paused");
		
	animate('#job_text',SOPH_POS + 450, JUN_POS);
	if(insides["#job_text"])
		$("#code_container").css("animation-play-state", "running");
	else
		$("#code_container").css("animation-play-state", "paused");
	
	animate('#dance_text',SOPH_POS + 600, JUN_POS + JUN_HEIGHT/4);
	animate('#californiatrip_text',SOPH_POS + 600, JUN_POS + JUN_HEIGHT/4);
	
	/********Senior Section*********/
	
	animate('#senior_label', JUN_POS + JUN_HEIGHT/4, SEN_POS);
	animate('#bestyear_text', JUN_POS + JUN_HEIGHT/4 + 200, SEN_POS);
	animate('#football_text', JUN_POS + JUN_HEIGHT/4 + 300, SEN_POS);
	animate('#freakfest_text', JUN_POS + JUN_HEIGHT/2 + 200, SEN_POS + 300);
	animate('#food_text', JUN_POS + JUN_HEIGHT/2 + 300, SEN_POS + 300);
	
	/********Graduation Section*********/
	
	animate('#graduation_label', SEN_POS + 300, GRAD_POS );
	animate('#graduated_text', SEN_POS + 450, GRAD_POS );
	if(insides["#graduated_text"])
		setTimeout(function(){$("#grad_gown").css("visibility", "visible");}, 500);		
	else
		setTimeout(function(){$("#grad_gown").css("visibility", "hidden");}, 500);
		
	animate('#memories_text', SEN_POS + 700, GRAD_POS + 300 );
	animate('#thankyou_text', GRAD_POS, GRAD_POS + GRAD_HEIGHT );
	if(insides["#thankyou_text"])
		setTimeout(function(){$("#job").css("visibility", "visible");}, 1500);		
	else
		setTimeout(function(){$("#job").css("visibility", "hidden");}, 1500);
	
}

function animate(element, min, max){
	//left side
	if($(element).hasClass('left')){
		if(scrollVal > min && scrollVal < max && !insides[element]){
			$(element).animate({"margin-left": '0px'}, "medium");	
			insides[element] = true;	
		}
		else if ((scrollVal < min || scrollVal > max) && insides[element]){
			resetLeft(element);
		}
	}
	//right side
	else if($(element).hasClass('right')){
		if(scrollVal > min && scrollVal < max && !insides[element]){
			$(element).animate({"margin-right": '0px'}, "medium");	
			insides[element] = true;	
		}
		else if ((scrollVal < min || scrollVal > max) && insides[element]){
			resetRight(element);
		}
	}
}

function resetLeft(element){
	$(element).animate({"margin-left": '-1000px'}, "medium");
	insides[element] = false;
}

function resetRight(element){
	$(element).animate({"margin-right": '-1000px'}, "medium");
	insides[element] = false;
}

$(window).scroll(scrollAction);