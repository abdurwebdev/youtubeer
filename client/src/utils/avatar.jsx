export function getAvatar(name, url) {
  if (url) return url;
  const firstLetter = name?.[0]?.toUpperCase() || 'U';
  return `https://ui-avatars.com/api/?name=${firstLetter}`;
}