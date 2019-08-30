//My rewrite to vanilla JS

//Store iframe window's content
var clientFrameWindow = document.getElementById('clientframe').contentWindow;


//Never delete from here on
var total = 0;

//1- listen for enter event
document.getElementById('clientframe').contentWindow.addEventListener('dragenter', function (event) //this listens on dragover for entire iFrame!!
    {
        event.preventDefault();
        event.stopPropagation();
        console.log('Drag Enter');
        total += 1;
    }, false);

//2 - listen for dragover event [If this is not present, you get that cut circle pointer]
document.getElementById('clientframe').contentWindow.addEventListener("dragover", function (event) //this listens on dragover for entire iFrame!!
    {
        event.preventDefault();
        event.stopPropagation();

        //ADD THE BLUE LINE ON HOVER
        //If you find them, remove them all (xox)
        clientFrameWindow.document.querySelectorAll('.reserved-drop-marker').forEach(function (a) {
            a.remove()
        });

        //Add the line
        var line = document.createElement("p");
        line.classList.add('reserved-drop-marker');
        var element = event.target; //on mouse position
        element.appendChild(line);

        console.log('Drag Over'); //log it
        //There is a known bug, if you dragover the scrollbar, it will start creating lines like crazy 
        //(FIXED NOW by removing .body from line 37 (xox))
    }, false);

//3 - listen for drop event
document.getElementById('clientframe').contentWindow.addEventListener("drop", function (event) //this listens on dragover for entire iFrame!!
    {
        event.preventDefault();
        event.stopPropagation();
        console.log('Drop event');
        total += 1;
        console.log("Total Events Fired = " + total);
        total = 0;

        var data = event.dataTransfer.getData("text");
        event.target.appendChild(document.getElementById(data));
        // Clear the drag data cache (for all formats/types)
        event.dataTransfer.clearData();

        //Need to add it after element
        
        //Let`s handle the carry html and 
        /*
        //
        var data = event.dataTransfer.getData("text");
        // var insertionPoint = $("#clientframe").contents().find(".drop-marker");
        event.target.appendChild(clientFrameWindow.document.getElementById(data));
        event.dataTransfer.clearData(); */
        //not checking for my line here- i should drop where line shows up
    }, false);


//4- Drag-end
function dragend_handler(ev) {
    event.preventDefault();
    event.stopPropagation();
    console.log("dragEnd - Blue line removed");

    //Remove created blue line on Drag End
    clientFrameWindow.document.querySelector('.reserved-drop-marker').remove();
}

//5-  Drag-start ( + drag drop should carry and drop data)
function dragstart_handler(ev) {
    console.log("dragStart - Here i should carry data");

    ev.dataTransfer.setData("text/plain", ev.target.id);
}


//Let`s add a line to show where drop

/* Convert this 





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

Blue line code

$(clientFrameWindow.document.body).find('*').on('dragover', function (event) {
    event.preventDefault();
    event.stopPropagation();
    $(clientFrameWindow.document.body).find('.reserved-drop-marker').remove();
    //pana aici 
    $(event.target).append("<p class='reserved-drop-marker'></p>");
    console.log('Drag Over');
});
*/
//FULLY TRANSLATED - Removing jQuery