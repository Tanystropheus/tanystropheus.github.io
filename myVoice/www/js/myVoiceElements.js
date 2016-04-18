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

function maVoixSong(songUrl, languageId, songId) {
    this.songid = songId,
    this.languageid = languageId,
    this.songurl = songUrl
};

function maVoixElem(pictId, elemUrl, Width, Height, songUrl, languageId, songId) {
    this.elemid = pictId,
    this.elemurl = elemUrl,
    this.songelem = songUrl,
    //this.songelem = maVoixSong(songUrl, languageId, songId),
    this.width = Width,
    this.height = Height,
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
