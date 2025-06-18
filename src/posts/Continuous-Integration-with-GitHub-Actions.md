---
title: "Continuous Integration with GitHub Actions"
date: "2025-06-18"
category: ["Technology"]
cover: "/images/blog/blog-image-12.jpg"
thumbnail: "/images/blog/sm/blog-image-12.jpg"
---

GitHub Actions is a CI/CD platform built into GitHub. It lets you define workflows (in YAML) that run on events like pushes or pull requests. For example, you can automatically build and test code on every push. The official quickstart states: _"GitHub Actions is a continuous integration and continuous delivery (CI/CD) platform…you can create workflows that run tests whenever you push a change"_.

##### Workflow Example

```yaml
name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
```

This workflow triggers on every `push`. It checks out the code (using `actions/checkout`), installs dependencies, and runs tests. In the GitHub Actions tutorial, the example includes steps like `uses: actions/checkout@v4` to clone the repo.

##### Key Features

- **Event-Driven:** Workflows run on GitHub events (push, pull_request, schedule, etc.).
- **Matrix Builds:** Test multiple environments/versions in parallel.
- **Secrets and Env:** Securely use secrets (e.g. tokens) in your steps.
- **Marketplace:** Reuse community actions (`uses: org/action@v1`).

The example workflow above will be executed each time code is pushed, demonstrating continuous integration in action. Logs of each step appear in the GitHub UI under the “Actions” tab. For more, see [GitHub’s Actions docs](https://docs.github.com/actions). These docs show full examples of setting permissions, using actions, and more advanced CI/CD configurations.
