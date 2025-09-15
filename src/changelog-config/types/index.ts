import { CommitTypes as Types } from '@/commit-types/types';

export type CommitTypes = Types;

export interface ICommit {
 long: string;
 short: string;
}

export interface ICommitTree {
 long: string;
 short: string;
}

export interface ICommitAuthor {
 name: string;
 email: string;
 date: Date;
}

export interface ICommitter {
 name: string;
 email: string;
 date: Date;
}

export interface ICommitNote {
 title: string;
 text: string;
}

export interface ICommitReferences {
 issue?: string;
}

export interface Commit {
 commit: ICommit;
 tree: ICommitTree;
 author: ICommitAuthor;
 committer: ICommitter;
 subject?: string | null;
 body?: string | null;
 hash?: string | null;
 committerDate?: Date | null;
 message: string;
 gitTags: string;
 merge?: string | null;
 revert?: Record<string, unknown> | null;
 header?: string | null;
 footer?: string | null;
 notes: ICommitNote[];
 mentions: string[];
 references: ICommitReferences[];
 type?: CommitTypes | string | null;
 scope?: string | null;
 ticket?: string | null;
 [key: string]: unknown | Record<string, unknown>;
}

export interface CommitGroup {
 title: string;
 commits: Commit[];
}

export interface NoteGroup {
 title: string;
 notes: ICommitNote[];
}

export interface Context {
 commit?: string;
 issue?: string;
 date?: Date;
 version?: string;
 host?: string;
 owner?: string;
 repository?: string;
 previousTag?: string;
 packageData: Record<string, unknown>;
 linkReferences?: boolean;
 isPatch?: boolean;
 title?: string;
 repoUrl?: string;
 commitGroups?: CommitGroup[];
 noteGroups?: NoteGroup[];
 [key: string]: unknown | Record<string, unknown>;
}

export interface CustomCommitTypeNameMap {
 emoji: string;
 title: string;
 subtitle: string;
}

export interface Config {
 customCommitTypeMap?: {
  // prettier
  [key in CommitTypes]?: CustomCommitTypeNameMap;
 };
 customScopeMap?: Record<string, string>;
 displayCommitTypes?: CommitTypes[];
 displayScopes?: string[];
 showAuthor?: boolean;
 showAuthorAvatar?: boolean;
 showSummary?: boolean;
 withEmoji?: boolean;
 reduceHeadingLevel?: boolean;
 newlineTimestamp?: boolean;
 addBackToTop?: boolean;
}

export interface GitHubLookup {
 authorName?: string;
 authorAvatar?: string;
 authorUrl?: string;
 authorEmail?: string;
}
