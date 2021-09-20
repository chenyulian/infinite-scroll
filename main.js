const postsContainer = document.querySelector("#posts-container");
const loading = document.querySelector(".loader");
const filter = document.querySelector("#filter");
const url = "https://jsonplaceholder.typicode.com";

let limit = 5;
let page = 1;

async function fetchData() {
  let res = await fetch(`${url}/posts?_limit=${limit}&_page=${page}`);
  return await res.json();
}

async function showData() {
  let data = await fetchData();
  render(data);
}

function render(data) {
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
}

// show initial data
showData();

// load more data
function load() {
  loading.classList.add("show");
  page++;
  showData().then(() => {
    loading.classList.remove("show");
  });
}

function throttle(fn, delay) {
  let canUse = true;
  return function () {
    if (canUse) {
      fn.apply(this, arguments);
      canUse = false;
      setTimeout(() => (canUse = true), delay);
    }
  };
}
const throttled = throttle(load, 1000);

// filter posts
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");
  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    // 节流
    throttled();
  }
});

filter.addEventListener("input", filterPosts);
