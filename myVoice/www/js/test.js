 
/*

afficher les donner
orgniser les donner



-   les image   ->  leur nombre d'utillisation
                ->  toute les phrase dans les quelle elle est presnte

-   les phrase  ->  en fonction du temp + (selection de une phrase)
                ->  definir toute les phrase differente
                ->  


*/
    function elem_stat()
    {
        this.elemId = 0;
        this.nb_use = 0;
        this.lst_senstenceId = [];
    }


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



 //   gen_x_sentence_in(10, phrase);

//    console.clear();
 //   console.log(phrase);




        function f2()
        {
            
            // var group = new Group();

            // var pt_tl = new Point(30, 10);
            // var pt_br = new Point(400, 200);

            // console.log("youuuouy");
            // draw_the_grid(-49, 422, 5, group, pt_tl, pt_br);
            f3();
            draw_pie_chart(all_elem_stat);
        }
//*
        
        function f3()
        {
            gen_x_sentence_in(20, all_phrase);
      //      console.clear();
     //       console.log(all_phrase);
        }

        function get_image(lst_elem)
        {
             var lst_img = document.getElementsByClassName('img_stat');
            
            for(var x = 0; x < lst_img.length; x++)
            {
                lst_elem[x] = new myVoiceElem(x, lst_img.item(x).src, lst_img.item(x).width, 0, x, x, lst_img.item(x).alt, true);
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
        }

        function actual_elem_stat(sentence)
        {
            var indice = 0;
            for (var x in sentence['listElemId'])
            {
                indice = sentence['listElemId'][x];

                if (all_elem_stat[indice] === undefined)
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
            var mili_in_day = 1440000;
            var dist = 10 + parseInt(Math.random() * 5);
            var i = 0;
            var val = 0;
            var count = 0;
            var group_img = [];

            while(i < all_elem.length)
            {
                val = parseInt(Math.random() * dist) + 1;

                i +=  val;
                if (i >= all_elem.length)
                    break;
// ancience version (tebleau d'objet au lieu d'id) group_img[count] = all_elem[i];
                group_img[count] = i;     
                count++;
            }

            sentence[sentence.length] = new myVoiceSentence(sentence.length, group_img, parseInt(Date.now() - (Math.random() * mili_in_day * 30)));
             actual_elem_stat(sentence[sentence.length - 1]);
        }

        function cmp_time(a, b)
        {
           //  console.log(a['time']);
            // console.log(b);
            return (a['time'] - b['time']);
        }

        // function draw_plot(tab, val_name)
        // {
        //     for (var x in tab)
        //     {
        //         tab[x][val_name];
        //     }
        // }

        function f5()
        {

        //     actual_elem_stat(all_phrase[parseInt(Math.random() * 20)]);
            for (var x in all_elem_stat)
            {
                console.log("lst ["+x+"]");
       //         console.log();
                console.log(all_elem_stat[x]['lst_senstenceId']);
            }

        }

        function f4()
        {

            f3();
            draw_histogram(all_elem_stat);
            
        }
