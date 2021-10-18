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

        console.log("added with id: " + li.id + " confirmed");

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

                                                                            //Check:
function checkcheck(li) {                                              //function that checks, if the panel is checked.
    var checkcheck = li.classList.contains("checked");
    if (checkcheck == false) {
        docheck(li);
    } else {
        undocheck(li);
    }
}
function docheck(li) {                                                 //function that adds checkmark and removes placeholder
    li.classList.add("checked");
    li.classList.remove("lihover");

    var checkmark = document.createTextNode("\u2714");
    var checkdiv = li.childNodes[0];
    checkdiv.removeChild(checkdiv.childNodes[0]);
    checkdiv.appendChild(checkmark);
}
function undocheck(li) {                                               //function that removes checkmark and recreats placeholder
    li.classList.remove("checked");
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
    console.log("removed: " + li.id);
    assign();                                                               //reassign ids to fill potential gap
}
                                                                            //Generate/assign Ids:
function assign() {                                                         //function that assigns ids/classes to the LI panels and the elements inside them
    var ul = document.getElementById("list");
    var elements = Array.from(ul.children);                                 //creates array with every LI panel
    lplen = elements.length;
    console.log("assign loop with length " + lplen);

    for (var lp = 0; lp < lplen; lp++){                                     //loop that goes through every LI panel and the elements inside the array
        var lpplus = +lp + +1;

        var li = elements[lp];                                              //gets LI panel in question and its elements from the array
        var innerli = li.children;
        var checkdiv = innerli[0];
        var condiv = innerli[1];
        var xdiv = innerli[2];
        if (li.id != lpplus){                                               //if the id is incorrect, reassign it
            li.id = lpplus;
            checkdiv.id = "chk" + lpplus;
            condiv.id = "licon" + lpplus;
            xdiv.id = "x" + lpplus;
            console.log("assigned id " + li.id);
        }

        if (li.id % 2 == 0) {                                               //assigns different classes/bgcolor to the LI panel to form a pattern
            li.classList.remove("colodd");
            li.classList.add("coleven");
        }
        if (li.id % 2 == 1) {
            li.classList.remove("coleven");
            li.classList.add("colodd");
        }
    }
}

                                                                            //Drag and Drop:
function dragbegin(event){                                                  //Work in Progress
    event.dataTransfer.setData("text", event.target.id)
}
function allow(event) {
    event.preventDefault();
}
function drop(event) {
    event.preventDefault();
    var tmid = event.dataTransfer.getData("text");
    var ul = document.getElementById("list");
    var li = event.target.closest("li");
    newli = document.getElementById(tmid);
    if(tmid > li.id){
        ul.insertBefore(newli, li);
    }if(tmid < li.id){
        ul.insertBefore(newli, li);
        ul.insertBefore(li, newli);
    }

    assign();

}

function ulonclick(event) {
                                                                        // get reference by using closest

    let nodes = Array.from(li.closest('ul').children);                      // get array
    let index = nodes.indexOf(li);
}