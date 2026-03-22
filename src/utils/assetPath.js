export function assetPath(path = "") {
  const normalized = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${encodeURI(normalized)}`;
}
