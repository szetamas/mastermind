//random number generator
function rando(a)
{
	return Math.floor(Math.random()*a);
}
//timer
function tictac()
{
	//increment the secs
	sec++;
	if( sec>=6000 )
	{
		//if the minutes eq 100, write out that it is too much
		$("#tim").text("Time:2MUCH");
		clearInterval(timer);
	}
	else
	{
		//another else write out the time, 2 digit format
		var timeout="Time:";
		var mins=Math.floor( sec/60 );
		
		if( mins<10 )
		{
			timeout+="0"+mins+":";
		}
		else
		{
			timeout+=mins+":";
		}
		
		var secs=sec-(Math.floor(sec / 60)*60);
		
		if( secs<10 )
		{
			timeout+="0"+secs;
		}
		else
		{
			timeout+=secs;
		}
		
		$("#tim").text(timeout);
	}
}
//hide the timer
function hidetim()
{
	//the timer appear if he's in hide and inverse...
	$('#tim').toggleClass('hide');
	//and if has the onmouseout, destroy that, another else add that
	if( $('#tim').attr("onmouseout")=="$('#tim').addClass('hide');" )
	{
		$('#tim').removeAttr("onmouseout");
	}
	else
	{
		$('#tim').attr("onmouseout","$('#tim').addClass('hide');");
	}
}
function coloring()
{
	//if the color var to big, reset that
	if(clr>=13421772)
	{
		clr=9991764;
	}
	clr=clr+10;
	$("#solutions tr td table").css("border-color", "#"+clr.toString(16));
	$(".resp").css("border-color", "#"+clr.toString(16));
	if( good )
	{
		$("#solutions").find("td:last").css("color", "#"+clr.toString(16));
	}
}
function start()
{
	//reset the good('cuz of the coloring)
	good = false;
	//start the timer
	$("#tim").text("Time:00:00");
	sec=0;
	timer = setInterval("tictac();", 1000);

	//x get his timer hiding function
	$("#tim").next().attr("onclick", "hidetim();");
	
	//i remove "start"'s function
	$("#tim").removeAttr("onclick");
	
	//the text that "cmon" change to ? marks
	for( var cv=0 ; cv<4 ; cv++)
	{
		$("th:eq("+(cv+2)+")").addClass("quest");
		$(".quest:eq("+(cv)+")").text("?");
		$(".quest:eq("+(cv)+")").removeAttr("onclick");
	}
	
	//i create the trying numbers and set zero, and create a new solution line with this number
	trynums=0;
	newline(trynums);
	
	for( var cv=0 ; cv<4 ; cv++ )
	{
		//i make a random number with a decrementing intervall, and the actaul puzle color get his number
		var rnumb = rando(8-cv);
		puzle[cv] = lefts[ rnumb ];
		
		//and if this random array element not eq the actual intervall last element
		if( lefts[rnumb] != lefts[ lefts.length-cv-1 ] )
		{
			//the actual random element swap with the actual interavl's last element with a puffer var
			var puf = lefts[rnumb];
			lefts[rnumb] = lefts[ lefts.length-cv-1 ];
			lefts[ lefts.length-cv-1 ] = puf;
		}
	}
}

function newline(lin)
{
	//i put into the lefts the  color codes (red,green,blue,black,white,cyan,magenta,yellow)
	//(this decimal numbers' origin binary numbers ex.: 100 is 4, that red 'cuz 1 0 0 has 1 Red and 0 Green and Blue)
	//and make a solution with negatives
	lefts = [4, 2, 1, 0, 7, 3, 5, 6];
	solution = [-1, -1, -1, -1]; 
	//i put some html into tex(rewrite)
	var tex='<tr id="try'+trynums+'" style="height:8rem;"><th class="align-middle" scope="row">'+(trynums+1)+'.</th>';
	//and i make a loop for the 4 colorpicker 
	for( var cv=0 ; cv<4 ; cv++)
	{
		tex+='<td class="picker align-middle"><table style="margin:auto;">';
		//and i make a looper for the 8 color and the chosed color's cell
		for( var cv2=0 ; cv2<lefts.length+1 ; cv2++ )
		{
			//and make 3 row
			if( cv2%3 == 0 )
			{
				tex+='<tr>';
			}
			//i check that which cell is the chosed color's cell
			if( cv2 == 4 )
			{
				tex+='<td class="basic border-0" style="background-color: #808080;" onclick="openOrClose('+cv+');"></td>';					
			}
			else if( cv2 < 4)
			{
				tex+='<td class="c'+lefts[cv2]+' border-0" onclick="change('+lefts[cv2]+','+cv+');"></td>';					
			}
			else
			{
				tex+='<td class="c'+lefts[cv2-1]+' border-0" onclick="change('+lefts[cv2-1]+','+cv+');"></td>';	
			}
			//row's end
			if( cv2%3 == 2 )
			{
				tex+='</tr>';
			}
		}
		tex+='</table></td>';
	}
	//and put in the closer tags into tex and put the checker button
	tex+='<td class="align-middle" style="font-size: 70%;" colspan="2" onclick="check();">Check!</td></tr>';

	//if it is the first round the htmls put in the solutions, another else put after the last line
	if( lin==0 )
	{
		$("#solutions").html(tex);
	}
	else
	{
		$("#try"+(lin-1)).after(tex);
	}
}

//the user could change the solution colors with the color's code and the destination place
function change(code ,place)
{
	//the actual solution element set/modified to the new code
	solution[place]=code;
	//and that littlebox color modifying too, the picker will be closed
	$(".picker:nth-child("+(place+2)+")").find(".basic").css( "background-color", $(".c"+code).css("background-color") );
	openOrClose(place);
	//write again that check( from aother else(ex.:"ChooseTheColors!"))
	$("#solutions").find("td:last").html("Check!");
}

