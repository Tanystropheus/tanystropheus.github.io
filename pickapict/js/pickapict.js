var	picts=[];
var selected=[];
var	indexOfImagePressed;
var isInitialized;
var modeIndex;
var targetIndex;

console.log("pickapict");
init();

function init() {

	isInitialized=false;
	indexOfImagePressed=-1;
	modeIndex=0;

	$("body").append("<audio id='magicwand'><source src='data/Magic_wand.ogg' type='audio/ogg'><source src='data/Magic_wand.mp3' type='audio/mp3'></audio>");
	$("body").append("<audio id='keystroke'><source src='data/Keystroke.ogg' type='audio/ogg'><source src='data/Keystroke.mp3' type='audio/mp3'></audio>");
	$.get("php/list-images.php",function(data) {
		picts=data;
		shuffle();
	})
	.done(function() {
		console.log( "second success" );
	})
	.fail(function( jqXHR, textStatus) {
		console.log( "error",jqXHR );
	})
	.always(function() {
		console.log( "finished" );
	});
}

function shuffle()
{
	var i,j;
	var	n=[];
	var rnd,found;
	
	for(i=0;i<4;i++)
		n[i]=-1;
		
	for(i=0;i<4;i++)
	{
		do
		{
			found=false;
			rnd=parseInt(picts.length*Math.random());
			for(j=0;j<i+1;j++)
				if(n[j]==rnd)
					found=true;
		}
		while(found);
		n[i]=rnd;
		selected[i]=picts[rnd];
	}
	
	targetIndex=n[parseInt(4*Math.random())];
	
	drawFourImages();
}
function drawFourImages()
{
	var i;
	var sz;
	var html;
	
	for(i=0;i<4;i++)
	{
		html=[	"<div class='square'>",
				"<a class='word' id='"+selected[i]+"'>",
				"<audio><source src='data/"+selected[i]+".ogg' type='audio/ogg'><source src='data/"+selected[i]+".mp3' type='audio/mp3'></audio>",
				"<div class='crop'>",
				"  <div class='picture'><img style='width:10rem;height:10rem' src='data/"+selected[i]+".png'/></div>",
				"</div></a></div>"].join("\n");
		$("#pict"+(i+1)).html(html);
		$("#pict"+(i+1)+" a.word").click(function(){
			var me=$(this).attr('id');
			if(me==picts[targetIndex]) {
				var audio=$("#magicwand").get(0);
				audio.play();
				$(audio).on("ended",function(){shuffle();});
			}
			else {
				var audio=$("#keystroke").get(0);
				audio.play();
			}
		});
	}
	
	html=[	picts[targetIndex].replace(/_/g," "),
			"<audio>",
			"    <source src='data/Montre_moi.ogg' type='audio/ogg'>",
			"    <source src='data/Montre_moi.mp3' type='audio/mp3'>",
			"</audio>"].join("\n");
	$("#targetName").html(html);
	var audio=$("#targetName audio").get(0);
	$(audio).on( "ended",function(){$("#"+picts[targetIndex]+" audio").get(0).play()});
	audio.play();
}
/* Push/Pull */
function save(origin,key,value) {
	$.get("http://siphonophore.org/interact/php/interact.php",{
		"action":"save",
		"origin":origin,
		"key":key,
		"value":JSON.stringify(value)
	},function(data) {
		console.log("save",data);
	});
}
