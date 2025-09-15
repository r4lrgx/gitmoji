import { RuleConfigSeverity, type QualifiedRules } from '@commitlint/types';
import commitTypes from '@/commit-types';

/**
 * Creates Gitmoji-specific commitlint rules configuration
 *
 * This configuration:
 * - Enforces Gitmoji at the start of commit messages
 * - Sets up standard commit message formatting rules
 * - Configures validation for commit types, scopes and subjects
 *
 * @returns {QualifiedRules} Commitlint rules configuration
 */
export default function createGitmojiRules(): QualifiedRules {
 return {
  // Core Gitmoji requirement
  'start-with-gitmoji': [RuleConfigSeverity.Error, 'always'],

  // Length rules (disabled for flexibility with emojis)
  'body-max-line-length': [RuleConfigSeverity.Disabled],
  'footer-max-line-length': [RuleConfigSeverity.Disabled],
  'header-max-length': [RuleConfigSeverity.Disabled],

  // Spacing rules
  'body-leading-blank': [RuleConfigSeverity.Error, 'always'],
  'footer-leading-blank': [RuleConfigSeverity.Error, 'always'],

  // Header formatting
  'header-trim': [RuleConfigSeverity.Error, 'always'],

  // Scope validation
  'scope-case': [RuleConfigSeverity.Error, 'always', ['lower-case', 'upper-case', 'camel-case', 'pascal-case', 'kebab-case', 'snake-case']],

  // Subject validation
  'subject-case': [RuleConfigSeverity.Disabled],
  'subject-empty': [RuleConfigSeverity.Error, 'never'],
  'subject-full-stop': [RuleConfigSeverity.Error, 'never', '.'],

  // Type validation
  'type-empty': [RuleConfigSeverity.Error, 'never'],
  'type-case': [RuleConfigSeverity.Error, 'always', 'lower-case'],
  'type-enum': [RuleConfigSeverity.Error, 'always', commitTypes.map((commit) => commit)],
 };
}
