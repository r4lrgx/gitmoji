import config from '@/changelog-config/config';
import createParserOpts from '@/changelog-config/parser';
import whatBump from '@/changelog-config/whatBump';
import createGitmojiWriterOpts from '@/changelog-config/writer';

/**
 * Creates a complete semantic-release preset configuration
 * @returns {Object} Configuration object containing:
 * @property {Object} parser - Commit parser options
 * @property {Object} writer - Changelog writer options
 * @property {Function} whatBump - Version bump calculator function
 */
export default function createPreset() {
 return {
  parser: createParserOpts(),
  writer: createGitmojiWriterOpts(config()),
  whatBump,
 };
}
