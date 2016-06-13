    
/*

afficher les donner
orgniser les donner



-   les image   ->  leur nombre d'utillisation
                ->  toute les phrase dans les quelle elle est presnte

-   les phrase  ->  en fonction du temp + (selection de une phrase)
                ->  definir toute les phrase differente
                ->  


*/



    paper.install(window);
    // Keep global references to both tools, so the HTML
    // links below can access them.
    var tool1, tool2, tool_diag;

    window.onload = function() {
        paper.setup('myCanvas');
    }


// variable globale:
    var all_elem = [];
    var all_phrase = [];
    var all_elem_stat = [];
    var all_phrase_stat = [];
    var group_grid;

    var tool_time;


    function    f2()
    {
        // mix_all_test();
        globale_senar_1();
    }



/*
function myVoiceGlobaleSentence(globaLsentenceId, listElemId, listTime) {
    this.global_sentenceId = globaLsentenceId;
    this.list_time = listTime;
    this.nb_use = listTime.lenght;
    this.list_elemId = listElemId;
    this.updatedb = function(){
        alert("db update func not yet created");
    };
};

*/

 //   gen_x_sentence_in(10, phrase);

//    console.clear();
 //   console.log(phrase);

        function    print_sentence(sentence)
        {
            var tmp = 0;
            result = "";
            for (x in sentence['listElemId'])
            {
                tmp = parseInt(sentence['listElemId'][x]);
                result += "["+tmp+"]";
            }
            console.log(result);
        }

        function the_test()
        {
            var size = 1000;
            var memory = [];
            var mem = 0;

            for(var x =0; x < size; x++)
            {
                mem = 0;
                for (var y = 0; y < 10; y++)
                {
                    mem += Math.random();
                }
        //        console.log(mem);
                memory[x] = parseInt(mem);
            }
         //   memory.sort();
        //    console.log(memory);
        }


        // function f2()
        // {
            
        //     // var group = new Group();

        //     // var pt_tl = new Point(30, 10);
        //     // var pt_br = new Point(400, 200);

        //     // console.log("youuuouy");
        //     // draw_the_grid(-49, 422, 5, group, pt_tl, pt_br);
        //     // f3();
        //     // draw_pie_chart(all_elem_stat);
        //     all_phrase.sort(cmp_sentence);
        //     console.log("+++++++++++++++++++++++++++");
        //     console.clear();
        //     for (var x in all_phrase)
        //     {
        //         print_sentence(all_phrase[x]);
        //     }

        //     // the_test();
        //     console.log("===========================");
        // }
//*
        
        function f3()
        {
            gen_x_sentence_in(200, all_phrase);
            all_phrase.sort(cmp_sentence);
      //      console.clear();
     //       console.log(all_phrase);
        }

        function get_image(lst_elem)
        {
             var lst_img = document.getElementsByClassName('img_stat');
            
            for(var x = 0; x < lst_img.length; x++)
            {
                lst_elem[lst_img.item(x).id] = new myVoiceElem(lst_img.item(x).id, lst_img.item(x).src, lst_img.item(x).width, 0, x, x, lst_img.item(x).alt, true);
   //             all_elem_stat[x] = new elem_stat();

            }
        }

        function gen_x_sentence_in(nb, sentence_tab)
        {
            get_image(all_elem);
            for(var i = 0; i < nb; i++)
            {
                add_one_sentence_to(sentence_tab);
            }
         //   sentence_tab.sort(cmp_sentence);
        }

        function actual_elem_stat(sentence)
        {
            var indice = 0;
            for (var x in sentence['listElemId'])
            {
                indice = sentence['listElemId'][x];
//                console.log("indice:"+indice);
                if (all_elem_stat[indice] == undefined)
                {
                    console.log("OUI");
                    all_elem_stat[indice] = new elem_stat();
                    all_elem_stat[indice]['nb'] = 0;
                }
                all_elem_stat[indice]['elemId'] = indice;
                all_elem_stat[indice]['lst_senstenceId'][all_elem_stat[indice]['nb_use']] = sentence['sentenceId'];
                all_elem_stat[indice]['nb_use']++;
            }
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
                val = parseInt(Math.random() * dist) + Math.random() + 1;

                i +=  val;
                if (i >= all_elem.length)
                    break;
// ancience version (tebleau d'objet au lieu d'id) group_img[count] = all_elem[i];
                group_img[count] = i;     
                count++;
            }

            sentence[sentence.length] = new myVoiceSentence(sentence.length, group_img, Date.now() - ((Math.random() * mili_in_day * 30)));
 //           console.log("sentenceId:"+(sentence.length - 1));
             actual_elem_stat(sentence[sentence.length - 1]);
