import type { Rule } from '@commitlint/types';
import { gitmojiCodes, gitmojiUnicodes } from '@/commitlint-config/plugin/codes';
import { emojiStandardRegex, gitmojiCodeRegex, gitmojiUnicodeRegex } from '@/regexs';

const defaultErrorMessage = 'Your commit should start with a valid gitmoji code.';
/**
 * Generates an error message for invalid gitmojis
 * @param {string} emoji - The invalid emoji/code
 */
const notInListError = (emoji: string) => `${emoji} is not in the correct gitmoji list, please check the emoji code on https://gitmoji.dev/.`;

/**
 * Commitlint rule that validates gitmoji prefixes
 * @param {Rule} commit - The commit object to validate
 * @returns {[boolean, string]} Tuple with validation result and error message
 */
const createGitmojiRule: Rule = (commit): [boolean, string] => {
 const commitMessage = commit.header?.trim() || '';

 if (!commitMessage) {
  return [false, defaultErrorMessage];
 }

 const gitmojiCodePattern = new RegExp(`^(${gitmojiCodeRegex.source})\\s`);
 const gitmojiUnicodePattern = new RegExp(`^(${gitmojiUnicodeRegex.source})\\s`);
 const emojiStandardPattern = new RegExp(`^(${emojiStandardRegex.source})\\s`);

 const testGitmojiCode = gitmojiCodePattern.exec(commitMessage);
 const testGitmojiUnicode = gitmojiUnicodePattern.exec(commitMessage);
 const testStandardEmoji = emojiStandardPattern.exec(commitMessage);

 if (testGitmojiCode) {
  const [_, code] = testGitmojiCode;
  const isValid = gitmojiCodes.includes(code);
  return [isValid, isValid ? '' : notInListError(code)];
 }

 if (testGitmojiUnicode) {
  const [_, unicode] = testGitmojiUnicode;
  const isValid = gitmojiUnicodes.includes(unicode);
  return [isValid, isValid ? '' : notInListError(unicode)];
 }

 if (testStandardEmoji) {
  const [_, emoji] = testStandardEmoji;
  return [false, notInListError(emoji)];
 }

 return [false, defaultErrorMessage];
};

export default createGitmojiRule;
