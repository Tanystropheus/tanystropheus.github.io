var tmp = {};

function modifyLibBdd(id_libtit, libtit){
	var sql = "where libtitle =" + libtit;
	selectLibrary(sql, tmp, function(){
		alert(JSON.stringify(tmp));
	});
	if (tmp[0] !== undefined){
		alert("CETTE CATEGORIE EXISTE DEJA");
	}
	else {
		tmp = new myVoiceLibraryLst(liblsttit, " ");
		tmp.librarylstid = id_libtit;
		updateLibrary(tmp);
	}
}

function modifyLibLstBdd(id_liblsttit, liblsttit){
	var sql = "where liblsttitle =" + liblsttit;
	selectLibraryLst(sql, tmp, function(){
		alert(JSON.stringify(tmp));
	});
	if (tmp[0] !== undefined){
		alert("CE CLASSEUR EXISTE DEJA");
	}
	else {
		tmp = new myVoiceLibraryLst(liblsttit, " ");
		tmp.librarylstid = id_liblsttit;
		updateLibraryLst(tmp);
	}
}
