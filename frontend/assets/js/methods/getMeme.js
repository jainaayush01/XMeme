function getMeme(id) {
    fetch(HOST + "/memes/" + id)
        .then((meme) => meme.json())
        .then((meme) => {
            if (meme.error) {
                document.getElementById(id).innerHTML = meme.error;
            }
            else
                if (meme.length == 0) {
                document.getElementById(id).innerHTML = "Meme not found";
            }
            else {
                    document.getElementById(id).innerHTML =
                        "<span>" + meme.name + "</span>" +
                        "<button class='editbtn' onclick='edit(event)'><img class='edit-icon' src='./assets/img/edit-solid.svg'/></button><br/>" +
                        "<div class='meme-content'>" +
                            "<p>" + meme.caption + "</p>" +
                            '<img src="' + meme.url + '" alt="Couldn\'t load Image"/>' +
                        "</div>";
            }
        })
        .catch((err) => {
            console.log(err);
            document.getElementById(id).innerHTML = "Could not fetch Meme. Sorry for inconvenience!"
        });
}

// getMemes();