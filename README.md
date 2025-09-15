![Header](https://github.com/user-attachments/assets/34e8e1d7-67ba-4051-9e0d-86c547e5049b)

<div align="center">
  <a aria-label="Written with" href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/static/v1?label=Written%20with&message=Typescript&color=4c1&logo=node.js"/>
  </a>
   <a aria-label="Version" href="https://github.com/r4lrgx/gitmoji/releases">
    <img src="https://img.shields.io/github/v/release/r4lrgx/gitmoji?color=4c1&logo=github&label=Version"/>
  </a>
  <a aria-label="Weekly Downloads" href="https://www.npmjs.com/package/@r4lrgx/gitmoji">
    <img src="https://img.shields.io/npm/dw/@r4lrgx/gitmoji"/>
  </a>
</div>

---

## 📦 [`@r4lrgx/gitmoji`](https://www.npmjs.com/package/@r4lrgx/gitmoji)

### 💾 Installation

```bash
# Using npm
npm install -D @r4lrgx/gitmoji
# Using yarn
yarn add -D @r4lrgx/gitmoji
# Using pnpm
pnpm add -D @r4lrgx/gitmoji
```

### 🛠 How to use?

---

### 📅 [`gitmoji/changelog-config`](./src/changelog-config/index.ts)

> [!NOTE]
> A brief explanation of its use and the most recommended one.

You need to create a semantic release file first, [files config](https://semantic-release.gitbook.io/semantic-release/usage/configuration#configuration-file)

> [!IMPORTANT]
> To use conventional gitmoji chagelog at least in [Semantic Release](https://semantic-release.gitbook.io/semantic-release) just add it

```js
// release.config.js or .releaserc.js

const changelogConfig = {
 config: '@r4lrgx/gitmoji/changelog-config',
};

export default {
 branches: ['main'],
 plugins: [
  ['@semantic-release/commit-analyzer', changelogConfig],
  ['@semantic-release/release-notes-generator', changelogConfig],
 ],
};
```

---

### ♟ [`gitmoji/commit-types`](./src/commit-types/index.ts)

> [!NOTE]
> These are the types I use to send commits to Github

#### 1. Types

- **build:** Changes to build system or dependencies
- **ci:** Changes to CI configuration
- **docs:** Documentation updates
- **feat:** New features
- **fix:** Bug fixes
- **perf:** Performance improvements
- **refactor:** Code refactoring
- **revert:** Reverted changes
- **style:** Code style changes
- **test:** Test additions/modifications
- **chore:** Maintenance tasks
- **wip:** Work in progress (special case)

#### 2. Usage

```bash
git commit -m "📝 docs: Update README.md with project details and installation instructions"
```

---

### ✨ [`gitmoji/commitlint-config`](./src/commitlint-config/index.ts)

> [!NOTE]
> A brief explanation of its use and the most recommended one.

You need to create a commitlint file first, [files config](https://commitlint.js.org/reference/configuration.html)

```js
// commitlint.config.js or .commitlintrc.js

export default {
 extends: ['@r4lrgx/gitmoji/commitlint-config'],
};
```

### ☂ [`gitmoji/parser`](./src/parser/index.ts)

> [!NOTE]
> A brief explanation of its use and the most recommended one.

You need to create a semantic release file first, [files config](https://semantic-release.gitbook.io/semantic-release/usage/configuration#configuration-file)

> [!IMPORTANT]
> The gitmoji parser is used in the [Semantic Release](https://semantic-release.gitbook.io/semantic-release) configuration invidually, you would add only the parser and nothing else.

```js
// release.config.js or .releaserc.js

import parserOpts from '@r4lrgx/gitmoji/parser';

const changelogConfig = {
 parserOpts,
};

export default {
 branches: ['main'],
 plugins: [
  ['@semantic-release/commit-analyzer', changelogConfig],
  ['@semantic-release/release-notes-generator', changelogConfig],
 ],
};
```

---

### 🎨 [`gitmoji/regexs`](./src/regexs/index.ts)

> [!NOTE]
> It is used to export all the regexs needed for the previous configurations,
> but if you need emojis you can use it

## 🎯 Contributing

### 🔩 Reporting Issues

If you encounter any bugs or problems while using the tool, please open a new [issue here](../../issues).
To help us assist you faster, include as much detail as possible, such as:

- What you were trying to do.
- Any error messages or console logs.
- Your environment details (OS, versions, etc.)

The more info you provide, the quicker we can identify and fix the problem.

### 🔀 Pull Requests

Thanks for wanting to contribute! To submit improvements or fixes, please follow these steps:

1. Clone [this repository](https://github.com/r4lrgx/gitmoji.git) using `git clone https://github.com/r4lrgx/gitmoji.git`.
2. Create a new branch from `main` with a clear, descriptive name, for example: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them with clear, meaningful messages.
4. Open a new [pull request here](../../pulls), explaining what you added or fixed and why.

We’ll carefully review each PR and provide feedback if needed to help you get it merged.

☕ **[Thank you for your support!](https://ko-fi.com/A0A11481X5)**

<!--
## 📞 Contact

If you have any **Questions** or need **Help**, feel free to email me at [tsx@r4lrgx.dev](mailto:tsx@r4lrgx.dev) or better yet, start a discussion in our **[Github Community](../../discussions)**.
-->

## 📋 License

This repository is distributed under the terms of the **[MIT License](LICENSE.md)**.
