"use client";

import { useState, useEffect, useRef } from "react";

export function LikeButton({ postId, initialLikes }: { postId: number; initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const userInteracted = useRef(false);

  useEffect(() => {
    fetch(`/api/likes?postId=${postId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!userInteracted.current) {
          setLiked(data.liked);
        }
      });
  }, [postId]);

  const handleLike = async () => {
    userInteracted.current = true;
    if (liked) {
      const res = await fetch("/api/likes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });
      const data = await res.json();
      setLikes(data.likes);
      setLiked(false);
    } else {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });
      const data = await res.json();
      setLikes(data.likes);
      setLiked(true);
    }
  };

  return (
  <div className="flex items-center gap-4">
    <button
      data-test-id="like-button"
      type="button"
      onClick={handleLike}
      className="flex items-center gap-1 px-3 py-1 text-sm font-medium hover:opacity-70 transition"
    >
      {liked ? "♥ Unlike" : "♡ Like"}
    </button>
    <span className="text-sm">{likes} likes</span>
  </div>
);
}