interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Function to fetch and display posts
async function fetchAndDisplayPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts: Post[] = await response.json();
    displayPosts(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

// Function to display posts on the page
function displayPosts(posts: Post[]) {
  const postList = document.getElementById('postList');
  if (postList) {
    postList.innerHTML = '';

    posts.forEach((post) => {
      const li = document.createElement('li');
      li.textContent = `${post.title}: ${post.body}`;
      postList.appendChild(li);
    });
  }
}

// Function to handle adding a new post
async function addPost() {
  const titleInput = document.getElementById('postTitleInput') as HTMLInputElement;
  const bodyInput = document.getElementById('postBodyInput') as HTMLInputElement;

  const newPost: Partial<Post> = {
    userId: 1, // Replace with the desired user ID
    title: titleInput.value.trim(),
    body: bodyInput.value.trim(),
  };

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(newPost),
    });

    if (response.ok) {
      titleInput.value = '';
      bodyInput.value = '';
      fetchAndDisplayPosts(); // Fetch and display updated posts
    }
  } catch (error) {
    console.error('Error adding post:', error);
  }
}

// Event listener for adding a new post
const addPostBtn = document.getElementById('addPostBtn');
if (addPostBtn) {
  addPostBtn.addEventListener('click', addPost);
}

// Fetch and display posts on page load
window.onload = fetchAndDisplayPosts;