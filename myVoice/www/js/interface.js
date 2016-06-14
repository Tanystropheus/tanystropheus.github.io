// function (){}


function elem_stat()
{
    this.elemId = 0;
    this.nb_use = 0;
    this.lst_senstenceId = [];
}

function myVoiceSentence(sentenceId, listElemId, time) {
	this.sentenceId = sentenceId;
	this.listElemId = listElemId;
	this.time = time;
	this.updatedb = function(){
		alert("db update func not yet created");
	};
};

function myVoiceGlobaleSentence(globaLsentenceId, listElemId) {
	this.global_sentenceId = globaLsentenceId;
	this.list_time = [];
	this.nb_use = 0;
	this.list_elemId = listElemId;
	this.updatedb = function(){
		alert("db update func not yet created");
	};
};


var all_phrase = [];

function    border_if_actif(elem)
{
    if (elem.style.border == "")
        elem.style.border = "solid";
    else
        elem.style.border = "";
}

function	f1(elem)
{
    border_if_actif(elem);
    histo_line(parseInt(elem.id));
}

function	f2()
{
	draw_pie_chart(all_elem_stat);
}

function	f3()
{
	gen_x_sentence_in(200, all_phrase);
}

function	f4()
{
	draw_histogram(all_elem_stat);
}

function	f5()
{
	
}