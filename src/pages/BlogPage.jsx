import { useEffect, useMemo, useState } from "react";
import BlogCard from "../components/shared/BlogCard";
import SectionTitle from "../components/shared/SectionTitle";
import { articles } from "../data/articles";
import { sortByPublishedDate } from "../utils/date";
import { useToast } from "../context/ToastContext";

const COMMENTS_STORAGE_KEY = "comments";

export default function BlogPage() {
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [comments, setComments] = useState([]);
  const [formState, setFormState] = useState({ name: "", email: "", text: "" });
  const showToast = useToast();

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem(COMMENTS_STORAGE_KEY) || "[]");
    setComments(savedComments);
  }, []);

  const visibleArticles = useMemo(() => {
    const byDate = sortByPublishedDate(articles, sortOrder === "asc" ? "asc" : "desc");

    if (!query.trim()) {
      return byDate;
    }

    const search = query.trim().toLowerCase();

    return byDate.filter((article) =>
      `${article.title} ${article.excerpt} ${article.tags.join(" ")}`.toLowerCase().includes(search)
    );
  }, [query, sortOrder]);

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    const nextComment = {
      ...formState,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
    };

    const nextComments = [nextComment, ...comments];
    setComments(nextComments);
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(nextComments));

    setFormState({ name: "", email: "", text: "" });
    showToast("Thank you for your comment.");
  };

  return (
    <section className="container page-top-gap">
      <SectionTitle title="Blog & Writings" subtitle="Sharing insights and knowledge with the data community" />

      <div className="toolbar">
        <input
          type="search"
          placeholder="Search articles"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="search-input"
          aria-label="Search articles"
        />

        <select
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
          className="sort-select"
          aria-label="Sort articles"
        >
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>
      </div>

      <p className="results-count">
        Showing {visibleArticles.length} article{visibleArticles.length === 1 ? "" : "s"}
      </p>

      <div className="blog-grid">
        {visibleArticles.map((article) => (
          <BlogCard key={article.id} article={article} />
        ))}
      </div>

      <div className="comments-section">
        <h3>
          <i className="fa-regular fa-comments" aria-hidden="true" /> Reader Comments
        </h3>

        <div className="comments-list">
          {comments.length === 0 ? (
            <p className="empty-state">No comments yet. Be the first to comment.</p>
          ) : (
            comments.map((comment, index) => (
              <article key={`${comment.email}-${comment.date}-${index}`} className="comment">
                <div className="comment-header">
                  <span className="comment-author">{comment.name}</span>
                  <span className="comment-date">{comment.date}</span>
                </div>
                <p className="comment-text">{comment.text}</p>
              </article>
            ))
          )}
        </div>

        <div className="contact-form comment-form-wrap">
          <h4 className="sub-heading">Leave a Comment</h4>
          <form onSubmit={handleCommentSubmit}>
            <div className="form-group">
              <label htmlFor="commentName">Name</label>
              <input
                id="commentName"
                type="text"
                required
                value={formState.name}
                onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="commentEmail">Email</label>
              <input
                id="commentEmail"
                type="email"
                required
                value={formState.email}
                onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="commentText">Comment</label>
              <textarea
                id="commentText"
                required
                value={formState.text}
                onChange={(event) => setFormState((prev) => ({ ...prev, text: event.target.value }))}
              />
            </div>
            <button type="submit" className="btn submit-btn">
              Post Comment
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
