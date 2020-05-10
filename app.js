$(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});

var players = [];

function addRow() {

	if(document.getElementById("details").value == "") {
		alert("Please enter value");
}
else {

    var deets=document.getElementById("details").value;
    var det = deets.split(",");

var rowCount=0;
    rowCount = document.getElementById("myTableData").rows.length;console.log(rowCount);
    var row = document.getElementById("myTableData").insertRow(rowCount);

	row.insertCell(0).innerHTML= '<input type="checkbox">';
    row.insertCell(1).innerHTML= '';
    row.insertCell(2).innerHTML= capital_letter(det[0]);
    row.insertCell(3).innerHTML= det[1];
	row.insertCell(4).innerHTML= det[2];
	row.insertCell(5).innerHTML= '<button type="submit" class="btn btn-default btn-xs btn-danger" value = "" onClick="Javacsript:deleteRow(this)"><span style="color: white" class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>';

for (var i = 1; i<=rowCount; i++)
		    document.getElementById("myTableData").rows[i].cells[1].innerHTML= i;

	var data = tableData();
	document.getElementById("players").innerHTML = data[0];
	document.getElementById("tickets").innerHTML = data[1];
	document.getElementById("amounts").innerHTML = data[2];

	players.push({
		name : capital_letter(det[0]) ,
		ticket : det[1],
		amount : det[2]
	}) ;

	return(players);

}
}




function deleteRow(obj) {


    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("myTableData");
    table.deleteRow(index);

    var rowCount=0;

     rowCount = table.rows.length;


	    for (var i = 1; i<=rowCount-1; i++)
            table.rows[i].cells[1].innerHTML= i;

    var data = tableData();
		document.getElementById("players").innerHTML = data[0];
		document.getElementById("tickets").innerHTML = data[1];
        document.getElementById("amounts").innerHTML = data[2];

}

function tableData() {
	var table = document.getElementById("myTableData");
    var totalAmount=0;
    var totalTickets=0;
    for(var i = 1; i<=(table.rows.length-1); i++){
		totalAmount = totalAmount + parseInt(table.rows[i].cells[4].innerHTML);
	}
	for(var i = 1; i<=(table.rows.length-1); i++){
			totalTickets = totalTickets + parseInt(table.rows[i].cells[3].innerHTML);
	}
	var totalPerson = table.rows.length-1;
	var tData = [totalPerson,totalTickets,totalAmount];
    return tData;
}


function calcPrizes() {
	var data = tableData();
	var totalAmount = data[2];
	if(totalAmount>1000) {
	var q5 = Math.floor((Math.floor(0.131*totalAmount))/2)*2;
	var hf = Math.floor((Math.floor(0.29*totalAmount))/2)*2;
	}
	if(totalAmount<=1000) {
		var q5 = Math.floor((Math.floor(0.1353*totalAmount))/2)*2;
		var hf = Math.floor((Math.floor(0.275*totalAmount))/2)*2;
	}
	document.getElementById("q5").innerHTML = q5;
			document.getElementById("corner4").innerHTML = q5;
		document.getElementById("line1").innerHTML = q5;
		document.getElementById("line2").innerHTML = q5;
			document.getElementById("line3").innerHTML = q5;
	document.getElementById("hf").innerHTML = hf;

	var prizes = [q5,hf];
	return prizes;
}


