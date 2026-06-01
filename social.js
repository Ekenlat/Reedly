export function createPost({ book, review, videoUrl = "" }) {
  return {
    id: crypto.randomUUID(),
    book,
    review,
    videoUrl,
    likes: 0,
    reposts: 0,
    createdAt: Date.now(),
  };
}

export function likePost(post) {
  return { ...post, likes: post.likes + 1 };
}

export function repostPost(post) {
  return { ...post, reposts: post.reposts + 1 };
}
