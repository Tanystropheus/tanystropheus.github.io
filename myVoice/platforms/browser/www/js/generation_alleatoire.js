//  Variable Globale:
var all_elem = [];
var all_elem_stat = [];
// var time_begin;
// var time_end;
// var all_phrase_stat = [];


paper.install(window);
// Keep global references to both tools, so the HTML
// links below can access them.
var tool1, tool2, tool_diag;

window.onload = function()
{
    paper.setup('myCanvas');
}

function add_one_sentence_to(sentence)
{    
    var mili_in_day = 86400000;
    var dist = 15 + parseInt(Math.random() * 5);
    var i = 0;
    var val = 0;
    var count = 0;
    var group_img = [];

    while(i < all_elem.length)
    {
        // console.log('yolo');
        val = parseInt(Math.random() * dist) + Math.random() + 1;

        i +=  val;
        if (i > all_elem.length)
            break;

            group_img[count] = i;     
            count++;
        }

        sentence[sentence.length] = new myVoiceSentence(sentence.length, group_img, Date.now() - ((Math.random() * mili_in_day * 30)));
        // console.log("sentenceId:"+(sentence.length - 1));
        // console.log(sentence[sentence.length - 1]);
         actual_elem_stat(sentence[sentence.length - 1]);
//         actual_sentence_stat(sentence[sentence.length - 1]);
}

function gen_x_sentence_in(nb, sentence_tab)
{
    get_image(all_elem);
    for(var i = 0; i < nb; i++)
    {
        // console.log("i:"+i);
        add_one_sentence_to(sentence_tab);
    }
    // console.log(sentence_tab);
 //   sentence_tab.sort(cmp_sentence);
}

function actual_elem_stat(sentence)
{
    var indice = 0;
    for (var x in sentence['listElemId'])
    {
        indice = parseInt(sentence['listElemId'][x]);
        // console.log("indice:"+indice);
//                console.log("indice:"+indice);
        if (all_elem_stat[indice] == undefined)
        {
            console.log("OUI");
            all_elem_stat[indice] = new elem_stat();
            all_elem_stat[indice]['nb'] = 0;
        }
        // console.log('LL');
        all_elem_stat[indice]['elemId'] = indice;
        all_elem_stat[indice]['lst_senstenceId'][all_elem_stat[indice]['nb_use']] = sentence['sentenceId'];
        all_elem_stat[indice]['nb_use']++;
    }
}


function get_image(lst_elem)
{
     var lst_img = document.getElementsByClassName('img_stat');
    
    for(var x = 0; x < lst_img.length; x++)
    {
        lst_elem[lst_img.item(x).id] = new myVoiceElem(lst_img.item(x).id, lst_img.item(x).src, lst_img.item(x).width, 0, x, x, lst_img.item(x).alt, true);
             all_elem_stat[x] = new elem_stat();

    }
    // console.log(lst_elem);
}


