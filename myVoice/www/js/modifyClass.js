var tmp = {};

function modifyLibBdd(id_libtit, libtit){
	var promis;
	var sql = "where libtitle =" + libtit;
	promis = selectLibrary(sql, tmp);
	promis.then(function (){
		if (tmp[0] !== undefined){
			alert("CETTE CATEGORIE EXISTE DEJA");
		}
		else {
			tmp = new myVoiceLibraryLst(liblsttit, " ");
			tmp.librarylstid = id_libtit;
			var promis1 = updateLibrary(tmp);
			promis1.then(function() {
				alert("MODIFY GOOD");
			},
			function() {
				alert("MODIFY FAIL");
			});
		}
	});
}


function modifyLibLstBdd(id_liblsttit, liblsttit){
	var promis;
	var sql = "where liblsttitle =" + liblsttit;
	promis = selectLibraryLst(sql, tmp);
	promis.then(function (){
		if (tmp[0] !== undefined){
			alert("CE CLASSEUR EXISTE DEJA");
		}
		else {
			var promis1;
			tmp = new myVoiceLibraryLst(liblsttit, " ");
			tmp.librarylstid = id_liblsttit;
			promis1 = updateLibraryLst(tmp);
			promis1.then(function() {
				alert("MODIFY GOOD");
			},
			function() {
				alert("MODIFY FAIL");
			});
		}
	});
}
