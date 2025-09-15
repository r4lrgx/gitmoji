import { gitmojis } from 'gitmojis';

/**
 * Array of gitmoji codes (e.g. [":art:", ":zap:", ...])
 * Extracted from the gitmojis package
 */
export const gitmojiCodes: string[] = gitmojis.map((gitmoji) => gitmoji.code);

/**
 * Array of gitmoji unicode characters (e.g. ["🎨", "⚡", ...])
 * Extracted from the gitmojis package
 */
export const gitmojiUnicodes: string[] = gitmojis.map((gitmoji) => gitmoji.emoji);
