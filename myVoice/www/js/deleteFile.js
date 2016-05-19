/* ********************************************************************************************* */
/* ************************************* FONCTIONS DEL  **************************************** */
/* ********************************************************************************************* */

function pre_del(id)
{
	var tmp = {};

	var sql = "where elemid =" + id;
	selectElement(sql , tmp, function(){
		del(tmp);
	});
}
function del(tmp)
{
	window.resolveLocalFileSystemURL(tmp.elemurl, function(file) {
		file.remove(win, fail);
	});
	window.resolveLocalFileSystemURL(tmp.soundelem.soundurl, function(file) {
		file.remove(win, fail);
	});
	deleteInSqliteTable(db, "Text", "textid =" + tmp.textid);
	deleteInSqliteTable(db, "Sound", "soundid =" + tmp.soundid);
	deleteInSqliteTable(db, "Elements", "elemid =" + tmp.elemid);
}
