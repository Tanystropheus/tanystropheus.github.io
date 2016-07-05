function deleteLibBdd(id_libtit){
	var promis;
	promis = deleteInSqliteTable(db, "LibLink", "librarylstid =" + id_libtit);
	promis.then(function() {
		var promis1;
		promis1 = deleteInSqliteTable(db, "library", "libraryid =" + id_libtit);
		promis1.then(function() {
			alert("DELETE GOOD");
		},
		function() {
			alert("DELETE FAIL");
		});
	});
}

function deleteLibLstBdd(id_liblsttit){
	var promis;
	promis = deleteInSqliteTable(db, "LibLink", "librarylstid =" + id_liblsttit);
	promis.then(function() {
		var promis1;
		promis1 = deleteInSqliteTable(db, "LybraryLst", "librarylstid =" + id_liblsttit);
		promis1.then(function() {
			alert("DELETE GOOD");
		},
		function() {
			alert("DELETE FAIL");
		});
	});
}
