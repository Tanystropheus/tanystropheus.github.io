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

function maVoixElem(pictId, elemUrl, songUrl, Width, Height) {
    this.pictid = pictId;
    this.elemurl = elemUrl,
    this.songurl = songUrl,
    this.width = Width,
    this.height = Height,
    
    console.log('debut new elem avec: ' + pictId + ' ' + elemUrl + ' ' + songUrl + ' ' + Width + ' ' + Height + ' ');
    this.toLinkConv = function(document, whereToPlace){
        //debugelem(document);
        this.elemurl = "img/logo.png";
        var elem = document.getElementById(this.pictid);
        if (elem !== null){
            elem.setAttribute("src", this.elemurl);
            elem.setAttribute("height", this.height);
            elem.setAttribute("width", this.width);
        } else {
            var elem = document.createElement("img");
            elem.setAttribute("id", this.pictid);
            elem.setAttribute("src", this.elemurl);
            elem.setAttribute("height", this.height);
            elem.setAttribute("width", this.width);
            whereToPlace.appendChild(elem);
        }
    }
};

function maVoixLib() {
    this.libid = undefined;
    this.userid = undefined,
    this.title = undefined
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
