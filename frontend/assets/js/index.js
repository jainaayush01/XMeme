function removeError(errName, errCaption, errURL, errPost) {
    rmvElement(errName);
    rmvElement(errCaption);
    rmvElement(errURL);
    rmvElement(errPost);
}
function post(event) {
    event.preventDefault();
    var name = document.querySelector("#name").value;
    var caption = document.querySelector("#caption").value;
    var url = document.querySelector("#url").value;
    var errName = document.querySelector("#error-name");
    var errCaption = document.querySelector("#error-caption");
    var errURL = document.querySelector("#error-url");
    var errPost = document.querySelector("#error-post");
    removeError(errName, errCaption, errURL, errPost);

    var regex = new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i);
    var urlregex = new RegExp(/\.(jpeg|jpg|jpe|jif|jfif|pjpeg|pjp|avif|apng|jfi|gif|png|webp|svg)$/);
    
    
    if (name.length <= 0) {
        addElement(errName);
        return false;
    }
    else if (caption.length <= 0) {
        addElement(errCaption);
        return false;
    }
    else if (url.length <= 0) {
        addElement(errURL);
        return false;
    }
    else if (url.match(regex)) {
        if (url.match(urlregex)) {
            postMeme(name, caption, url);
            return true;
        }
        else {
            var errURL = document.querySelector("#error-url");
            errURL.innerHTML = "Please give the URL of an image";
            errURL.style = "padding: 5px; font-size: 13px;";
            return false;
        }
    }
    else {
        var errURL = document.querySelector("#error-url");
        errURL.innerHTML = "Please give a proper URL";
        errURL.style = "padding: 5px; font-size: 13px;";
        return false;
    }
}
