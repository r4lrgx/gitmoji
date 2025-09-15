import type { UserConfig } from '@commitlint/types';
import createGitmojiPlugin from '@/commitlint-config/plugin';
import createGitmojiPreset from '@/commitlint-config/preset';
import createGitmojiRules from '@/commitlint-config/rules';

/**
 * Commitlint configuration with Gitmoji support
 *
 * This configuration:
 * - Uses the standard commitlint formatter
 * - Applies Gitmoji-specific validation rules
 * - Includes Gitmoji parser preset
 * - Loads Gitmoji plugin for extended functionality
 */
const config: UserConfig = {
 formatter: '@commitlint/format',
 rules: createGitmojiRules(),
 parserPreset: createGitmojiPreset(),
 plugins: [createGitmojiPlugin()],
} satisfies UserConfig;

export default config;
