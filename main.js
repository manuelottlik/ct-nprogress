function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

const loadContent = async () => {
    const posts = await getPosts();

    const contentWrapper = document.getElementById("content");

    posts.forEach(post => {
        //console.log(post)

        let commentsMarkup = '';

        post.comments.forEach(comment => {
            commentsMarkup = commentsMarkup + `<br><div><b>${comment.email}:</b> ${comment.name}</div>`;
        });

        const postMarkup = `
                <div class="card">
                    <div class='card-header'><b>${post.title}</b></div>
                    <div class="card-body">                        
                        <p class="card-text">${post.body}</p>
                        <hr>
                        <h5>Kommentare</h5>
                        ${commentsMarkup}
                    </div>

                    <div class='card-footer'>
                        <div class='text-right text-muted'>verfasst von ${post.user.name}</div>
                    </div>
                </div>

            `

        contentWrapper.appendChild(htmlToElement(postMarkup));
    })
};