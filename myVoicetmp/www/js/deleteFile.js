/* ********************************************************************************************* */
/* ************************************* FONCTIONS DEL  **************************************** */
/* ********************************************************************************************* */

function pre_del(id)
{
	var sql = "where elemid =" + id;
	selectElements(sql, tmp);
	tmpelem = tmp[id];
	if (tmp[id].soundid !== undefined) {
		sql = "where soundid =" + tmpelem.soundid;
		selectSound(sql, tmp);
		window.resolveLocalFileSystemURL(tmp[tmpelem.soundid].soundurl, function(file) {
			file.remove(win, fail);
			alert("del son GOOD");
		});
		deleteInSqliteTable(db, "Sound", "soundid =" + tmpelem.soundid);
	}
	sql = "where textid =" + tmpelem.textid;
	selectText(sql, tmp);
	deleteInSqliteTable(db, "Text", "textid =" + tmpelem.textid);}

	window.resolveLocalFileSystemURL(t.elemurl, function(file) {
		file.remove(win, fail);
	});
	deleteInSqliteTable(db, "LibElem", "elemid =" + tmpelem.elemid);
	deleteInSqliteTable(db, "Elements", "elemid =" + tmpelem.elemid);
}
