# Contributing to R-Inspect

Thank you for your interest in contributing to R-Inspect! This guide will help you understand how you can contribute to the project and the process for submitting your contributions.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [How to Contribute](#how-to-contribute)
4. [Development Workflow](#development-workflow)
5. [Pull Request Process](#pull-request-process)
6. [Style Guidelines](#style-guidelines)
7. [Community](#community)

## Code of Conduct

By participating in this project, you agree to uphold our Code of Conduct:

- Be respectful and inclusive
- Exercise consideration and empathy
- Focus on collaboration and constructive criticism
- Refrain from demeaning, discriminatory, or harassing behavior

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- MongoDB 4.x or higher
- Git
- npm or yarn

### Setting Up Your Development Environment

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/r-inspect-backend.git
   cd r-inspect-backend
   ```

3. Add the original repository as an upstream remote:
   ```bash
   git remote add upstream https://github.com/silasvergilio/r-inspect-backend.git
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Create a `.env` file based on the example in the README
6. Start the development server:
   ```bash
   npm run dev
   ```

## How to Contribute

There are many ways to contribute to R-Inspect:

### 1. Reporting Bugs

- Check the issue tracker to avoid duplicate reports
- Use the bug report template if available
- Include detailed steps to reproduce the issue
- Specify your environment (OS, Node.js version, etc.)

### 2. Suggesting Enhancements

- Check existing suggestions first
- Clearly describe the enhancement and its benefits
- Provide examples of how the enhancement would work
- Consider the scope of the enhancement

### 3. Documentation Improvements

- Help improve documentation clarity
- Fix typos and errors
- Add examples and use cases
- Translate documentation

### 4. Code Contributions

- Start with issues labeled "good first issue" or "help wanted"
- Comment on the issue to express your interest
- Follow the development workflow described below

## Development Workflow

1. **Update your fork**: Before starting work, make sure your fork is up to date:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create a branch**: Create a branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make changes**: Write your code or documentation changes

4. **Run tests**: Make sure your changes pass all tests:
   ```bash
   npm test
   ```

5. **Commit your changes**: Follow the [conventional commits](https://www.conventionalcommits.org/) format:
   ```bash
   git commit -m "feat: add new feature"
   ```

6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a pull request**: Submit a pull request to the main repository

## Pull Request Process

1. **Title**: Use a clear and descriptive title
2. **Description**: Explain what your changes do and why they should be included
3. **Link Issues**: Reference any related issues using keywords like "Fixes #123"
4. **CI Checks**: Make sure all automated checks pass
5. **Code Review**: Address feedback from maintainers
6. **Approval**: Wait for approval from at least one maintainer
7. **Merge**: A maintainer will merge your pull request when ready

## Style Guidelines

### Code Style

R-Inspect follows standard JavaScript conventions:

- Use ES6+ features
- Follow the existing code style
- Use meaningful variable and function names
- Write clear, concise comments
- Document public APIs

### Commit Messages

Follow the [conventional commits](https://www.conventionalcommits.org/) specification:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code restructuring
- `test:` for test-related changes
- `chore:` for maintenance tasks

### Documentation

- Keep documentation up to date with code changes
- Use clear, concise language
- Include examples where appropriate
- Follow markdown best practices

## Community

### Communication Channels

- GitHub Issues: For bug reports, feature requests, and discussions
- Pull Requests: For code contributions and reviews

### Getting Help

If you need help with your contribution:

- Check the documentation
- Look for similar issues in the issue tracker
- Contact the maintainers:
  - [Matheus Dubin](https://github.com/MatheusD)
  - [Amanda Wilmsen](https://github.com/amandacwilmsen)
  - [Silas Vergilio](https://github.com/silasvergilio)

Thank you for contributing to R-Inspect! Your efforts help make robot inspections more efficient for the FIRST Robotics Competition community. 