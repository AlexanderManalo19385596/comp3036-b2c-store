"use client";

import { useState, useRef } from "react";
import type { Post } from "@repo/db/data";
import { marked } from "marked";

export function PostForm({ post }: { post?: Post }) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [description, setDescription] = useState(post?.description ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [tags, setTags] = useState(post?.tags ?? "");
  const [imageUrl, setImageUrl] = useState(post?.imageUrl ?? "");
  const [preview, setPreview] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  const [cursorPos, setCursorPos] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showErrorBanner, setShowErrorBanner] = useState(false);
  const [category, setCategory] = useState(post?.category ?? "");
  const [success, setSuccess] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    else if (description.length > 200) newErrors.description = "Description is too long. Maximum is 200 characters";
    if (!content.trim()) newErrors.content = "Content is required";
    if (!imageUrl.trim()) newErrors.imageUrl = "Image URL is required";
    else {
      try {
        new URL(imageUrl);
      } catch {
        newErrors.imageUrl = "This is not a valid URL";
      }
    }
    if (!tags.trim()) newErrors.tags = "At least one tag is required";
    return newErrors;
  };

  const handleSave = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShowErrorBanner(true);
      return;
    }
    setErrors({});
    setShowErrorBanner(false);

    if (post) {
      await fetch(`/api/posts/${post.urlId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, content, tags, imageUrl, category }),
      });
    } else {
      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, content, tags, imageUrl, category }),
      });
    }
    setSuccess(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  const handlePreview = async () => {
    if (contentRef.current) {
      setCursorPos(contentRef.current.selectionStart);
    }
    const html = await marked.parse(content);
    setPreviewHtml(html);
    setPreview(true);
  };

  const handleClosePreview = () => {
    setPreview(false);
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.focus();
        contentRef.current.setSelectionRange(cursorPos, cursorPos);
      }
    }, 0);
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:border-gray-400 transition-colors";
  const labelClass = "block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5 mt-2";
  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">
          {post ? "Edit Post" : "Create Post"}
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          {post ? "Update your blog post details" : "Fill in the details for your new blog post"}
        </p>
      </div>

      {showErrorBanner && (
        <div className="text-red-600 text-sm mb-4 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          Please fix the errors before saving.
        </div>
      )}

      {success && (
        <div className="text-green-600 text-sm mb-4 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
          Post updated successfully
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-5">
        <div>
          <label htmlFor="title" className={labelClass}>Title</label>
          <input
            id="title"
            className={inputClass}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="category" className={labelClass}>Category</label>
          <input
            id="category"
            className={inputClass}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>Description</label>
          <textarea
            id="description"
            className={`${inputClass} resize-none`}
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="content" className={labelClass}>Content</label>
          {preview ? (
            <div
              data-test-id="content-preview"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 min-h-32 prose text-sm"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          ) : (
            <textarea
              id="content"
              ref={contentRef}
              className={`${inputClass} resize-none`}
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          )}
          {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
          <button
            type="button"
            className="mt-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            onClick={preview ? handleClosePreview : handlePreview}
          >
            {preview ? "Close Preview" : "Preview"}
          </button>
        </div>

        <div>
          <label htmlFor="tags" className={labelClass}>Tags</label>
          <input
            id="tags"
            className={inputClass}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          {errors.tags && <p className="text-red-500 text-xs mt-1">{errors.tags}</p>}
        </div>

        <div>
          <label htmlFor="imageUrl" className={labelClass}>Image URL</label>
          <input
            id="imageUrl"
            className={inputClass}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          {errors.imageUrl && <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>}
          {imageUrl && (
            <img
              data-test-id="image-preview"
              src={imageUrl}
              alt="Preview"
              className="mt-2 w-40 h-28 object-cover rounded-lg"
            />
          )}
        </div>

        <div className="pt-6 mt-2 border-t border-gray-100">
          <button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}