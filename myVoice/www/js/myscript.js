 // Switch mode
            $(document).ready(function(){
                $("#button_param").click(function() {
                    if ($('#select-based-flipswitch').val() == "leave") {
                        $.mobile.changePage('#usepage', { transition: "slide"} );
                    }
                    else if ($('#select-based-flipswitch').val() == "arrive") {
                        // Check form
                        $("#popupSave").popup("open");
                        $("#button_form").click(function() {
                            if ($("#fname").val().length > 0 
                                && $("#factivity").val().length > 0
                                && $("#flocation").val().length > 0) {
                                    $.mobile.changePage('#learningpage', { transition: "slide"} );
                            }
                            else {
                                console.log("ERREUR");
                            }
                        });
                    }
                });

                // sortable and drag & drop elements
                $( ".column" ).sortable({
                    connectWith: ".column",
                    handle: ".portlet-content",
                    placeholder: "portlet-placeholder ui-corner-all"
                });
             
                $( ".portlet" )
                    .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
                    .find( ".portlet-header" )
                    .addClass( "ui-widget-header ui-corner-all" )
                    .find( ".portlet-footer" )
                    .addClass( "ui-widget-header ui-corner-all" );
            });

            // Click
            $(document).on("tap", ".portlet", function(){
                if ($(this).parent().parent().attr("class") == "elementArea") {
                    $(this).prependTo(".column");
                }
                else if ($(this).parent().parent().attr("class") == "speakArea") {
                    var desc = $(".elementArea").children().children();
                    $(this).prependTo(desc);
                }
            });