//             actual_sentence_stat(sentence[sentence.length - 1]);
        }

        function cmp_time(a, b)
        {
           //  console.log(a['time']);
            // console.log(b);
            return (a['time'] - b['time']);
        }

        function min(a, b)
        {
            if (a >= b)
            {
                return (b);
            }
            else
            {
                return (a);
            }
        }

        function cmp_sentence(a, b)
        {
           //  console.log(a['time']);
            // console.log(b);
            var x = 0;
            var id = min(a['listElemId'].length, b['listElemId'].length);

            // if (a['listElemId'].length != b['listElemId'].length)
            // {
            //     return (a['listElemId'][id] - b['listElemId'][id]);
            // }
            // else
            // {
                var mem = a['listElemId'][nb] - b['listElemId'][nb];
                // console.log("==");
                // console.log(a);
                // console.log(b);
                // console.log(mem);
                for (var nb = 0 ; nb < id; nb++ )
                {
                    if (parseInt(a['listElemId'][nb]) != parseInt(b['listElemId'][nb]))
                    {
                        return (parseInt(b['listElemId'][nb]) - parseInt(a['listElemId'][nb]));
                    }
                }
                if (a['listElemId'].length >= b['listElemId'].length)
                    return (-1);
                else
                    return (1);
                // console.log("**");
        }
            // return (a['time'] - b['time']);
        // }


        // function draw_plot(tab, val_name)
        // {
        //     for (var x in tab)
        //     {
        //         tab[x][val_name];
        //     }
        // }

// function    actualise_curve()
// {
//     // il faut determiner le max de toute les courbe
// }




/*
    -afficher les graphe avec un max pre defini.                DONE
    -allouer et liere/detruire des objet                        DONE
    -definir un maximum                                         DONE
    -afficher les ligne avec ce maximum                         DONE
    -afficher la grille                                         DONE



    -definir un curseur pour mobifier les borne ou l'interval
        -curseur additif;

    -faire la meme chose pour les phrase
    -representation en arbre des phrase
    -classification temporel avec les genre de box
*/

/*
                border-style: solid;
                border-color: green;
*/

function    border_if_actif(elem)
{
    if (elem.style.border == "")
        elem.style.border = "solid";
    else
        elem.style.border = "";
}

var group_grid;
var grp_curseur;

function f1(elem)
{
    //console.log(elem.style);
    
    // var from = new Point(30, 30);
    // var to = new Point(view.size.width - 30, view.size.height / 3);
    // var max = 0;
    // var nb_line = 10;

    border_if_actif(elem);
    if (group_grid == undefined)
        group_grid = new Group();
    group_grid.removeChildren();

    invert_state(parseInt(elem.id));

    actual_draw();

//     max = define_max();
// //    alert("max:"+max);
//     if (max != 0)
//     {
//         draw_the_grid(0, max, nb_line, group_grid, from, to);
//         for(var x in all_elem)
//         {
//             draw_line(parseInt(x), from, to, max);
//         }
//     }
}

