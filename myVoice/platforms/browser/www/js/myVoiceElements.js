/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   maVoixElement.js                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: bsamuel <bsamuel@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/04/16 11:48:02 by bsamuel           #+#    #+#             */
/*   Updated: 2016/04/16 11:59:16 by bsamuel          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function maVoixLanguage(languageid, langname) {
    this.languageid = languageid;
	this.langname = langname;
};

function maVoixTag(tagid, tagname) {
    this.tagid = tagid;
	this.tagname = tagname;
};

function maVoixTagText(tagid, tagname, languageId, tagtextid) {
    this.tagtextid = tagtextid;
    this.languageid = languageId;
    this.tagelem = new maVoixTag(tagid, tagname);
};

function maVoixLibraryLst(tagid, tagname, libraryid, liblsttitle, librarylstid) {
    this.librarylstid = librarylstid;
    this.libraryid = libraryid;  // str contenant les id des lib de l'utilisateur
    this.liblsttitle = liblsttitle;
};

function maVoixLibrary(libraryId, userId, libTitle, lstelemid) {
    this.libraryid = libraryId;
    this.userid = userId;
    this.libtitle = libTitle;
    this.lstelemid = lstelemid; // str contenant les id des élément de la library
};

function maVoixUser(librarylstid, userId, languageid, login, password, backupurl) {
    this.languageid = languageid;
    this.userid = userId;
    this.librarylstid = librarylstid;
    this.login = login;
    this.password = password;
    this.backupurl = backupurl;
};

function maVoixGlobElemAssociation(globelemassoid, listelemid) {
    this.globelemassoid = globelemassoid;
    this.listelemid = listelemid;
};

function maVoixElemAssociation(elemassoid, userId, globelemassoid, nbuse, date) {
    this.elemassoid = elemassoid;
    this.userid = userId;
    this.globelemassoid = globelemassoid;
    this.nbuse = nbuse;
    this.date = date;
};

function maVoixElem(elemid, elemUrl, Width, soundUrl, languageId, soundId, text, textId) {
    this.elemid = elemid;
    this.elemurl = elemUrl;
    this.soundid = soundId;
    this.soundelem = new maVoixSound(soundUrl, languageId, soundId);
    this.textelem = new maVoixText(text, languageId, textId);
    this.width = Width;
};

function maVoixElemStat(elemstatid, userId, elemid, nbuse, elemassoid) {
    this.elemstatid = elemstatid;
    this.userid = userId;
    this.elemid = elemid;
    this.nbuse = nbuse;
    this.elemassoid = elemassoid;
};

function maVoixGlobElemStat(elemstatid, globelemstatid, nbuse) {
    this.elemstatid = elemstatid;
    this.globelemstatid = globelemstatid;
    this.nbuse = nbuse;
};

function maVoixSound(soundUrl, languageId, soundId) {
    this.soundid = soundId;
    this.languageid = languageId;
    this.soundurl = soundUrl;
};

function maVoixText(text, languageId, textId) {
    this.soundid = textId;
    this.languageid = languageId;
    this.soundurl = text;
};



function debugelem(elem) {
	var	htmlText = '</br></br>Object {\n';
    var text = 'Object {\n';
    for (var i in elem) {
        if (i !== 'debug') {
            htmlText += ' [' + i + '] => ' + elem[i] + ' </br>';
            text += '\t[' + i + '] => ' + elem[i] + '\n';
        }
    }
    text = text + '}';
    console.log(text);
	return htmlText;
}
