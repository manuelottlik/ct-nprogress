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
        const postMarkup = `
                <div class="card">
                    <div class='card-header'><b>${post.title}</b></div>
                    <div class="card-body">                        
                        <p class="card-text">${post.body}</p>
                        <hr>
                        
                    </div>
                </div>

            `

        contentWrapper.appendChild(htmlToElement(postMarkup));
    })
};