Run the full deploy pipeline for VibeGlossary. Execute each step in order — if any step fails, stop and report the error.

1. **Lint.** Run `npm run lint`. If it fails, fix the issues or report them.

2. **Build.** Run `npm run build`. If the build fails, stop and report the errors.

3. **Determine semver bump** based on changes since the last git tag:
   - **patch** (X.X.1): bug fixes only
   - **minor** (X.1.0): new features, UI changes, new components
   - **major** (1.0.0): breaking changes, major rewrites
   Read the git log since the last version tag to decide.

4. **Update version** in `package.json`.

5. **Update CHANGELOG.md** with a new section for this version using Keep a Changelog format (Added, Changed, Fixed, Removed — only include sections that apply). Update the comparison links at the bottom of the file.

6. **Update README.md** if there are notable changes:
   - Update the component count and feature descriptions to reflect current state.
   - Update the project structure if new directories were added.
   - Keep the deployment section accurate (Firebase Hosting, not Render).

7. **Commit** all changes (code + docs) with a descriptive conventional commit message.

8. **Push** to the remote repository.

9. **Create a git tag** for the new version (e.g., `v0.3.0`) and push it.

10. **Create a GitHub release** via `gh release create` with release notes summarizing what changed.

11. **Deploy to Firebase Hosting** with `firebase deploy --only hosting --project vibe-glossary`.

Important notes:
- Always use `--project vibe-glossary` flag with Firebase commands.
- Do NOT deploy before getting confirmation that the build succeeded.
- The site is live at https://vibe-glossary.web.app.
