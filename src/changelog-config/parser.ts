import createGitmojiParserOpts from '@/parser';

/**
 * Creates parser configuration options combining gitmoji defaults with custom rules
 *
 * @returns {Object} Complete parser configuration object containing:
 * @property {RegExp} headerPattern - Pattern for parsing commit headers
 * @property {string[]} headerCorrespondence - Header field mappings
 * @property {string[]} noteKeywords - Keywords for important notes (e.g., breaking changes)
 * @property {RegExp} revertPattern - Pattern for identifying revert commits
 * @property {string[]} revertCorrespondence - Field mappings for revert commits
 */
export default function createParserOpts() {
 return {
  ...createGitmojiParserOpts(),
  noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
  revertPattern: /revert:\s([\s\S]*?)\s*This reverts commit (\w*)\./,
  revertCorrespondcene: [`header`, `hash`],
 };
}
