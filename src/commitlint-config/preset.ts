import type { LintOptions } from '@commitlint/types';
import createGitmojiPlugin from '@/commitlint-config/plugin';
import createGitmojiParserOpts from '@/parser';

/**
 * Creates a commitlint preset with Gitmoji support
 *
 * This preset configuration:
 * - Sets up parser options for Gitmoji commit messages
 * - Registers the Gitmoji plugin for extended validation
 *
 * @returns {LintOptions} Commitlint configuration options
 */
export default function createGitmojiPreset(): LintOptions {
 return {
  parserOpts: createGitmojiParserOpts(),
  plugins: {
   gitmoji: createGitmojiPlugin(),
  },
 };
}
