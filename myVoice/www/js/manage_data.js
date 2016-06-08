/*

function myVoiceSentence(sentenceId, listElemId, time) {
	this.sentenceId = sentenceId;
	this.listElemId = listElemId;
	this.time = time;
	this.updatedb = function(){
		alert("db update func not yet created");
	};
};

function myVoiceGlobaleSentence(globaLsentenceId, listElemId, listTime) {
	this.global_sentenceId = globaLsentenceId;
	this.list_time = listTime;
	this.nb_use = listTime.lenght;
	this.list_elemId = listElemId;
	this.updatedb = function(){
		alert("db update func not yet created");
	};
};

    var all_elem = [];
    var all_phrase = [];
    var all_elem_stat = [];
    var all_phrase_stat = [];
*/

		function is_same_array_number(tab1, tab2)
		{
			// console.log("is_same_array_number");
			if (tab1.length != tab2.length)
			{
				// console.log("the havent de same lenght");
				return (false);
			}
			for (var x in tab1)
			{
				if (tab1[x] != tab2[x])
				{
					// console.log("they are just different tab1:"+tab1+"  tab2:"+tab2);
					return (false);
				}
			}
			// console.log("they are the same");
			return (true);
		}

        function get_indice(sentence, sentence_tab)
        {
        	// console.log("get_indice");
        	var length = 0;
            for (var x in sentence_tab)
            {
            	if (is_same_array_number(sentence.listElemId, sentence_tab[x].list_elemId))
            	{
            		if (x == undefined)
            		{
            			console.error("c'est le x qui chie");
            		}
            		return (x);
            	}
            	length++;
            }
            if (sentence_tab.length == undefined)
            {
            	console.error("c'est le lenght qui chie");
            	return (lenght);
            }
            return (sentence_tab.length);
        }
        
        function    actual_sentence_stat(sentence)
        {
        	// console.log("actual_sentence_stat");
            var indice = get_indice(sentence, all_phrase_stat);
            var indice_time = 0;

            // console.log("indice"+indice);
            if (all_phrase_stat[indice] == undefined)
            {
            	all_phrase_stat[indice] = new myVoiceGlobaleSentence(indice, sentence.listElemId);
            }
            indice_time = all_phrase_stat[indice].nb_use;
            // console.log("indice_time"+indice_time);
            all_phrase_stat[indice].list_time[indice_time] = sentence.time;
            all_phrase_stat[indice].nb_use++;
        }