//its just animation, open or close the little color picker
function openOrClose(order)
{
	//add the relative property for animation
	$("#solutions tr td table tr td:not(.basic)").css("position", "relative");
	//if the width less than 1 so zero, or lesser
	if( $(".picker:nth-child("+(order+2)+")").find("td:not(.basic)").width() < 1 )
	{
		//then open the little boxes
		$(".picker:nth-child("+(order+2)+")").find("td:not(.basic)").animate({height: '25px',width: '25px'},300);
	}
	else
	{
		//another else close them
		$(".picker:nth-child("+(order+2)+")").find("td:not(.basic)").animate({height: '0px',width: '0px'},300);
	}
	//reset the position property
	$("#solutions tr td table tr td:not(.basic)").css("position", "static");
}

//check that the solution is eq with puzle
function check()
{
	//i go trough, all picked color
	for( var cv=0 ; cv<4 ; cv++)
	{
		//and if any -1(grey), stop this check and write that "choose the colors"
		if( solution[cv]==-1 )
		{
			$("#solutions").find("td:last").html("Choose<br>The<br>Colors!");
			return 0;
		}
	}
	//check that solution has just diferent colors, i go trough all color except the last
	for(var cv=0 ; cv<3 ; cv++)
	{
		//the inside loop, i go too but the last one too
		for( var cv2=0 ; cv2<4 ; cv2++ )
		{
			//if the outside an inside actual is eq when the actual loop vars isn't eq
			if( solution[cv]==solution[cv2] && cv!=cv2 )
			{
				//write out: i need different colors
				$("#solutions").find("td:last").html("Choose<br>Different<br>Colors!");
				return 0;
			}
		}
	}
	//close pickers(if has open)
	for( var cv=0 ; cv<4 ; cv++ )
	{
		$(".picker:nth-child("+(cv+2)+")").find("td:not(.basic)").animate({height: '0px',width: '0px'},200);
	}
	//tryng increment and i get true to good
	trynums++;
	good = true;
	//go trough every solution color's
	for( var cv=0 ; cv<solution.length ; cv++ )
	{		
		//if the same places colors are eq
		if( solution[cv] == puzle[cv] )
		{
			//then, find is true and good is true too
			find[cv] = true;
		}
		else  //but if a color pair isn't eq, the good and actual find will be false
		{
			good = false;
			find[cv] = false;
		}
	}
	
	//if all color are eq, then gameover
	if(good)
	{
		clearInterval(timer);
		//write that it is a win
		$("#solutions").find("td:last").html("W1N!<br>Click4<span style='font-size: 150%;'>&#x21bb;</span>");
		$("#solutions").find("td:last").attr("onclick","start();");
		//the ? marks change to "win!" text
		for( var cv=0 ; cv<4 ; cv++)
		{	
			$(".quest:eq("+(cv)+")").text( $("#solutions").find("td:last").html()[cv] );
			$(".quest:eq("+(cv)+")").css( "color", $(".c"+puzle[cv]).css("background-color") );
			$(".quest:eq("+(cv)+")").attr("onclick","start();");
		}
	}
	else
	{
		//another else go trough the next checking function 'cuz have some orange and red fail
		//make a green and yellow counter and go trough solution
		var gren=0;
		var yelow=0;
		for( var cv=0 ; cv<solution.length ; cv++ )
		{
			if( find[cv] )
			{
				gren++;
			}
			else
			{
				//if the actual place isn't find then check that actual solution color eq any puzle's color
				for( var cv2=0 ; cv2<solution.length ; cv2++ )
				{
					//if the actual solution color(outside loop) is eq with actual puzle color(inside loop)
					if( solution[cv] == puzle[cv2] )
					{
						yelow++;
						break;
					}
				}
			}
		}
			
		//make a respond table and go trough first the greens
		var respond="<table style='margin:auto;'><tr>";
		for( var cv=0 ; cv<gren ; cv++ )
		{
			//every loop has a cv is 2 question, cuz cv is 2 it's end of line
			if( cv==2 )
			{
				respond+="</tr><tr>";
			}
			//so it is a finded color, make it a green box
			respond+="<td class='resp' style='background-color: #00ff00; height: 25px;width: 25px;padding: 0px;'></td>";
		}
		for( var cv=gren ; cv<gren+yelow ; cv++)
		{
			if( cv==2 )
			{
				respond+="</tr><tr>";
			}
			//yellow
			respond+="<td class='resp' style='background-color: #ffff00; height: 25px;width: 25px;padding: 0px;'></td>";
		}
		for( var cv=gren+yelow ; cv<solution.length ; cv++)
		{
			if( cv==2 )
			{
				respond+="</tr><tr>";
			}
			//it is last check so it isn't a find it's a fail, so make it a red box
			respond+="<td class='resp' style='background-color: #ff0000; height: 25px;width: 25px;padding: 0px;'></td>";
		}
		//close the respond's tags and put into his place, the actual solution last td
		respond+="</tr></table>";
		$("#solutions").find("td:last").html(respond);
		
		//remove check functions, some td, tr, the present classes and basic's onclick  
		$("#solutions tr td:nth-child(6)").removeAttr("onclick");
		$(".picker").find("td:not(.basic)").remove();
		$(".picker").find("tr:first").remove();
		$(".picker").find("tr:last").remove();
		$(".picker").removeClass("picker");
		$(".basic").removeAttr("onclick");
		
		
		//and create a new line, with new classes
		newline(trynums);
	}
}

$(document).ready(function()
{	
	puzle = [];		//create a puzzle and find array
	find = [];
	//start colored borders function and set the good
	good=false;
	clr=9991764;
	setInterval("coloring();", 100);
});
