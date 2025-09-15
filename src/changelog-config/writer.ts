import { readFileSync } from 'node:fs';
import { sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { finalizeContext } from '@/changelog-config/context';
import { transformer } from '@/changelog-config/handlers';
import type { Config } from '@/changelog-config/types';

const dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * Increases heading levels in a markdown template by one level if shouldReduce is true.
 *
 * @param {boolean} skip - Whether to increase heading levels
 * @param {string} template - The markdown template to process
 * @returns {string} The processed template with adjusted heading levels or original if no processing needed
 */
const reduceHeadingLevel = (skip: boolean, template: string): string => {
 if (skip) return template;
 return template.replace(/(^|\n)(#{1,5})(?=\s)/g, (_match, prefix, hashes) => {
  return `${prefix}${hashes}#`;
 });
};

/**
 * Reads a template file from the templates directory.
 *
 * @param {string} name - The name of the template file (without extension)
 * @returns {string} The content of the template file
 */
const readTemplate = (name: string): string => {
 return readFileSync(`${dirname}${sep}templates${sep}${name}.hbs`, 'utf-8');
};

/**
 * Creates gitmoji writer options based on configuration.
 *
 * @param {Config} config - The configuration object
 * @returns {Object} The writer options object
 */
export default function createGitmojiWriterOpts(config: Config) {
 const [
  // prettier
  authorAvatar,
  author,
  backToTop,
  commit,
  footer,
  headerNewlineTimestamp,
  header,
  summaryAvatar,
  summaryTemplate,
  template,
 ] = [
  // prettier
  readTemplate('author-avatar'),
  readTemplate('author'),
  readTemplate('back-to-top'),
  readTemplate('commit'),
  readTemplate('footer'),
  readTemplate('header-newline-timestamp'),
  readTemplate('header'),
  readTemplate('summary-avatar'),
  readTemplate('summary-template'),
  readTemplate('template'),
 ];

 const shouldReduce = !config.reduceHeadingLevel;

 const mainTemplate = () => {
  if (!config.showSummary) return template;
  if (config.showAuthor && config.showAuthorAvatar) return summaryTemplate.replace(/{{gitUserInfo}}/g, summaryAvatar);
  return summaryTemplate.replace(/{{gitUserInfo}}/g, '');
 };

 const headerPartial = () => {
  if (!config.newlineTimestamp) return header;
  return headerNewlineTimestamp;
 };

 const commitPartial = () => {
  let gitUserInfo = '';
  if (config.showAuthor) gitUserInfo = config.showAuthorAvatar ? authorAvatar : author;
  return commit.replace(/{{gitUserInfo}}/g, gitUserInfo);
 };

 const footerPartial = () => {
  if (config.addBackToTop) return footer.replace(/{{backToTop}}/g, backToTop);
  return footer.replace(/{{backToTop}}/g, '');
 };

 return {
  transform: transformer(config),
  groupBy: 'type',
  commitGroupsSort: 'title',
  commitsSort: ['scope', 'subject'],
  noteGroupsSort: 'title',
  mainTemplate: reduceHeadingLevel(shouldReduce, mainTemplate()),
  headerPartial: reduceHeadingLevel(shouldReduce, headerPartial()),
  commitPartial: reduceHeadingLevel(shouldReduce, commitPartial()),
  footerPartial: reduceHeadingLevel(shouldReduce, footerPartial()),
  finalizeContext: finalizeContext(config),
 };
}
