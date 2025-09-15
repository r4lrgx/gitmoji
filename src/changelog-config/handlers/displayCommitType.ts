import _ from 'lodash';
import type { CommitTypes, Config, CustomCommitTypeNameMap } from '@/changelog-config/types';

const { merge } = _;

type CommitTypeMap = Record<CommitTypes, CustomCommitTypeNameMap>;

export const commitTypeMap: CommitTypeMap = {
 feat: {
  emoji: '✨',
  title: 'Features',
  subtitle: 'New features and enhancements',
 },
 fix: {
  emoji: '🐛',
  title: 'Bug Fixes',
  subtitle: 'Resolved bugs and issues',
 },
 perf: {
  emoji: '⚡',
  title: 'Performance Improvements',
  subtitle: 'Faster, leaner, better',
 },

 refactor: {
  emoji: '♻',
  title: 'Code Refactoring',
  subtitle: 'Code structure improvements',
 },
 chore: {
  emoji: '🔧',
  title: 'Chores',
  subtitle: 'Other tasks and maintenance',
 },

 docs: {
  emoji: '📝',
  title: 'Documentation',
  subtitle: 'Docs updates and improvements',
 },

 build: {
  emoji: '📦️',
  title: 'Build System',
  subtitle: 'Changes to build tools and processes',
 },

 ci: {
  emoji: '👷',
  title: 'Continuous Integration',
  subtitle: 'CI config updates and automation',
 },
 test: {
  emoji: '✅',
  title: 'Tests',
  subtitle: 'Added or updated tests',
 },

 style: {
  emoji: '🎨',
  title: 'Styles',
  subtitle: 'Visual tweaks and formatting',
 },

 wip: {
  emoji: '🚑️',
  title: 'Cleaning',
  subtitle: 'Work in progress or cleanup',
 },
 revert: {
  emoji: '⏪',
  title: 'Reverts',
  subtitle: 'Undone changes and rollbacks',
 },
} satisfies CommitTypeMap;

/**
 * Merges custom commit type mappings with defaults
 * @param {Config['customCommitTypeMap']} customCommitTypeMap - Custom type mappings to merge
 * @returns {CommitTypeMap} Combined commit type mapping
 */
export const defineCommitTypeMap = (customCommitTypeMap: Config['customCommitTypeMap']): CommitTypeMap => {
 if (!customCommitTypeMap) return commitTypeMap;
 return merge(customCommitTypeMap, commitTypeMap);
};

/**
 * Formats a commit type for display with optional emoji
 * @param {CommitTypes | string} commitType - The commit type to format
 * @param {Config} config - Configuration object
 * @returns {CommitTypes | string} Formatted commit type display string
 */
export const displayCommitType = (commitType: CommitTypes | string, config: Config): CommitTypes | string => {
 const { withEmoji = true, customCommitTypeMap = undefined } = config;
 const diplayCommitTypeMap = defineCommitTypeMap(customCommitTypeMap);

 if (commitType in diplayCommitTypeMap) {
  const item = diplayCommitTypeMap[commitType as keyof typeof diplayCommitTypeMap];
  const { emoji, title } = item;
  return `${withEmoji ? `${emoji} ` : ''}${title}`;
 }

 return commitType;
};
