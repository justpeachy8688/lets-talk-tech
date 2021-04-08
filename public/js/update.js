async function editFormHandler(event) {
    event.preventDefault();
    // GO GRAB WHAT IS INSIDE THE TITLE INPUT AREA
    const title = document.querySelector('input[name="post-title"]').value;
    // GO GRAB WHAT IS INSIDE THE CONTENT INPUT AREA
    const content = document.querySelector('input[name="content"]').value;

    //BELOW - api/post COMING FROM API INDEX.JS
const response = await fetch(`/api/post`, {
method: 'POST',
body: JSON.stringify({
    post_id
})
})
}