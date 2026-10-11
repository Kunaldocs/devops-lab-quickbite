# QuickBite — DevOps Lab Assignment

A small static food-delivery demo prepared for browser-first work with GitHub and GitHub Actions. No local Linux/WSL installation is required for the GitHub-hosted pipeline.

## Features
- Browse sample food items
- Add/remove items from a cart
- Update quantities and calculate totals
- Validate empty-cart checkout
- Show a demo order confirmation (no real payment or order processing)

## Tech stack
HTML, CSS, JavaScript ES modules, Node.js built-in test runner, GitHub Actions, GitHub Pages.

## Run in GitHub
1. Create a GitHub repository named `devops-lab-quickbite`.
2. Add the files in this project, preserving their folder paths.
3. Commit to the default branch named `main`.
4. Open **Settings → Pages** and set the build/deployment source to **GitHub Actions**.
5. Push a commit to `main`. In the repository, open **Actions** and inspect the `QuickBite CI/CD` workflow.
6. After the workflow succeeds, open **Settings → Pages** to find the deployed URL. The deploy job runs only for pushes to `main`, not pull requests.

## Important
- The workflow uses GitHub-hosted runners; it does not run Linux on your own computer.
- `npm ci`, automated tests, build, packaging, and Pages deployment are configured in `.github/workflows/ci-cd.yml`.
- A successful workflow run is required before reporting success. If a run fails, open its logs and fix the issue rather than claiming it passed.
- This is a demonstration app only. It does not collect personal data, process real payments, or submit orders to a real restaurant.
- For a team collaboration demonstration, invite an actual teammate as a repository collaborator and ask them to create/review a pull request. Do not claim collaboration that did not occur.

## Suggested commit messages
- `feat: add food menu`
- `feat: implement shopping cart`
- `test: add cart calculation tests`
- `ci: add automated build and deployment`
- `docs: document setup and workflow`

## Suggested branching exercise
1. Create `feature/shopping-cart` from `main`.
2. Make a small change in that branch and commit it.
3. Open a pull request into `main`.
4. Review checks and merge the pull request.
5. Confirm the Actions workflow runs after the merge.

## Assignment evidence checklist
- [ ] Jira backlog with prioritized stories and acceptance criteria
- [ ] GitHub repository and README
- [ ] Commit history with meaningful messages
- [ ] Feature branch and pull request
- [ ] Pull request merged into `main`
- [ ] Actions run showing tests and build passed
- [ ] Package artifact visible in the workflow run
- [ ] Pages deployment succeeded and URL opens
