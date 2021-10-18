window.onload = function () {                                               //Clear textfield onload
    document.getElementById("input").value = "";
}
let textfield = document.getElementById("input");                           //Enables pressing Enter to submit
textfield.addEventListener("keyup", function(event){                        //eventlistener checks on keyup, if it was the Enter key
    if (event.key === "Enter"){
        event.preventDefault();
        add();
    }
});

                                                                            //Add:
function add() {                                                            //function that adds an LI panel into the ul that lists the to-do-list
    var input = document.getElementById("input").value;
    if (input != "") {
        var li = document.createElement("li");                              //creates elements, setting classes and attributes
        var checkdiv = document.createElement("div");
        var condiv = document.createElement("div");
        var xdiv = document.createElement("div");

        checkdiv.classList.add("checkbox");
        condiv.classList.add("midli");
        xdiv.classList.add("x");
        li.classList.add("lihover");
        li.setAttribute("onclick", "checkcheck(this)");
        xdiv.setAttribute("onmousedown", "remove(this)");
        li.setAttribute("draggable", "true");
        li.setAttribute("ondragstart", "dragbegin(event)");
        li.setAttribute("ondragover", "allow(event)");
        li.setAttribute("ondrop", "drop(event)");

        li.appendChild(checkdiv);                                           //sets up elements as html structure
        li.appendChild(condiv);
        li.appendChild(xdiv);
        document.getElementById("list").appendChild(li);

        assign();

        var input = document.getElementById("input").value;                 //fills div elements
        var text = document.createTextNode(input);
        condiv.appendChild(text);

        var x = document.createTextNode("\u2716");
        xdiv.appendChild(x);
        var placeholder = document.createTextNode("\u2063");                //placeholder for checkmark.
        checkdiv.appendChild(placeholder);
    }
    document.getElementById("input").value = "";                            //just clears the textfield. No touchy
}

                                                                            //Checkmark:
function checkcheck(li) {                                                   //function that checks, if the panel is checked.
    var checkcheck = li.classList.contains("checked");
    if (checkcheck == false) {
        docheck(li);
    } else {
        undocheck(li);
    }
}
function docheck(li) {                                                      //function that adds checkmark and removes placeholder
    li.classList.add("checked");
    var condiv = li.childNodes[1];
    condiv.classList.add("line");
    li.classList.remove("lihover");

    var checkmark = document.createTextNode("\u2714");
    var checkdiv = li.childNodes[0];
    checkdiv.removeChild(checkdiv.childNodes[0]);
    checkdiv.appendChild(checkmark);
}
function undocheck(li) {                                                    //function that removes checkmark and recreats placeholder
    li.classList.remove("checked");
    var condiv = li.childNodes[1];
    condiv.classList.remove("line");
    li.classList.add("lihover");

    var checkdiv = li.childNodes[0];
    checkdiv.removeChild(checkdiv.childNodes[0]);
    var placeholder = document.createTextNode("\u2063");
    checkdiv.appendChild(placeholder);
}

                                                                            //Removal:
function remove(xdiv) {                                                     //function that removes an LI panel
    var li = xdiv.parentNode;
    li.remove();
    assign();                                                               //reassign ids to fill potential gap
}
                                                                            //Generate/assign Ids:
function assign() {                                                         //function that assigns ids/classes to the LI panels and the elements inside them
    var ul = document.getElementById("list");
    var ulements = Array.from(ul.children);                                 //creates array with every LI panel
    lplen = ulements.length;

    for (var lp = 0; lp < lplen; lp++){                                     //loop that goes through every LI panel and the ulements inside the array
        var lpplus = +lp + +1;
        var li = ulements[lp];                                              //gets LI panel in question and its index from the array
        var liindex = ulements.indexOf(li);
        
        if (li.id != lpplus){                                               //if the id is incorrect, reassign it
            li.id = lpplus;
        }
        if (liindex % 2 == 0) {                                             //assigns different classes/bgcolor to the LI panel to form a pattern
            li.classList.remove("colodd");
            li.classList.add("coleven");
        }
        if (liindex % 2 == 1) {
            li.classList.remove("coleven");
            li.classList.add("colodd");
        }
    }
}
                                                                            //Drag and Drop:
function dragbegin(event){                                                  //function that sets the data that shall be transfered on the drag event
    event.dataTransfer.setData("text", event.target.id)                             //in this case the entire LI panel
}
function allow(event) {                                                     //when hovering over an area with a draggable object, nothing will happen by default
    event.preventDefault();                                                 //so this needs to be prevented
}
function drop(event) {                                                      //function that on drop 
    event.preventDefault();
    var newid = event.dataTransfer.getData("text");                         //currently still uses ID to get the dragged object
    var ul = document.getElementById("list");
    var newli = document.getElementById(newid);
    var li = event.target.closest("li");

    var ulements = Array.from(ul.children);                                 //but indexes for smoother placement of the dragged object
    var liindex = ulements.indexOf(li);
    var newliindex = ulements.indexOf(newli);

    if(newliindex > liindex){                                               //if its dragged from below, just insert the new before the old
        ul.insertBefore(newli, li);
    }if(newliindex < liindex){                                              //if its dragged from above, insert the new before the old and then the old before the new
        ul.insertBefore(newli, li);
        ul.insertBefore(li, newli);
    }
    assign();
}