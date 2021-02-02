const searchForm = document.getElementById('search-form');

const searchInput = document.getElementById('search-input');

const searchReddit = (searchTerm, searchLimit, sortBy) => {
    return fetch(`https://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`)
    .then(response => response.json())
    .then(data => data.data.children.map(data => data.data))
    .catch(err => console.log(err));
};

function truncateText(text, limit) {
    const shortened = text.indexOf(" ", limit);
    if (shortened == -1) return text;
    return text.substring(0, shortened);
}

searchForm.addEventListener('submit', event => {
    // Get search term by toggling on/off
    const searchTerm = searchInput.value;

    // Get limit
    const searchLimit = document.getElementById('limit');
    
    //Check input
    if (searchTerm === '') {
        // Show message
        alert('Please add a serach term')
    }

    // Clear input
    searchInput.value = "";

    //Search Reddit
    searchReddit(searchTerm, searchLimit, "latest").then
    (results => {
        let output = '<div class="row">';
        // Loop through posts
        results.forEach(post => {
            // Check for image
            const img = post.preview ? post.preview.images[0].source.url : 
            'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg'

            output  += `
            <div class="col-8 card border-dark mb-3" style="max-width: 18rem;">
                <img src="${img}" class="card-img-top" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${truncateText(post.selftext, 100)}</p>
                    <a href="${post.url}" class="btn btn-primary">Read more</a>
                </div>
            </div>
            `;
        });
        output += '</div>';
        document.getElementById('results').innerHTML = output;
    })

    event.preventDefault();
});



// function showMessage(message, className) {
//     // Create div
//     const div = document.createElement('div');
//     // Add classes
//     div.className = `alert ${className}`;
//     // Add text
//     div.appendChild(document.createTextNode(message));
//     // Get parent container
//     const searchContainer = document.getElementById('search-container');
//     // Get search
//     const search = document.getElementById('search');

//     // Inseert message
//     searchContainer.insertBefore(div, search);

//     // Timeout alert
//     setTimeout(() => {document.querySelector('alert').remove()}, 1000);
// }