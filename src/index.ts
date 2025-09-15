import changelogConfig from '@/changelog-config';
import commitTypes from '@/commit-types';
import commitlintConfig from '@/commitlint-config';
import parser from '@/parser';
import regexs from '@/regexs';

/**
 * Main configuration export aggregating all sub-configurations
 *
 * Provides a centralized export of:
 * - Changelog generation settings
 * - Supported commit types
 * - Commitlint rules and plugins
 * - Commit message parser options
 * - Regular expressions for validation
 */
export default {
 changelog: changelogConfig(),
 commitTypes,
 commitlint: commitlintConfig,
 parser: parser(),
 regexs,
};
