 // Switch mode
$(document).ready(function() {
    $("#button_param").click(function() {
//        console.log("event via 1 : " + $(this).attr("id"));
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
            });
        }
    });

    // sortable elements
    $("#sortable-el, #sortable-sp, #sortable-elT, #sortable-spT").sortable({
        connectWith: ".connectedSortable",
        dropOnEmpty: true,
        placeholder: "ui-state-highlight",
    }).disableSelection();
});

// Click
$(document).on("tap", ".element", function() {
    if ($(this).parent().attr("id") == "sortable-el") {
        console.log("plop 1");
        $(this).prependTo("#sortable-sp");
    }
    else if ($(this).parent().attr("id") == "sortable-sp") {
        console.log("plop 2");
        $(this).prependTo("#sortable-el");
    }
    else if ($(this).parent().attr("id") == "sortable-elT") {
        console.log("plop 3");
        $(this).prependTo("#sortable-spT");
    }
    else if ($(this).parent().attr("id") == "sortable-spT") {
        console.log("plop 4");
        $(this).prependTo("#sortable-elT");
    }
});