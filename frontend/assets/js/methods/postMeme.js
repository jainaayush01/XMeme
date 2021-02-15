function postMeme(name, caption, url) {
    fetch(HOST + "/memes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            name: name,
            caption: caption,
            url: url,
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.error) {
                showError(res.error);
                return;
            }
            console.log("Success: ", res);
        })
        .then(() => {
            document.getElementById("watchmemes").click();
        })
        .catch((err) => {
            console.log(err);
            showError("Failed to Post Meme. Please try again later.");
        });
}
