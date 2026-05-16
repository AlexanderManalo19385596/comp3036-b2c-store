"use client";

import { useState } from "react";
import type { Post } from "@repo/db/data";

type SortBy = "date-desc" | "date-asc" | "title-asc" | "title-desc";

export function AdminPostList({ posts }: { posts: Post[] }) {
  const [contentFilter, setContentFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("date-desc");
  const [visibilityFilter, setVisibilityFilter] = useState<"all" | "active" | "inactive">("all");

  const handleToggleActive = async (post: Post) => {
    await fetch(`/api/posts/${post.urlId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !post.active }),
    });
    window.location.reload();
  };

  const parsedDate = (() => {
    const digits = dateFilter.replace(/\D/g, "");
    if (digits.length !== 8) return null;
    const day = Number(digits.slice(0, 2));
    const month = Number(digits.slice(2, 4));
    const year = Number(digits.slice(4, 8));
    return new Date(year, month - 1, day);
  })();

  const filteredPosts = posts
    .filter((post) => {
      const matchesContent =
        contentFilter.trim() === "" ||
        post.title.toLowerCase().includes(contentFilter.toLowerCase()) ||
        post.content.toLowerCase().includes(contentFilter.toLowerCase());

      const matchesTag =
        tagFilter.trim() === "" ||
        post.tags
          .split(",")
          .some((tag) =>
            tag.trim().toLowerCase().includes(tagFilter.trim().toLowerCase())
          );

      const matchesDate =
        !parsedDate ||
        new Date(post.date).setHours(0, 0, 0, 0) >= parsedDate.getTime();

      const matchesVisibility =
        visibilityFilter === "all" ||
        (visibilityFilter === "active" && post.active) ||
        (visibilityFilter === "inactive" && !post.active);

      return matchesContent && matchesTag && matchesDate && matchesVisibility;
    })
    .sort((a, b) => {
      if (sortBy === "title-asc") return a.title.localeCompare(b.title);
      if (sortBy === "title-desc") return b.title.localeCompare(a.title);
      if (sortBy === "date-asc") return a.date.getTime() - b.date.getTime();
      return b.date.getTime() - a.date.getTime();
    });

  const inputClass = "border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:border-gray-400 transition-colors";
  const labelClass = "block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3 items-end py-2">
        <div className="flex-1 min-w-48">
          <label htmlFor="content-filter" className={labelClass}>Filter by Content:</label>
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
            <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              id="content-filter"
              className="border-0 bg-transparent text-sm text-gray-700 focus:outline-none w-full placeholder-gray-400"
              placeholder="Search posts..."
              value={contentFilter}
              onChange={(e) => setContentFilter(e.target.value)}
            />
          </div>
        </div>

        <div className="w-32">
          <label htmlFor="tag-filter" className={labelClass}>Filter by Tag:</label>
          <input
            id="tag-filter"
            className={`${inputClass} w-full`}
            placeholder="Tag"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
          />
        </div>

        <div className="w-36">
          <label htmlFor="date-filter" className={labelClass} aria-label="Filter by Date Created:">
            Date Created:
          </label>
          <input
            id="date-filter"
            className={`${inputClass} w-full`}
            placeholder="DDMMYYYY"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>

        <div className="w-36">
          <label htmlFor="sort-by" className={labelClass}>Sort By:</label>
          <select
            id="sort-by"
            className={`${inputClass} w-full h-9`}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="title-asc">Title A - Z</option>
            <option value="title-desc">Title Z - A</option>
          </select>
        </div>

        <div className="w-36">
          <label htmlFor="visibility-filter" className={labelClass}>Filter by Visibility:</label>
          <select
            id="visibility-filter"
            className={`${inputClass} w-full h-9`}
            value={visibilityFilter}
            onChange={(e) => setVisibilityFilter(e.target.value as "all" | "active" | "inactive")}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <span className="text-xs text-gray-500 font-semibold whitespace-nowrap pb-2">
          {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {filteredPosts.length === 0 && (
          <p className="text-center text-gray-400 py-8 bg-white rounded-xl border border-gray-200">
            No posts match the filters.
          </p>
        )}
        {filteredPosts.map((post) => (
          <article key={post.id} className="flex gap-4 border border-gray-200 rounded-xl p-4 bg-white hover:shadow-sm transition-shadow">
            <div className="w-32 h-20 shrink-0 flex-none overflow-hidden rounded-lg">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <a
                  href={`/post/${post.urlId}`}
                  className="font-semibold text-gray-900 hover:underline text-sm leading-snug"
                >
                  {post.title}
                </a>
                <button
                  type="button"
                  className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                    post.active
                      ? "bg-green-50 border-green-200 text-green-700"
                      : "bg-gray-100 border-gray-200 text-gray-500"
                  }`}
                  onClick={() => handleToggleActive(post)}
                >
                  {post.active ? "Active" : "Inactive"}
                </button>
              </div>
              <p className="text-gray-500 text-xs">{post.category}</p>
              <p className="text-gray-400 text-xs">
                Posted on {post.date.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}
              </p>
              <p className="text-gray-500 text-xs">
                {post.tags.split(",").map((t) => `#${t.trim()}`).join(", ")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}