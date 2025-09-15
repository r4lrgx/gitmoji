import { cosmiconfigSync } from 'cosmiconfig';
import type { Config } from '@/changelog-config/types';

const defaultConfig: Config = {
 withEmoji: true,
};
/**
 * Loads and merges changelog configuration from various file formats
 * @returns {Config} Merged configuration object
 * @throws {Error} If configuration file exists but contains invalid content
 */
export default function config(): Config {
 try {
  const explorer = cosmiconfigSync('changelog', {
   searchPlaces: [
    // prettier
    'changelog.config.ts',
    'changelog.config.js',
    '.changelogrc.json',
    '.changelogrc.ts',
    '.changelogrc.js',
   ],
  });
  const result = explorer.search();
  if (!result) return defaultConfig;
  const config = result.config?.default ?? result.config;
  return {
   ...defaultConfig,
   ...config,
  };
 } catch (error) {
  throw error;
 }
}
