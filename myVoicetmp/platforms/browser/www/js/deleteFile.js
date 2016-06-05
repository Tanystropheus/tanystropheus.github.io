/* ********************************************************************************************* */
/* ************************************* FONCTIONS DEL  **************************************** */
/* ********************************************************************************************* */
var tmp = {};

function pre_del(id)
{
	var sql = "where elemid =" + id;
	selectElement(sql , tmp, function(){
		del(tmp);
	});
}
function del(tmp)
{
	window.resolveLocalFileSystemURL(tmp.elemurl, function(file) {
		file.remove(win, fail);
		alert("del image GOOD");
	});
	if (tmp.soundid !== undefined) {
	window.resolveLocalFileSystemURL(tmp.soundelem.soundurl, function(file) {
		file.remove(win, fail);
		alert("del son GOOD");
	});
	}
	deleteInSqliteTable(db, "Sound", "soundid =" + tmp.soundid);

	sql = "where textid =" + tmp.textid;
	selectElements(sql, tmp);
	if (tmp[1] === undefined){
		deleteInSqliteTable(db, "Text", "textid =" + tmp.textid);}
	deleteInSqliteTable(db, "LibElem", "elemid =" + tmp.elemid);
	deleteInSqliteTable(db, "Elements", "elemid =" + tmp.elemid);
}
