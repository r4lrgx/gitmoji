import { Commit } from '@/changelog-config/types';

interface IWhatBump {
 level: 0 | 1 | 2;
 reason: string;
}

/**
 * Formats count message with proper pluralization
 *
 * @param {number} count - Number of items
 * @param {string} singular - Singular form of the noun
 * @returns {string} Formatted message
 */
function formatMessage(count: number, singular: string): string {
 if (count === 0) return `0 ${singular}s`;
 if (count === 1) return `1 ${singular}`;
 return `${count} ${singular}s`;
}

/**
 * Determines the version bump level based on commit types
 *
 * @param {Commit[]} commits - Array of commit objects to analyze
 * @returns {VersionBump} Object containing bump level and reason
 */
export default function whatBump(commits: Commit[]): IWhatBump {
 let level: 0 | 1 | 2 = 2;
 let breakings = 0;
 let features = 0;

 for (const commit of commits) {
  if (commit.notes.length > 0) {
   breakings += commit.notes.length;
   level = 0;
   continue;
  }

  if (level > 1 && commit.type === 'feat') {
   features++;
   level = 1;
  }
 }

 const BREAKING = formatMessage(breakings, 'BREAKING CHANGE');
 const FEATURE = formatMessage(features, 'feature');
 const verb = breakings === 1 ? 'is' : 'are';

 return {
  level,
  reason: `There ${verb} ${BREAKING} and ${FEATURE}`,
 };
}
