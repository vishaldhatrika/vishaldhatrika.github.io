
setInterval(displaydigitalclock,1000);

function displaydigitalclock(){
	var d = new Date();
	var ampm=" AM";
	var h=d.getHours();
	if(h==0){
		ampm=" AM";
    }
	else if(h==12){
		ampm=" PM";
	}
	else if(h>12){
		h=h%12;
		ampm=" PM";
    }
	var m=d.getMinutes();
	var s=d.getSeconds();
	const secRatio = s/60;
	const minRatio = (secRatio + m)/60;
	const hourRatio = (minRatio + h)/12;
	
	document.getElementById("secHand").style.setProperty('--rotation',secRatio*360);
	document.getElementById("minHand").style.setProperty('--rotation',minRatio*360);
	document.getElementById("hourHand").style.setProperty('--rotation',hourRatio*360);

	if(m<10){
		m="0"+m;
	}
	if(s<10){
		s="0"+s;
	}
	document.getElementById("digitalclock").innerHTML = h+" : "+m+" : "+s+ampm;
}
