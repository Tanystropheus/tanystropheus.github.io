/* ********************************************************************************************* */
/* ************************************* FONCTIONS MODIFY ************************************** */
/* ********************************************************************************************* */
var tmpelem = {};
var tmpson = {};
var tmptexte = {};
/* ********************************************************************************************* */
/* ************************************* FONCTIONS SQL ***************************************** */
/* ********************************************************************************************* */

function pre_modify(id) {
	var promis;
	var sql = "where elemid =" + id;
	promis = selectElements(sql, tmpelem);
	promis.then(function () {
		pre_modify1();
	});
}
function pre_modify1() {
	var promis;
	sql = "where textid =" + tmpelem[0].textid;
	promis = selectText(sql, tmptexte);
	promis.then(function (){
		if (tmpelem[0].sound !== undefined) {
		selectSound(sql, tmpson);}});
}

function updateBdd(){
	var promis;

	var tname = Elements;
	var set = "width =" + tmpelem[0].width;
	var cond = "elemid =" + tmpelem[0].elemid;
	promis = updateInSqliteTable(tname, set, cond);
	promis.then(function () {
		tname = Text;
		set = "text =" + tmptexte[0].text;
		cond = "textid =" + tmpelem[0].textid;
		updateInSqliteTable(tname, set, cond);
	});
}

/* ********************************************************************************************* */
/* ************************************* FONCTIONS TEXT **************************************** */
/* ********************************************************************************************* */

function modifyName() {
	if (document.getElementById('name').value !== undefined) {
		tmptexte[0].text = document.getElementById('name').value;
		alert(JSON.stringify(tmp));
	}
	else {
		alert("merci de mettre un text");
	}
}
