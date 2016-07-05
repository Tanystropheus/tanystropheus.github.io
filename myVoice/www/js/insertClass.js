var tmp = {};

function insertLibBdd(libtit){
	var promis;
	var sql = "where libtitle =" + libtit;
	promis = selectLibrary(sql, tmp, function(){
		alert(JSON.stringify(tmp));
	});
	promis.then(function (){
		insertLibBdd2(libtit, tmp);},
		function (){alert("PROBLEME BDD");});
}

function insertLibBdd2(libtit, tmp){
	if (tmp !== undefined){
		alert("CETTE CATEGORIE EXISTE DEJA");
	}
	else {
	insertLibrary(libtit,
		function (){alert("AJOUT CATEGORIE OK");},
		function (){alert("MERCI DE REESSSAYÉ");} );
	}
}


function insertLibLstBdd(liblsttit){
	var promis;
	var sql = "where liblsttitle =" + liblsttit;
	promis = selectLibraryLst(sql, tmp, function(){
		alert(JSON.stringify(tmp));
	});
	promis.then(function(){
		insertLibLstBdd2(liblsttit, tmp);},
		function(){alert("PROBLEME BDD");});
}
function insertLibLstBdd2(liblsttit, tmp){
	if (tmp !== undefined){
		alert("CE CLASSEUR EXISTE DEJA");
	}
	else {
	insertLibraryLst(liblsttit,
		function (){alert("AJOUT CLASSEUR OK");},
		function (){alert("MERCI DE REESSSAYÉ");} );
	}
}
