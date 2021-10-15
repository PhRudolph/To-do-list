window.onload = function () {                                               //Clear textfield onload
    document.getElementById("input").value = "";
}

                                                                            //Add:
function add() {                                                            //function that adds an LI element into the ul that lists the to-do-list
    var input = document.getElementById("input").value;
    if (input != "") {
        var li = document.createElement("li");                              //creating elements, setting classes and attributes
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

        var ul = document.getElementById("list").childNodes;                //generating ids by counting the already existing LIs
        ullen = ul.length;
        li.id = ullen;
        checkdiv.id = "chk" + ullen;
        condiv.id = "div" + ullen;
        xdiv.id = "x" + ullen;

        li.appendChild(checkdiv);                                           //setup elements as html structure
        li.appendChild(condiv);
        li.appendChild(xdiv);
        document.getElementById("list").appendChild(li);
        console.log("added id: " + li.id);

        assignclass(li.id);

        var input = document.getElementById("input").value;                 //filling div elements
        var text = document.createTextNode(input);
        condiv.appendChild(text);

        var x = document.createTextNode("\u2716");
        xdiv.appendChild(x);
        var placeholder = document.createTextNode("\u2063");                //placeholder for checkmark. See function docheck()
        checkdiv.appendChild(placeholder);
    }
    document.getElementById("input").value = "";                            //just clearing of textfield. No touchy
}

                                                                            //Check:
function checkcheck(panelnum) {                                             //function that checks, if its checked. Decides to run the function "docheck", if the class "checked "does not exist and vice versa.
    var li = document.getElementById(panelnum);
    var checkcheck = li.classList.contains("checked");
    if (checkcheck == false) {
        docheck(panelnum);
    } else {
        undocheck(panelnum);
    }
}
function docheck(panelnum) {                                                // function that adds checkmark and class for new background-color.
    var li = document.getElementById(panelnum);
    li.classList.add("checked");
    li.classList.remove("lihover");

    var checkmark = document.createTextNode("\u2714");                      //removing placeholder and adding checkmark
    var checkdiv = document.getElementById("chk" + panelnum);
    checkdiv.removeChild(checkdiv.childNodes[0]);
    checkdiv.appendChild(checkmark);

}
function undocheck(panelnum) {                                              //function that removes checkmark and...
    var li = document.getElementById(panelnum);
    li.classList.remove("checked");
    li.classList.add("lihover");

    var checkdiv = document.getElementById("chk" + panelnum);               //removing checkmark and recreating placeholder
    checkdiv.removeChild(checkdiv.childNodes[0]);
    var placeholder = document.createTextNode("\u2063");
    checkdiv.appendChild(placeholder);
}

                                                                            //Removal:
function remove(panel) {                                                    //function that removes an LI
    var panelnum = panel.parentNode.id;
    var li = document.getElementById(panelnum);
    li.remove();
    console.log("");
    console.log("removed: " + panelnum);

    ul = document.getElementById("list").childNodes;                        //reassign ids
    ullen = ul.length;
    for (let l = panelnum; l < ullen; l++) {
        var oldid = +l + +1;

        var newli = document.getElementById(oldid);
        var newcheckdiv = document.getElementById("chk" + oldid);
        var newcondiv = document.getElementById("div" + oldid);
        var newxdiv = document.getElementById("x" + oldid);

        newli.id = l;
        newcheckdiv.id = "chk" + l;
        newcondiv.id = "div" + l;
        newxdiv.id = "x" + l;

        console.log("id " + oldid + " changed to " + newli.id);
        assignclass(newli.id);
    }
}
                                                                            //Dynamic Background-color:
function assignclass(id) {                                                  //function that chooses classes/colors for odd/even numbered LI.
    li = document.getElementById(id);
    if (id % 2 == 0) {
        li.classList.remove("colodd");
        li.classList.add("coleven");
        console.log("even color assigned to id: " + id)
    }
    if (id % 2 == 1) {
        li.classList.remove("coleven");
        li.classList.add("colodd");
        console.log("odd color assigned to id: " + id)
    }
}

                                                                            //Drag and Drop:
function dragbegin(event) {
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
    console.log("value " + event.target.value);
    console.log("text " + event.target.text);
    console.log("tagName " + event.target.tagName);
    var olddiv = li.childNodes[0];

    li.replaceChild(tmcon, olddiv);
}