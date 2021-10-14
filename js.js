window.onload = function () {
    document.getElementById("input").value = "";
}

function add() {
    var li = document.createElement("li");                  // creates elements assigns classes
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    var checktd = document.createElement("td");
    var contd = document.createElement("td");
    var xtd = document.createElement("td");

    checktd.classList.add("checkbox");
    contd.classList.add("midli");
    xtd.classList.add("x");
    li.classList.add("lihover");

    xtd.setAttribute("onclick", "remove()");

    tr.appendChild(checktd);                                //setup elements in html structure
    tr.appendChild(contd);
    tr.appendChild(xtd);
    table.appendChild(tr);
    li.appendChild(table);

    var arr = document.getElementById("list").childNodes;   //chooses classes for odd/even numbered li elements. to get different background color
    if (arr.length % 2 == 0) {
        li.classList.add("coleven");
    }
    if (arr.length % 2 == 1) {
        li.classList.add("colodd");
    }

    li.setAttribute("onclick", "checkcheck(this.id)");
    li.id = arr.length;                                  //note to self: id generation needs overhaul when adding remove function
    checktd.id = "chk" + arr.length;
    xtd.id = "x" + arr.length;

    var input = document.getElementById("input").value; //fills td
    var text = document.createTextNode(input);
    contd.appendChild(text);

    document.getElementById("list").appendChild(li);
    var x = document.createTextNode("✖");
    xtd.appendChild(x);

    document.getElementById("input").value = "";            // just clearing textfield. No touchy
}

function checkcheck(panelnum){                                  //function that checks, if its checked. Decides to run the function "docheck", if the class "checked "does not exist and vice versa.
    var li = document.getElementById(panelnum);
    var checkcheck = li.classList.contains("checked");
    if (checkcheck == false){
        docheck(panelnum);
    }else{
        undocheck(panelnum);
    }
}
function docheck(panelnum) {                                    // function that adds checkmark and class for new background-color.
    
        var li = document.getElementById(panelnum);
        li.classList.add("checked");
        li.classList.remove("lihover");
        var checkmark = document.createTextNode("✓");          //checkmark
        var checktd = document.getElementById("chk" + panelnum);
        checktd.appendChild(checkmark);
    
}
function undocheck(panelnum){                                   //function that removes checkmark and class for...
    var li = document.getElementById(panelnum);
    li.classList.remove("checked");
    li.classList.add("lihover");
    var checktd = document.getElementById("chk" + panelnum);
    checktd.removeChild(checktd.childNodes[0]);
}

function remove(){
    
}