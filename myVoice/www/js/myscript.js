 // Switch mode
$(document).ready(function() {
    $("#button_param").click(function() {
    	var ready = true;
        if ($('#select-based-flipswitch').val() == "leave") {
            $.mobile.changePage('#usepage', { transition: "slide"} );
        }
        else if ($('#select-based-flipswitch').val() == "arrive") {
            // Check form
            $("#popupSave").popup("open");
            $("#button_form").click(function() {
                if ($("#fname").val().length > 0 
                    && $("#factivity").val().length > 0
                    && $("#flocation").val().length > 0 
                    && ready == true) {
                        $.mobile.changePage('#learningpage', { transition: "slide"} );
                        ready = false;
                }
            });
        }
    });

    // sortable elements
    $("#sortable-el, #sortable-sp, #sortable-elT, #sortable-spT").sortable({
        connectWith: ".connectedSortable",
        dropOnEmpty: true,
        placeholder: "placeholder",
        opacity: 0.5,
        tolerance: "intersect"
    }).disableSelection();
});

function movePict(e) {
	if(e.handled !== true) // This will prevent event triggering more then once
	{
		$(document).off("tap", ".element");
		if ($(this).parent().attr("id") == "sortable-el") {
			$(this).appendTo("#sortable-sp");
		}
		else if ($(this).parent().attr("id") == "sortable-sp") {
			$(this).appendTo("#sortable-el");
		}
		else if ($(this).parent().attr("id") == "sortable-elT") {
			$(this).appendTo("#sortable-spT");
		}
		else if ($(this).parent().attr("id") == "sortable-spT") {
			$(this).appendTo("#sortable-elT");
		}
		e.handled = true;
		setTimeout(function () {
			$(document).on("tap", ".element", movePict);
		}, 1000);
	}
}

// Click
$(document).on("tap", ".element", movePict);
