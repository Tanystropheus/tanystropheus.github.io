function deleteLibBdd(id_libtit){
	deleteInSqliteTable(db, "LibLink", "librarylstid =" + id_libtit);
	deleteInSqliteTable(db, "library", "libraryid =" + id_libtit);
}

function deleteLibLstBdd(id_liblsttit){
	deleteInSqliteTable(db, "LibLink", "librarylstid =" + id_liblsttit);
	deleteInSqliteTable(db, "LybraryLst", "librarylstid =" + id_liblsttit);
}
