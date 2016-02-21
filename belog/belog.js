var belog={};
belog.library=[];
belog.gallery=[];
belog.log=[];
belog.state={
	showLibrary:false,
	showGallery:true,
	showStatistics:false
}
var dbroot="http://siphonophore.org/interact/php/interact.php";
$('#show-gui').click(function(){
	belog.state.showGallery=true;
	belog.state.showLibrary=false;
	belog.state.showStatistics=false;
	displayInterface();
});
$('#show-lib').click(function(){
	belog.state.showGallery=false;
	belog.state.showLibrary=true;
	belog.state.showStatistics=false;
	displayInterface();
});
$('#show-stats').click(function(){
	belog.state.showGallery=false;
	belog.state.showLibrary=false;
	belog.state.showStatistics=true;
	displayInterface();
	displayStatistics();
});
$("#add-lib").click(function(e){
	e.stopPropagation();
	var name=prompt("Action name:");
	var h=hash(name);
	var a={id:h,name:name}
	if(indexOf(belog.library,a)>=0) {
		alert("Action exists already in the library");
		return;
	}
	addActionToLibrary(a);
});

function startFirebug() {
	var fb = document.createElement('script');
	fb.type = 'text/javascript';
	fb.src = 'https://getfirebug.com/firebug-lite.js#startOpened';
	document.getElementsByTagName('body')[0].appendChild(fb);
}
//startFirebug();

function indexOf(arr,elem) {
	var i;
	for(i=0;i<arr.length;i++) {
		if(arr[i].id==elem.id && arr[i].name==elem.name)
			return i;
	}
	return undefined;
}
function hash(str) {
	var i,v0,v1,abc="0123456789" +"abcdefghijklmnopqrstuvwxyz" +"ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	v0=0;
	for(i=0;i<str.length;i++) {
		v1=str.charCodeAt(i);
		v0+=v0+v0^v1;
	}
	var sz=abc.length,v,res="";
	for(i=0;i<5;i++) {
		v1=parseInt(v0/sz);
		v=Math.abs(v0-v1*sz);
		res+=abc[v];
		v0=v1;
	}
	return res;
}

function displayInterface() {
	belog.state.showLibrary?$('#library').show():$('#library').hide();
	belog.state.showGallery?$('#gallery').show():$('#gallery').hide();
	belog.state.showStatistics?$('#statistics').show():$('#statistics').hide();
}
function addActionToLibrary(a) {
	console.log("add to library:",a.name,a.id);
	belog.library.push(a);
	var newAction=$("#action-template").clone();
	newAction.removeAttr("id");
	newAction.attr('id',a.id);
	newAction.find("span.name").text(a.name);
	newAction.appendTo("#library");
	
	newAction.find('.del-gui').click(function(e){
		e.stopPropagation();
		var response=confirm('Remove this action from the gallery');
		if(!response)
			return;
		this.parentNode.parentNode.removeChild(this.parentNode);
		belog.gallery.splice(indexOf(belog.gallery,a),1);
		
		var newAction=$('#'+a.id);
		newAction.find('.add-gui').attr('disabled',false);
	});
	newAction.find('.del-lib').click(function(e){
		e.stopPropagation();
		var response=confirm("Remove this action from the library");
		if(!response)
			return;
		$(".action#"+a.id).remove();
		belog.library.splice(indexOf(belog.library,a),1);
		belog.gallery.splice(indexOf(belog.gallery,a),1);
	});
	newAction.find('.edit-lib').click(function(e){
		e.stopPropagation();
		alert("[This should allow to edit the action, its icon for example]")
	});
	newAction.find('.add-gui').click(function(e){
		e.stopPropagation();
		if(indexOf(belog.gallery,a)>=0) {
			alert("This action exists already in gallery");
			return;
		}
		addActionToGallery(a);
	});
}

function addActionToGallery(a) {
	console.log("add to gallery:",a.name);
	belog.gallery.push(a);
	var newAction=$('#'+a.id);
	newAction.find('.add-gui').attr('disabled',true);
	var galleryAction=newAction.clone(true).appendTo("#gallery");
	galleryAction.click(function(e){
		e.stopPropagation();
		var action={id:a.id,name:a.name,time:new Date()};
		belog.log.push(action);
		galleryAction.addClass('pressed');
		
		$.ajax({
			url:dbroot,
			type:"POST",
			data:{
				"action":"save",
				"origin":JSON.stringify("belog-dev"),
				"key":"action",
				"value":JSON.stringify(action)
			},
			success: function(data) {
				console.log("< interactSave: logged action "+a.name);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("< interactSave: ERROR: "+textStatus+" "+errorThrown);
			}
		});
		
		setTimeout(function(){
			galleryAction.removeClass('pressed');
		},200);
	});
}

function displayStatistics() {
	var i;
	var html;
	html=[
		'<table>',
		'<tr>',
		'<th>Date</th>',
		'<th>Time</th>',
		'<th>Action</th>',
		'<th>Code</th>',
		'</tr>'
	].join("");
	for(i=0;i<belog.log.length;i++) {
		var d=new Date(belog.log[i].time);
		html+=[
			'<tr>',
			'<td>',d.toLocaleDateString(),'</td>',
			'<td>',d.toLocaleTimeString(),'</td>',
			'<td>',belog.log[i].name,'</td>',
			'<td>',belog.log[i].id,'</td>',
			'</tr>'
		].join("");
	}
	html+="</table>";
	$('#statistics').html(html);
}
function configure(stored) {
	console.log(stored);
	var i;
	// add actions to library
	for(i=0;i<stored.library.length;i++) {
		addActionToLibrary(stored.library[i]);
	}
	// add actions to gallery
	for(i=0;i<stored.gallery.length;i++) {
		addActionToGallery(stored.gallery[i]);
	}
	// load log
	belog.log=stored.log;
}

$(window).bind('load', function() {
	var stored=localStorage.getItem('belog');
	if(stored!=undefined) {
		console.log(stored);
		stored=JSON.parse(stored);
		configure(stored);
	}
	else
		$('body').append('localStorage is empty<br/>');
	displayInterface();
});
$(window).unload(function(){
	localStorage.setItem('belog',JSON.stringify(belog));
});

displayInterface();