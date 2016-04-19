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

function maVoixSound(soundUrl, languageId, soundId) {
    this.soundid = soundId,
    this.languageid = languageId,
    this.soundurl = soundUrl
};

function maVoixText(text, languageId, textId) {
    this.soundid = textId;
    this.languageid = languageId;
    this.soundurl = text;
};

function maVoixElem(pictId, elemUrl, Width, soundUrl, languageId, soundId, text, textId) {
    this.elemid = pictId;
    this.elemurl = elemUrl;
    this.soundid = soundId;
    this.soundelem = new maVoixSound(soundUrl, languageId, soundId);
    this.textelem = new maVoixText(text, languageId, textId);
    this.width = Width;
};

function maVoixLib(libId, userId, libTitle) {
    this.libid = libId,
    this.userid = userId,
    this.title = libTitle
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
