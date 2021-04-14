const postId = document.querySelector('input[name="post-id"]');

const editFormHandler = async function (event) {
    console.log("We're in the event handler!")
    event.preventDefault();
    // GO GRAB WHAT IS INSIDE THE TITLE INPUT AREA
    const title = document.querySelector('input[name="post-title"]').value;
    // GO GRAB WHAT IS INSIDE THE CONTENT INPUT AREA
    const content = document.querySelector('input[name="content"]').value;

    //BELOW - api/post COMING FROM API INDEX.JS
    const response = await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

const deleteFormHandler = async function () {
    const response = await fetch(`/api/post/${postId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#edit-form-button').addEventListener('submit', editFormHandler);

document.querySelector('#delete-button').addEventListener('click', deleteFormHandler);

