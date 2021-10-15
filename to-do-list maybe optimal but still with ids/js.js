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
        li.setAttribute("onclick", "checkcheck(this.id)");
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
function checkcheck(panelid) {                                              //function that checks, if the panel is checked.
    var li = document.getElementById(panelid);

    var checkcheck = li.classList.contains("checked");
    if (checkcheck == false) {                                              
        docheck(panelid);
    } else {
        undocheck(panelid);
    }
}
function docheck(panelid) {                                                 //function that adds checkmark and removes placeholder
    var li = document.getElementById(panelid);
    li.classList.add("checked");
    li.classList.remove("lihover");

    var checkmark = document.createTextNode("\u2714");
    var checkdiv = document.getElementById("chk" + panelid);
    checkdiv.removeChild(checkdiv.childNodes[0]);
    checkdiv.appendChild(checkmark);
}
function undocheck(panelid) {                                               //function that removes checkmark and recreats placeholder
    var li = document.getElementById(panelid);
    li.classList.remove("checked");
    li.classList.add("lihover");

    var checkdiv = document.getElementById("chk" + panelid);
    checkdiv.removeChild(checkdiv.childNodes[0]);
    var placeholder = document.createTextNode("\u2063");
    checkdiv.appendChild(placeholder);
}

                                                                            //Removal:
function remove(xdiv) {                                                     //function that removes an LI panel
    var panelid = xdiv.parentNode.id;
    var li = document.getElementById(panelid);
    li.remove();
    console.log("removed: " + panelid);
    assign();                                                               //reassign ids to fill potential gap
}
                                                                            //Generate/assign Ids:
function assign() {                                                         //function that assigns ids/classes to the LI panels and the elements inside them
    var ul = document.getElementById("list");
    var elements = Array.from(ul.children);                                 //creates array with every LI panel
    lplen = elements.length;
    console.log("_______new loop length " + lplen);

    for (var lp = 0; lp < lplen; lp++){                                     //loop that goes through every LI panel and the elements inside the array
        console.log("loop " + lp + ":");
        var lpone = +lp + +1;

        var li = elements[lp];                                              //gets LI panel in question and its elements from the array
        var innerli = li.children;
        var checkdiv = innerli[0];
        var condiv = innerli[1];
        var xdiv = innerli[2];

        li.id = lpone;
        checkdiv.id = "chk" + lpone;
        condiv.id = "licon" + lpone;
        xdiv.id = "x" + lpone;

        console.log("assigned id " + li.id);                                //assigns different classes/bgcolor to the LI panel to form a pattern
        if (li.id % 2 == 0) {
            li.classList.remove("colodd");
            li.classList.add("coleven");
            console.log("even color assigned to id " + li.id)
        }
        if (li.id % 2 == 1) {
            li.classList.remove("coleven");
            li.classList.add("colodd");
            console.log("odd color assigned to ids " + li.id)
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
    var tmcon = document.getElementById(tmid);

    var newdiv = document.createTextNode(tmcon);

    var li = event.target;
    var olddiv = li.childNodes[0];

    li.replaceChild(tmcon, olddiv);

}

let ul = document.getElementById("list");
function ulonclick(event) {
    let li = event.target.closest("li");                                    // get reference by using closest

    let nodes = Array.from(li.closest('ul').children);                      // get array
    let index = nodes.indexOf(li);
}