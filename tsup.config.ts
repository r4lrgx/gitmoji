import { readFileSync } from 'node:fs';
import { sep } from 'node:path';
import { defineConfig } from 'tsup';

const pkg = JSON.parse(readFileSync(`${process.cwd()}${sep}package.json`, 'utf8'));

export default defineConfig({
 entry: ['src/**/*.ts', 'src/**/**/*.ts'],
 outDir: 'dist',
 format: ['esm'],
 dts: {
  resolve: true,
  compilerOptions: {
   skipLibCheck: true,
   noImplicitAny: false,
  },
 },
 splitting: false,
 clean: true,
 sourcemap: true,
 tsconfig: 'tsconfig.json',
 treeshake: {
  preset: 'recommended',
  annotations: true,
 },
 bundle: true,
 shims: false,
 platform: 'node',
 esbuildOptions: (options) => {
  options.supported = {
   'dynamic-import': true,
   'import-meta': true,
   'top-level-await': true,
  };
  options.banner = {
   js: `// ${pkg.name} v${pkg.version}\n// ${pkg.license} License\n`,
  };
 },
 define: {
  __VERSION__: `"${pkg.version}"`,
  __ESM_ONLY__: 'true',
  __BUILD_DATE__: `"${new Date().toISOString()}"`,
 },
 outExtension: () => ({ js: '.js' }),
});
