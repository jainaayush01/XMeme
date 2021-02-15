function editMeme(event) {
    event.preventDefault();
    var id = event.path[4].id;
    var meme = document.getElementById(id);
    var memeContent = meme.children[3];
    var caption = memeContent.children[0][0].value;
    var url = memeContent.children[0][1].value;

    var errCaption = document.querySelector("#error-caption");
    var errURL = document.querySelector("#error-url");
    var errPost = document.querySelector("#error-post");
    removeError(errCaption, errURL, errPost);

    var regex = new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i);
    var urlregex = new RegExp(/\.(jpeg|jpg|jpe|jif|jfif|pjpeg|pjp|avif|apng|jfi|gif|png|webp|svg)$/);

    if (caption.length <= 0) {
        addElement(errCaption);
        return false;
    }
    else if (url.length <= 0) {
        addElement(errURL);
        return false;
    }
    else if (url.match(regex)) {
        if (url.match(urlregex)) {
            patchMeme(id, caption, url);
            return true;
        }
        else {
            var errURL = document.querySelector("#error-url");
            errURL.innerHTML = "Please give the URL of an image";
            errURL.style = "color: red; font-weight: normal; padding: 5px; font-size: 13px;";
            return false;
        }
    }
    else {
        var errURL = document.querySelector("#error-url");
        errURL.innerHTML = "Please give a proper URL";
        errURL.style = "color: red; font-weight: normal; padding: 5px; font-size: 13px;";
        return false;
    }
}