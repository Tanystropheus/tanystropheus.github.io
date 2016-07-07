/* ********************************************************************************************* */
/* ************************************* FONCTIONS DEL  **************************************** */
/* ********************************************************************************************* */
var tmp = {};

function pre_del(id)
{
	var sql = "where elemid =" + id;
	var promis;

	promis = selectElements('', tmp, null);
    promis.then(function(){
			del(tmp);},
		function(){alert("PROBLEME BASE DE DONNEE");});
}
function del(tmp)
{
	var promis;

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
	promis = deleteInSqliteTable(db, "Sound", "soundid =" + tmp.soundid);
	promis.then(function () {
		del1(); });
}
function del1(tmp) {
	tmp = undefined;

	sql = "where textid =" + tmp.textid;
	promis = selectElements(sql, tmp);
	promis.then(function(){
		del2(tmp);}, function(){alert("PROBLEME BASE DE DONNEE");});
}

function del2(tmp){
	deleteInSqliteTable(db, "Text", "textid =" + tmp.textid);
	deleteInSqliteTable(db, "LibElem", "elemid =" + tmp.elemid);
	deleteInSqliteTable(db, "Elements", "elemid =" + tmp.elemid);
}
