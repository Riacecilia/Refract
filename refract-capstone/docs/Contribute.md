---
title: Contribute
sidebar_position: 6
---

## Refract Contribution Guide

Hello! We're excited that you're interested in contributing to the Refract project. This guide will walk you through the process, from setting up your development environment to submitting your first pull request. We appreciate any and all contributions, whether it's a bug fix, a new feature, or an improvement to the documentation.


## Set up your local environment

To get your local development environment set up, please follow these steps.


:::note[Prerequisites]

Make sure you have a recent version of **Node.js** and a package manager like **npm** or **yarn** installed on your machine.

:::


1. **Fork the Repository**

First, go to the main Refract repository on GitHub and click the **"Fork"** button in the top-right corner. This will create a copy of the repository under your own account.

2.  **Clone Your Fork**

Clone the forked repository to your local machine using a terminal. Be sure to replace `YOUR-USERNAME` with your GitHub username.

```bash
git clone https://github.com/YOUR-USERNAME/refract.git
```

3. **Install Dependencies**

Navigate into the cloned directory and install all the project's dependencies.

```bash
cd refract
npm install # or yarn install
```

You are now ready to start making changes.



## Contribute as a beginner

If you're new to the project and aren't sure where to start, look for issues labeled **"good first issue"** in our issue tracker. These issues are specifically chosen to be simple and straightforward, making them an ideal way to get familiar with the codebase and the contribution process.



## Style and Conventions

To ensure a consistent and readable codebase, we ask that you follow a few conventions.

### Linting and Formatting

The project uses **ESLint** for linting and **Prettier** for code formatting. Please ensure your code passes the linting checks before submitting. Many code editors have built-in integrations for these tools. You can also run them manually from your terminal:

```bash
npm run lint
npm run format
```

### JSDoc Comments

For all new functions, components, and hooks, please add **JSDoc comments** to clearly describe their purpose, parameters, and return values. This is essential for maintaining clear and accurate documentation.


## Testing

All new features and bug fixes should be accompanied by tests. This helps us ensure that the project remains stable and that your changes don't introduce new issues.

### Run some tests

To run the full test suite, use the following command:

```bash
npm test
```

### Writing a new test

If you're adding a new feature, please write tests that cover its functionality. If you're fixing a bug, add a test that reproduces the bug before your fix and then passes after the fix is implemented.



## Submit your contribution

Once you're ready to submit your contribution, follow these steps to create a pull request.

1. **Create a New Branch**

Create a new branch for your feature or bug fix. Use a descriptive name that summarizes your changes.

```bash
git checkout -b feature/my-new-feature
```

2. **Commit Your Changes**

Make your commits with clear, concise, and descriptive commit messages. A good commit message explains what you did and why you did it.

```bash
git add .
git commit -m "feat: add support for new hook"
```

3. **Push to Your Fork**

Push your new branch to your forked repository on GitHub.

```bash
git push origin feature/my-new-feature
```

4. **Open a Pull Request**

Go to your fork's page on GitHub and click the **"Compare & pull request"** button that appears. 


Fill out the pull request template, providing as much detail as possible about your changes. 


If your pull request addresses an existing issue, please link to it (e.g., `Fixes #123`).

-----

## Questions and Help

If you have any questions or get stuck at any point, don't hesitate to open an issue or ask for help. We're happy to guide you through the process and help you get your contribution merged.

Thanks again for your interest in making Refract better.
