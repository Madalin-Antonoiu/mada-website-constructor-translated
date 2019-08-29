
//My rewrite to vanilla JS

    //Store iframe window's content
    var clientFrameWindow =  document.getElementById('clientframe').contentWindow; 

    //Track drag-start
    function dragstart_handler(ev) {
        console.log("dragStart");
        ev.dataTransfer.setData("text", ev.target.id);
    }

    //Track drag-end
    function dragend_handler(ev) {
        console.log("dragEnd");
    }

    //Never delete from here on
    var total = 0;

    //1- listen for enter event
    document.getElementById('clientframe').contentWindow.addEventListener('dragenter', function(event)  //this listens on dragover for entire iFrame!!
    { 
        event.preventDefault();
        event.stopPropagation();
        console.log('Drag Enter');
        total +=1;
    }, false);

    //2 - listen for dragover event [If this is not present, you get that cut circle pointer]
    document.getElementById('clientframe').contentWindow.addEventListener("dragover", function(event)  //this listens on dragover for entire iFrame!!
    { 
        event.preventDefault();
        event.stopPropagation();
        console.log('Drag Over');
        total +=1;
    }, false);
    
    //3 - listen for drop event
    document.getElementById('clientframe').contentWindow.addEventListener("drop", function(event)  //this listens on dragover for entire iFrame!!
    { 
        event.preventDefault();
        event.stopPropagation();
        console.log('Drop event');
        total +=1;
        console.log("Total Events Fired = "+total);
        total = 0;
    }, false);

    document.getElementById('clientframe').contentWindow.addEventListener("dragover", function(event)  //this listens on dragover for entire iFrame!!
    { 
        event.preventDefault();
        event.stopPropagation();
        //note so sure
        var elem = clientFrameWindow.document.body.querySelector('reserved-drop-marker');
        elem.parentNode.removeChild(elem);

    }, false);
    


    //Let`s add a line to show where drop

    /* Convert this 

        $(clientFrameWindow.document.body).find('*').on('dragover',function(event)
        {
            event.preventDefault();
            event.stopPropagation();
            $(clientFrameWindow.document.body).find('.reserved-drop-marker').remove();
            //pana aici 
            $(event.target).append("<p class='reserved-drop-marker'></p>");
            console.log('Drag Over');
        });
    */




  //up until here

























  /*
$(function() { //document ready event  
    var clientFrameWindow = $('#clientframe').get(0).contentWindow; 

    $("#dragitemslistcontainer li").on('dragstart',function() {
        console.log("Drag Started");
    });

    $("#dragitemslistcontainer li").on('dragend',function() {
        console.log("Drag End");
    });

    $('#clientframe').on("load", function() // jQuery AJAX here basically saying when frame is loaded, GG, execute
    {
        var total = 0; //counter

        $(clientFrameWindow.document.body).find('*').on('dragenter',function(event) //on dragenter every single body element, console log it
        {
            event.preventDefault();
            event.stopPropagation();
            console.log('Drag Enter');
            total +=1;
        }).on('dragover',function(event)
        {
            event.preventDefault();
            event.stopPropagation();
            console.log('Drag Over');
            total +=1;
        });
        $(clientFrameWindow.document).find('body,html').on('drop',function(event) {
            event.preventDefault();
            event.stopPropagation();
            console.log('Drop event');
            total +=1;
            console.log("Total Events Fired = "+total);
            total = 0;
        });
    });
});
            //FULLY TRANSLATED - Removing jQuery
*/
