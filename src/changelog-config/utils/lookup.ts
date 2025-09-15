import fetch from 'sync-fetch';
import { GitHubLookup } from '@/changelog-config/types';

/**
 * Looks up GitHub user information by email address
 * @param {string} email - The email address to look up
 * @returns {GitHubLookup | null} User information or null if not found/error occurs
 */
export function gitHubLookup(email: string): GitHubLookup | null {
 const match = email.match(/^(\d*)\+?([a-zA-Z0-9\-]*)@users\.noreply\.github\.com$/);

 let info: Record<string, string> | null = null;
 if (match) {
  const [_, id, username] = match;
  info = { id, username };
 } else {
  try {
   const res = fetch(`https://api.github.com/search/commits?q=author-email:${encodeURIComponent(email)}`, {
    headers: {
     Accept: 'application/vnd.github.cloak-preview+json',
    },
   });
   if (!res.ok) return null;
   const data = res.json();

   if (data.items && data.items.length > 0) {
    const username = data.items[0]?.author?.login;
    const id = data.items[0]?.author?.id;
    if (id && username) info = { id, username };
   }
  } catch (_err) {
   return null;
  }
 }

 if (!info?.id || !info?.username) return null;

 try {
  const res = fetch(`https://api.github.com/users/${info.username}`, {
   headers: {
    Accept: 'application/vnd.github.cloak-preview+json',
   },
  });

  if (!res.ok) return null;
  const user = res.json();

  return {
   authorName: info.username,
   authorAvatar: user.avatar_url,
   authorUrl: user.html_url,
   authorEmail: `${info.id}+${info.username}@users.noreply.github.com`,
  };
 } catch (_err) {
  return null;
 }
}
