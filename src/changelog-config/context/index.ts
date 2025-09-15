import { defineCommitTypeMap } from '@/changelog-config/handlers';
import type { Config, Context, GitHubLookup, CommitGroup } from '@/changelog-config/types';
import { gitHubLookup } from '@/changelog-config/utils/lookup';

const users = new Map<string, GitHubLookup | null>();

/**
 * Finalizes and enhances the changelog context with additional metadata
 * @param {Config} config - Configuration object
 * @returns {Function} A function that processes the changelog context
 */
export const finalizeContext =
 (config: Config) =>
 /**
  * Processes the changelog context
  * @param {Context} context - The changelog context to enhance
  * @returns {Context} The enhanced context or undefined if invalid
  */
 (context: Context): Context => {
  const subCommitScope = (config.customScopeMap && config.customScopeMap['*']) ?? null;
  const commitTypeMap = defineCommitTypeMap(config.customCommitTypeMap);

  context.commitGroups = context.commitGroups?.map((item): CommitGroup & { subtitle: string } => {
   const { subtitle } = Object.values(commitTypeMap).find(({ emoji }) => item.title.includes(emoji))!;

   let group: string;
   let commits = item.commits.sort((a, b) => {
    if (a.scope === subCommitScope && b.scope === subCommitScope) {
     return 0;
    } else if (a.scope === subCommitScope) {
     return 1;
    } else if (b.scope === subCommitScope) {
     return -1;
    } else {
     return 0;
    }
   });

   commits = commits.map((commit, index) => {
    if (commit.scope) {
     if (group !== commit.scope) {
      group = commit.scope;
      commit.first = true;
     } else {
      commit.first = false;
     }
    }

    if (!commits[index + 1] || group !== commits[index + 1].scope) {
     commit.last = true;
    } else {
     commit.last = false;
    }

    const { email } = commit.author;
    if (config.showAuthor || config.showAuthorAvatar) {
     if (!users.has(email)) {
      try {
       const author = gitHubLookup(email);
       users.set(email, author);
      } catch (_e) {
       users.set(email, null);
      }
     }
    }

    return commit;
   });

   return {
    title: item.title,
    subtitle,
    commits,
   };
  });

  context.authors = Array.from(users.values())!;
  return context;
 };
