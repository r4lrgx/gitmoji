import emojiRegex from 'emoji-regex';
import { gitmojis } from 'gitmojis';

/**
 * Matches any standard Unicode emoji character.
 * Uses the `emoji-regex` package to cover all emojis across versions.
 * @returns {RegExp} that matches any standard Unicode emoji  (e.g., ':art:', ':zap:', '🎨', '⚡️').
 */
export const emojiStandardRegex = emojiRegex();

/**
 * Matches gitmoji-style codes like `:sparkles:`, `:bug:`, etc.
 * These are often used in commit messages following the gitmoji convention.
 * @returns {RegExp} that matches gitmoji-style codes (e.g., :sparkles:, :bug:).
 */
export const gitmojiCodeRegex = new RegExp(/:\w*:/);

/**
 * Matches Unicode emoji characters that are defined in the gitmoji list.
 * Pulls the list of emojis from the `gitmojis` package.
 * @returns {RegExp} that matches Unicode emoji characters defined in the gitmoji list  (e.g., '🎨', '⚡️', '🔥', '🐛').
 */
export const gitmojiUnicodeRegex = new RegExp(
 gitmojis
  .map((gitmoji) => gitmoji.emoji)
  .filter(Boolean)
  .join('|')
);

export default {
 emojiStandardRegex,
 gitmojiCodeRegex,
 gitmojiUnicodeRegex,
};
