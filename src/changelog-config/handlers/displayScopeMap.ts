import { Config } from '@/changelog-config/types';

/**
 * Maps a commit scope to its display name using custom mappings
 * @param {string} scope - The original scope from the commit
 * @param {Config['customScopeMap']} customScopeMap - Custom scope mapping configuration
 * @returns {string} The mapped display name or original scope if no mapping exists
 */
export const displayScopeMap = (scope: string, customScopeMap: Config['customScopeMap']): string => {
 if (!scope || !customScopeMap) return scope;

 const custom = customScopeMap[scope];
 if (custom) return custom;

 const all = customScopeMap['*'];
 if (all) {
  return all.replace(/\*/g, scope);
 }

 return scope;
};
