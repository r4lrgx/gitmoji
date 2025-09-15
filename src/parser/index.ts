import { emojiStandardRegex, gitmojiCodeRegex, gitmojiUnicodeRegex } from '@/regexs';

/**
 * Creates parser options for Gitmoji commit messages
 *
 * Configures a regex pattern that matches:
 * - Standard emojis
 * - Gitmoji codes (e.g. ":art:")
 * - Gitmoji unicode characters
 *
 * Also extracts:
 * - Commit type
 * - Scope (optional)
 * - Subject
 * - Ticket reference (optional)
 *
 * @returns {Object} Parser configuration with:
 * @property {RegExp} headerPattern - Regex for parsing commit headers
 * @property {string[]} headerCorrespondence - Mapping of captured groups
 */
export default function createGitmojiParserOpts() {
 return {
  headerPattern: new RegExp(`^(?:${String(emojiStandardRegex.source)}|(?:${String(gitmojiCodeRegex.source)})|(?:${String(gitmojiUnicodeRegex.source)}))\\s(?<type>\\w*)(?:\\((?<scope>.*)\\))?!?:\\s(?<subject>(?:(?!#).)*(?:(?!\\s).))(?:\\s\\(?(?<ticket>#\\d*)\\)?)?$`),
  headerCorrespondence: ['type', 'scope', 'subject', 'ticket'],
 };
}
