function getMemes() {
    fetch(HOST + "/memes")
        .then((memes) => memes.json())
        .then((memes) => {
            if (memes.error) {
                document.getElementById("memes").innerHTML = memes.error;
            }
            else if (memes.length == 0) {
                document.getElementById("memes").innerHTML = "No memes have been posted yet.";
            }
            else {
                document.getElementById("memes").innerHTML = "";
                memes.forEach((meme) => {
                    document.getElementById("memes").innerHTML +=
                        "<div class='meme' id='" + meme._id + "'>" +
                            "<span>" + meme.name + "</span>" +
                            "<button class='editbtn' onclick='edit(event)'><img class='edit-icon' src='./assets/img/edit-solid.svg'/></button><br/>" +     
                            "<div class='meme-content'>"+
                                "<p>" + meme.caption + "</p>" +
                                '<img src="' + meme.url + '" alt="Couldn\'t load Image"/>' +
                            "</div>"+
                        "</div>";
                });
            }
        })
        .catch((err) => {
            console.log(err);
            document.getElementById("memes").innerHTML = "Could not fetch Memes. Sorry for inconvenience!"
        });
}

getMemes();