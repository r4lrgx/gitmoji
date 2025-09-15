import _ from 'lodash';
import pangu from 'pangu';
import { displayCommitType, displayScopeMap } from '@/changelog-config/handlers';
import { GitHubLookup, type Commit, type CommitTypes, type Config, type Context, type ICommitReferences } from '@/changelog-config/types';
import { gitHubLookup } from '@/changelog-config/utils/lookup';
import commitTypes from '@/commit-types';

const { cloneDeep } = _;

const users = new Map<string, GitHubLookup | null>();

/**
 * Capitalizes the first letter of a string
 * @param {string} str - The string to capitalize
 */
const capitalize = (str: string): string => {
 if (!str?.length) return str;
 return str.replace(/([a-zA-Z])/u, (firs) => firs.toUpperCase());
};

/**
 * Transforms commit data for changelog generation
 * @param {Config} config - Configuration object
 * @returns {Function} A function that processes individual commits
 */
export const transformer =
 (config: Config) =>
 /**
  * Processes a single commit
  * @param {Commit} commit - The commit object to transform
  * @param {Context} context - The context object containing repository info
  * @returns {Commit | void} The transformed commit or undefined if excluded
  */
 (commit: Commit, context: Context): Commit | void => {
  commit = cloneDeep(commit);
  const issues: ICommitReferences[] = [];

  let exclude = true;
  commit.notes.forEach((note) => {
   note.title = `${config.withEmoji === false ? '' : '💥'} BREAKING CHANGES`;
   exclude = false;
  });

  const { displayCommitTypes = commitTypes } = config;

  if ((!displayCommitTypes.includes(<CommitTypes>commit.type) && exclude) || !commit.type) return;

  commit.type = displayCommitType(commit.type, config);

  if (commit.scope) {
   if (commit.scope === '*') {
    commit.scope = '';
   }

   if (config.displayScopes) {
    if (!config.displayScopes.includes(commit.scope)) return;
   }

   if (config.customScopeMap) {
    commit.scope = displayScopeMap(commit.scope, config.customScopeMap);
   }

   commit.scope = capitalize(commit.scope);
  }

  if (commit.hash) {
   commit.hash = commit.hash.substring(0, 7);
  }

  if (commit.subject && typeof commit.subject === 'string') {
   let repository = context.repository ? `${context.host}/${context.owner}/${context.repository}` : context.repoUrl;
   if (repository) {
    repository = `${repository}/issues/`;
    commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
     issues.push({ issue });
     return `[#${issue}](${repository}${issue})`;
    });
   }

   if (commit.host && typeof commit.host === 'string') {
    commit.subject = commit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g, (_, username) => {
     if (username.includes('/')) {
      return `@${username}`;
     }

     return `[@${username}](${context.host}/${username})`;
    });
   }
  }

  commit.references = commit.references.filter((reference) => {
   const values = new Set(issues.map((item) => item.issue));
   return !values.has(reference.issue);
  });

  if (commit.subject) {
   commit.rawSubject = commit.subject;
   commit.subject = pangu.spacing(capitalize(commit.subject));
  }

  const authorEmail = commit.author.email;
  if (config.showAuthor || config.showAuthorAvatar) {
   if (!users.has(authorEmail)) {
    try {
     const author = gitHubLookup(authorEmail);
     users.set(authorEmail, author);
    } catch (_e) {
     users.set(authorEmail, null);
    }
   }

   const author = users.get(authorEmail)!;
   Object.assign(commit, author);
  }

  return commit;
 };
