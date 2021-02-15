function removeError(errCaption, errURL, errPost) {
    rmvElement(errCaption);
    rmvElement(errURL);
    rmvElement(errPost);
}

function cancelEdit(event) {
    event.preventDefault();
    getMeme(event.path[4].id);
    btndisabeld(false);
}

function edit(event) {
    btndisabeld(true);
    
    var memes = event.path[3];
    var meme = event.path[2];
    var name = meme.children[0].innerHTML;
    var memeContent = meme.children[3];
    var caption = memeContent.children[0].innerHTML;
    var url = memeContent.children[1].src;

    memeContent.innerHTML ='<form method="post" action="/" onsubmit="return editMeme();">' +
            '<div class="form-group">'+
                '<label>Caption <span style="color: red">*</span></label>'+
                '<input id="caption" class="form-control" type="text" value="'+ caption +'" name="caption" maxlength="255" placeholder="Be creative with the caption!" required/>'+
                '<span id="error-caption"></span>'+
            '</div>'+
            '<div class="form-group">'+
                '<label>URL <span style="color: red">*</span></label>'+
                '<input id="url" class="form-control" type="url" value="'+ url +'" name="url" maxlength="500" placeholder="Enter URL of your meme" required=""/>'+
                '<span id="error-url"></span>'+
            '</div>'+
            '<div class="form-group" style="text-align: center">'+
                '<button id="edit-meme" class="btn btn-primary submit" onclick="editMeme(event)" type="submit">EDIT</button>'+
                '<button id="cancel-edit" class="btn btn-primary cancel" onclick="cancelEdit(event)">CANCEL</button>'+
            '</div>'+
            '<span id="error-post"></span>'+
        '</form>';
}

