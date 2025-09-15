import type { Plugin } from '@commitlint/types';
import createGitmojiRule from '@/commitlint-config/plugin/rule';

/**
 * Creates a commitlint plugin with Gitmoji validation
 *
 * This plugin provides:
 * - A custom rule to enforce Gitmoji prefixes
 * - Validation of emoji format and correctness
 *
 * @returns {Plugin} Commitlint plugin configuration
 */
export default function createGitmojiPlugin(): Plugin {
 return {
  rules: {
   'start-with-gitmoji': createGitmojiRule,
  },
 };
}
