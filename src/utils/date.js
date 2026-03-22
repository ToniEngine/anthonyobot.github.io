export function formatPublishedDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

export function sortByPublishedDate(items, order = "desc") {
  return [...items].sort((a, b) => {
    const delta = new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
    return order === "asc" ? delta : -delta;
  });
}
