"use client";

import { useState, useEffect } from "react";
import { getArticleComments, postArticleComment } from "@/lib/cms";

export default function CommentsSection({ slug }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    let isMounted = true;
    setLoading(true);

    getArticleComments(slug)
      .then((data) => {
        if (isMounted) {
          setComments(data || []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !name.trim()) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await postArticleComment(slug, {
        name: name.trim(),
        text: newComment.trim(),
      });

      if (res?.comment) {
        setComments((prev) => [res.comment, ...prev]);
        setNewComment("");
      }
    } catch (err) {
      setError(err.message || "Failed to post comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-10 border-t border-slate-200 pt-8">
      <h2 className="text-[18px] font-bold text-navy">Comments ({comments.length})</h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {error ? (
          <div className="rounded-md bg-red-50 p-3 text-[13px] text-brand-red">
            {error}
          </div>
        ) : null}

        <div>
          <label htmlFor="comment-name" className="sr-only">Name</label>
          <input
            type="text"
            id="comment-name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
            className="w-full rounded-md border border-slate-200 px-4 py-2 text-[14px] outline-none focus:border-navy disabled:bg-slate-100"
            required
          />
        </div>
        <div>
          <label htmlFor="comment-text" className="sr-only">Comment</label>
          <textarea
            id="comment-text"
            rows={4}
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={submitting}
            className="w-full rounded-md border border-slate-200 px-4 py-3 text-[14px] outline-none focus:border-navy disabled:bg-slate-100"
            required
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-navy px-6 py-2.5 text-[14px] font-bold text-white transition hover:bg-opacity-90 disabled:opacity-50"
        >
          {submitting ? "Posting..." : "Post Comment"}
        </button>
      </form>

      <div className="mt-8 space-y-6">
        {loading ? (
          <p className="text-[14px] text-slate-400">Loading comments...</p>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id || comment._id} className="border-b border-slate-100 pb-6 last:border-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-[14px] font-bold text-navy">
                  {(comment.name || "A").charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-[14px] font-bold text-navy">{comment.name}</p>
                  <p className="text-[12px] text-slate-400">{comment.date || comment.createdAt}</p>
                </div>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-slate-700">{comment.text}</p>
            </div>
          ))
        ) : (
          <p className="text-[14px] text-slate-500">No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>
    </section>
  );
}
