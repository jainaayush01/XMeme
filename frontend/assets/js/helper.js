const HOST = "http://localhost:8081"
function addElement(elm) {
    elm.innerHTML = "Required";
    elm.style = "color: red; font-weight: normal; padding: 5px; font-size: 13px;";
}

function rmvElement(elm) {
    elm.innerHTML = "";
    elm.style = "";
}

function btndisabeld(val) {
    var btns = document.getElementsByClassName("editbtn");
    for (var i = 0; i < btns.length; ++i) {
        btns[i].disabled = val;
    }
}



function showError(error) {
    var errPost = document.querySelector("#error-post");
    errPost.innerHTML = error;
    errPost.style = "padding: 5px; font-size: 13px"
}