function results() {

	document.getElementById("q5res").innerHTML = '';
				document.getElementById("cres").innerHTML = '';
				document.getElementById("l1res").innerHTML = '';
				document.getElementById("l2res").innerHTML = '';
				document.getElementById("l3res").innerHTML = '';
			document.getElementById("hfl").innerHTML = '';

			var stringwins=[];
			var quick=[];
			var corner=[];
			var l1=[];
			var l2=[];
			var l3=[];
			var hfull=[];


	var stringwins = [document.getElementById("quick").value,document.getElementById("corner").value,document.getElementById("l1").value,document.getElementById("l2").value,document.getElementById("l3").value,document.getElementById("hfull").value];
	var quick = stringwins[0].split(",");
	var corner = stringwins[1].split(",");
	var l1 = stringwins[2].split(",");
	var l2 = stringwins[3].split(",");
	var l3 = stringwins[4].split(",");
	var hfull = stringwins[5].split(",");

	var money = calcPrizes();
	var qresult = Math.floor(money[0]/quick.length);
	var cresult = Math.floor(money[0]/corner.length);
	var l1result = Math.floor(money[0]/l1.length);
	var l2result = Math.floor(money[0]/l2.length);
	var l3result = Math.floor(money[0]/l3.length);
	var hfresult = Math.floor(money[1]/hfull.length);

	var quickwinner = [];
	var cwinner = [];
	var l1winner = [];
	var l2winner = [];
	var l3winner = [];
	var hfwinner = [];
	var winners = [];

	var table = document.getElementById("myTableData");

	for(var i = 0; i<=(quick.length-1); i++){
			 quickwinner.push(table.rows[(quick[i])].cells[2].innerHTML);
	}


	for(var i = 0; i<=(corner.length-1); i++){
				 cwinner.push(table.rows[(corner[i])].cells[2].innerHTML);
		}


	for(var i = 0; i<=(l1.length-1); i++){
				 l1winner.push(table.rows[(l1[i])].cells[2].innerHTML);
		}

	for(var i = 0; i<=(l2.length-1); i++){
				 l2winner.push(table.rows[(l2[i])].cells[2].innerHTML);
		}


	for(var i = 0; i<=(l3.length-1); i++){
				 l3winner.push(table.rows[(l3[i])].cells[2].innerHTML);
		}


	for(var i = 0; i<=(hfull.length-1); i++){
				 hfwinner.push(table.rows[(hfull[i])].cells[2].innerHTML);
		}
		winners.splice(0, 0, quickwinner, cwinner, l1winner, l2winner, l3winner, hfwinner);


			document.getElementById("q5res").innerHTML ='<span style="font-size: 18px; float: right;"><span style="color: #244867;" class="glyphicon glyphicon-star" aria-hidden="true"></span> Quick 5</span></br><span style="font-size: 24px;">' + winners[0] + '&nbsp : &nbsp' + '</span><span style="font-size: 35px;">Rs.' +qresult+'</span>';
			document.getElementById("cres").innerHTML = '<span style="font-size: 18px; float: right;"><span style="color: #244867;" class="glyphicon glyphicon-star" aria-hidden="true"></span> Four Corners</span></br><span style="font-size: 24px;">' + winners[1] + '&nbsp : &nbsp' + '</span><span style="font-size: 35px;">Rs.' +cresult+'</span>';
			document.getElementById("l1res").innerHTML = '<span style="font-size: 18px; float: right;"><span style="color: #244867;" class="glyphicon glyphicon-star" aria-hidden="true"></span> Top Line</span></br><span style="font-size: 24px;">' + winners[2] + '&nbsp : &nbsp' + '</span><span style="font-size: 35px;">Rs.' +l1result+'</span>';
			document.getElementById("l2res").innerHTML = '<span style="font-size: 18px; float: right;"><span style="color: #244867;" class="glyphicon glyphicon-star" aria-hidden="true"></span> Middle Line</span></br><span style="font-size: 24px;">' + winners[3] + '&nbsp : &nbsp' + '</span><span style="font-size: 35px;">Rs.' +l2result+'</span>';
			document.getElementById("l3res").innerHTML = '<span style="font-size: 18px; float: right;"><span style="color: #244867;" class="glyphicon glyphicon-star" aria-hidden="true"></span> Bottom Line</span></br><span style="font-size: 24px;">' + winners[4] + '&nbsp : &nbsp' + '</span><span style="font-size: 35px;">Rs.' +l3result+'</span>';
			document.getElementById("hfl").innerHTML = '<span style="font-size: 18px; float: right;"><span style="color: #244867;" class="glyphicon glyphicon-star" aria-hidden="true"></span> House Full</span></br><span style="font-size: 24px;">' + winners[5] + '&nbsp : &nbsp' + '</span><span style="font-size: 35px;">Rs.' +hfresult+'</span>';



}


function load() {



	document.getElementById("players").innerHTML = 0;
	document.getElementById("tickets").innerHTML = 0;
	document.getElementById("amounts").innerHTML = 0;
	document.getElementById("q5").innerHTML = 0;
		document.getElementById("corner4").innerHTML = 0;
	document.getElementById("line1").innerHTML = 0;
	document.getElementById("line2").innerHTML = 0;
		document.getElementById("line3").innerHTML = 0;
	document.getElementById("hf").innerHTML = 0;
	document.getElementById("copy").innerHTML = '<p class="copyright">&copy 2020 Alex Thaimei. All rights reserved.</p>';
	document.getElementById("credit").innerHTML = 'by Alex Thaimei';



   var person = prompt("Please enter the name of the game");
   	  if (person != null) {

       document.getElementById("gamename").innerHTML = '<span style="color: #a70500; font-size: 14px; " class="glyphicon glyphicon-star" aria-hidden="true"></span> ' + capital_letter(person) + ' Tambola' + ' <span style="color: #a70500; font-size: 14px;" class="glyphicon glyphicon-star" aria-hidden="true"></span>';
}

}

function capital_letter(str)
{
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}

$(document).ready(function(){
  $("a").on('click', function(event) {

    if (this.hash !== "") {

      event.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        window.location.hash = hash;
      });
    }
  });
});


function capture(){

html2canvas(document.getElementById("screen1"),{
   onrendered:function(canvas){
      var a = document.createElement('a');
	    a.href = canvas.toDataURL("image/jpg");
	    a.download = 'screen1.jpg';
  a.click();
   }
});
}

function capture1(){

html2canvas(document.getElementById("screen2"),{
   onrendered:function(canvas){
      var a = document.createElement('a');
	    a.href = canvas.toDataURL();
	    a.download = 'screen2.png';
  a.click();
   }
});
}

function capture2(){

html2canvas(document.getElementById("screen3"),{
   onrendered:function(canvas){
      var a = document.createElement('a');
	    a.href = canvas.toDataURL("image/jpg");
	    a.download = 'screen3.jpg';
  a.click();
   }
});
}