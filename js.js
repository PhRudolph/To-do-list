window.onload = function(){                         //clear textfield
    document.getElementById("input").value = "";
}

window.onload = load();


function load(){                                    //function for loading,refreshing and saving of the to-do-list
    var arr = ["bla", "ble", "blem", "soos"];
    let tab = "";
    for (let t = 0; t < arr.length; t++){
        if(t%2 == 0){
            tab += "<li class='panstraight'>" + arr[t] + "</li>";
        }else{
            tab += "<li class='panodd'>" + arr[t] + "</li>";
        }
    }
    document.getElementById("table").innerHTML = tab;
}

function add(){
    var input = document.getElementById("input").value;
    if (input !== ""){
        arr.push(input);
    }
    load();
}