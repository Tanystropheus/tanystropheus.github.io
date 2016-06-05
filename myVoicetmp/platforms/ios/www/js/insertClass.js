var tmp = {};

function insertLibBdd(libtit){
	var sql = "where libtitle =" + libtit;
	selectLibrary(sql, tmp, function(){
		alert(JSON.stringify(tmp));
	});
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
	var sql = "where liblsttitle =" + liblsttit;
	selectLibraryLst(sql, tmp, function(){
		alert(JSON.stringify(tmp));
	});
	if (tmp !== undefined){
		alert("CE CLASSEUR EXISTE DEJA");
	}
	else {
	insertLibrary(libtit,
		function (){alert("AJOUT CLASSEUR OK");},
		function (){alert("MERCI DE REESSSAYÉ");} );
	}
}
