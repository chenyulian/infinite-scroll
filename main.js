const postsContainer = document.querySelector("#posts-container");
const loading = document.querySelector(".loader");
const filter = document.querySelector("#filter");
const url = "https://jsonplaceholder.typicode.com";

let limit = 5;
let page = 1;

async function getPosts() {
  const res = await fetch(`${url}/posts?_limit=${limit}&_page=${page}`);
  const data = await res.json();
  return data;
}

// show posts in DOM
async function showPosts() {
  const posts = await getPosts();
  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `<div class="number">${post.id}</div>
      <div class="post-info">
          <div class="post-title">${post.title}</div>
          <p class="post-body">${post.body}</p>
      </div>`;
    postsContainer.appendChild(postEl);
  });
}

function showLoading() {
  loading.classList.add("show");
  setTimeout(() => {
    loading.classList.remove("show");
    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

// show initial posts
showPosts();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});
