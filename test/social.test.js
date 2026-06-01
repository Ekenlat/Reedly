import test from "node:test";
import assert from "node:assert/strict";
import { createPost, likePost, repostPost } from "../social.js";

test("createPost sets core social fields", () => {
  const post = createPost({ book: "Dune", review: "Epic", videoUrl: "https://example.com/video" });

  assert.equal(post.book, "Dune");
  assert.equal(post.review, "Epic");
  assert.equal(post.videoUrl, "https://example.com/video");
  assert.equal(post.likes, 0);
  assert.equal(post.reposts, 0);
  assert.equal(typeof post.id, "string");
  assert.equal(typeof post.createdAt, "number");
});

test("likePost increments likes", () => {
  const liked = likePost({ id: "1", likes: 2, reposts: 0, book: "", review: "", videoUrl: "", createdAt: 0 });
  assert.equal(liked.likes, 3);
});

test("repostPost increments repost count", () => {
  const reposted = repostPost({ id: "1", likes: 0, reposts: 5, book: "", review: "", videoUrl: "", createdAt: 0 });
  assert.equal(reposted.reposts, 6);
});
