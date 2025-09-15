import { CommitTypes } from '@/commit-types/types';

/**
 * Default list of supported commit types
 *
 * These types follow conventional commit standards with some additional types:
 * - build: Changes to build system or dependencies
 * - ci: Changes to CI configuration
 * - docs: Documentation updates
 * - feat: New features
 * - fix: Bug fixes
 * - perf: Performance improvements
 * - refactor: Code refactoring
 * - revert: Reverted changes
 * - style: Code style changes
 * - test: Test additions/modifications
 * - chore: Maintenance tasks
 * - wip: Work in progress (special case)
 */
const commitTypes: CommitTypes[] = [
 // prettier
 'feat',
 'fix',
 'perf',
 'refactor',
 'chore',
 'docs',
 'build',
 'ci',
 'test',
 'style',
 'wip',
 'revert',
];

export default commitTypes;
