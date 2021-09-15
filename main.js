const postsContainer = document.querySelector("#posts-container");
const loading = document.querySelector(".loader");
const filter = document.querySelector("#filter");
const url = "https://jsonplaceholder.typicode.com";

let limit = 3;
let page = 1;

function getPosts() {
  return fetch(`${url}/posts?_limit=${limit}&_page=${page}`).then(
    (response) => response.json(),
    (error) => {
      alert(error);
    }
  );
}
// show posts in DOM
function showPosts() {
  getPosts().then((data) => {
    console.log(data);
    data.forEach((post) => {
      const postEl = document.createElement("div");
      postEl.classList.add("post");
      postEl.innerHTML = `<div class="number">${post.id}</div>
                        <div class="post-info">
                            <div class="post-title">${post.title}</div>
                            <p class="post-body">${post.body}</p>
                        </div>`;
      postsContainer.appendChild(postEl);
    });
  });
}

showPosts();