function    actual_draw()
{

    var from = new Point(30, 30);
    var to = new Point(view.size.width - 30, view.size.height / 3);
    var max = 0;
    var nb_line = 10;
    max = define_max();
    //    alert("max:"+max);
    if (group_grid == undefined)
    {
        group_grid = new Group();
    }
    if (group_grid.isEmpty() == false)
    {
        group_grid.removeChildren();
    }
    if (max != 0)
    {
        draw_the_grid(0, max, nb_line, group_grid, from, to);
        for(var x in all_elem)
        {
            draw_line(parseInt(x), from, to, max);
        }
    }
}


        function curseur_time()
        {
            // console.log(all_elem_stat);
            //
            if (tool_time == undefined)
            {
                tool_time = new Tool();
            }

            tool_time.onMouseUp = function(event) {
                actual_draw();
                // Create a new path every time the mouse is clicked
                // path = new Path();
                // path.add(event.point);
                // path.strokeColor = 'black';
            }
          //  tool_time.onMouse


            //   console.log(get_time_interval());
            // console.log("time _unite:"+get_time_unite());
 //           actu_line(elem_id, from, to, max);
  //          actualise_curve();
            var from = new Point(30, 30);
            var to = new Point(view.size.width - 30, view.size.height / 3);

            if (grp_curseur == undefined)
            {
                grp_curseur = new Group();
            }
            draw_unite_curseur(from, to, grp_curseur);

        }



        function f4()
        {

           // f3();
           draw_histogram(all_elem_stat);

            // for (x in all_elem)
            // {
            //     if (all_elem_stat[x] == undefined)
                    // console.log("elem_stat:"+(x)+" get fuck");
            //     if (all_elem[x] == undefined)
            //         console.log("elem:"+(x)+" get fuck");
            // }
            
        }


/*
    on genere des nombre puis on les affiche dans l'ordre

*/

        function    stage(tab_indice, the_phrase)
        {
            var tab_result = [];
            var begin = find_begin(tab_indice);
            var end = find_end(tab_indice);
            var cmp = tab_indice.length;
        }

/*
    On donne un indice min, un indice max, un donne un endroi ou regarder et ca renge tout seul les cathegorie
*/

        function f5()
        {
             //all_phrase.sort(cmp_sentence);
      //       stage([], all_phrase);
         //   all_phrase[0]['list_elemId']
            console.clear();
            

            // console.log(parseInt(all_phrase[0]['listElemId']));
            // console.log(all_phrase[0]['listElemId']);
            var prev = parseInt(all_phrase[0]['listElemId'][0]);
            var conteur = 0;
            for (var i = 0 ; i < all_phrase.length; i++)
            {
                all_phrase[i]['listElemId'][0] = parseInt(all_phrase[i]['listElemId'][0]);

                if (all_phrase[i]['listElemId'][0] != prev)
                {

                    if (Number.isInteger(all_phrase[i]['listElemId'][0]))
                    {

                        console.log("=====>  ["+prev+"]"+conteur+"  i:"+i);
                        conteur = 0;
                        // if(!Number.isInteger(prev))
                        // {
                        //     console.log(prev);
                        // }
                        prev = all_phrase[i]['listElemId'][0];
                    }
                    else
                    {
                        console.error("AiAIAI");
                        console.log("i:"+i);
                        // console.log(all_phrase[i])
                        // console.log(prev);
                        console.error("NON NON NON")
                    }
                }

                // if(!(Number.isInteger(all_phrase[i]['listElemId'][0])))
                //     {
                //         console.error("AiAIAI");
                //         console.log("i:"+i);
                //         console.log(all_phrase[i])
                //         console.log(prev);
                //         console.error("NON NON NON")
                //     }

                // if (all_phrase[i]['listElemId'][0] == NaN || all_phrase[i]['listElemId'][0] == undefined)
                // {
                //     console.log("i:"+i);
                //     console.log(all_phrase[i])
                //     console.log(prev);
                //     console.error("NON NON NON");
                // }
                conteur++;
            }
            console.log("=====>  ["+prev+"]"+conteur+"  i:"+(all_phrase.length - 1))

             var x = 0;
             var ref = parseInt(all_phrase[0]['listElemId'][x]);
            console.log(ref);
        }