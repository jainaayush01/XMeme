function patchMeme(id, caption, url) {
    fetch(HOST + "/memes/" + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            caption: caption,
            url: url,
        }),
    })
        .then((res) => {
            if (res.status == 200) {    
                getMeme(id);
                btndisabeld(false);
            }
            else if (res.status == 422) {
                showError("Validation error");
                return;
            }
            else if (res.status == 409) {
                showError("Similar Post was found");
                return;
            }
            else {
                showError("Meme was not found. It has been deleted earlier.");
                return;
            }
        })
        .catch((err) => {
            console.log(err);
            showError("Failed to Update Meme. Please try again later.");
        });
}
