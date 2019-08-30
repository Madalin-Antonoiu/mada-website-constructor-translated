//My rewrite to vanilla JS

//Store iframe window's content
var clientFrameWindow = document.getElementById('clientframe').contentWindow;


//Never delete from here on
var total = 0;

//1- listen for enter event
document.getElementById('clientframe').contentWindow.addEventListener('dragenter', function (event) //this listens on dragover for entire iFrame!!
    {
        event.stopPropagation();
        console.log('Drag Enter');

        //ia elementul tras
        currentElement = event.target;
        currentElementChangeFlag = true; //Change Flag to process DragOver Queue
        //ia detalii despre element
        elementRectangle = event.target.getBoundingClientRect();
        countdown = 1;
        console.log(elementRectangle); //punele pe consola.log



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


        /*

        //get mouse coordintes based on window client
        var x = event.clientX;
        var y = event.clientY;

        countdown = countdown + 1;
        currentElementChangeFlag = false;

        var mousePosition = {
            x: x,
            y: y
        };

        console.log(mousePosition);
        */


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
    //ev.dataTransfer.effectAllowed = "copy";


}

//up until here