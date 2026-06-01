import { createPost, likePost, repostPost } from "./social.js";

const form = document.querySelector("#post-form");
const timeline = document.querySelector("#timeline");

let posts = [
  createPost({
    book: "The Hobbit",
    review: "Great adventure and worldbuilding.",
    videoUrl: "",
  }),
];

function render() {
  timeline.innerHTML = posts
    .map(
      (post) => `
      <li class="card">
        <h3>${post.book}</h3>
        <p>${post.review}</p>
        ${post.videoUrl ? `<p><a href="${post.videoUrl}" target="_blank" rel="noreferrer">Watch video review</a></p>` : ""}
        <div class="actions">
          <button data-action="repost" data-id="${post.id}">🔁 Repost (${post.reposts})</button>
          <button class="book-like" data-action="like" data-id="${post.id}">Like (${post.likes})</button>
        </div>
      </li>
    `,
    )
    .join("");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  posts = [
    createPost({
      book: String(formData.get("book")),
      review: String(formData.get("review")),
      videoUrl: String(formData.get("videoUrl") || ""),
    }),
    ...posts,
  ];
  form.reset();
  render();
});

timeline.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  const id = target.dataset.id;
  const action = target.dataset.action;

  posts = posts.map((post) => {
    if (post.id !== id) {
      return post;
    }
    if (action === "like") {
      return likePost(post);
    }
    if (action === "repost") {
      return repostPost(post);
    }
    return post;
  });

  render();
});

render();
