# GitHub Releases (Automated)

This boilerplate includes a GitHub Actions workflow that automatically builds your app for all platforms and creates releases. When you push a version tag, it will:

- Build for macOS (Apple Silicon + Intel)
- Build for Linux (Ubuntu)
- Build for Windows
- Create a draft release with all installers attached

## Creating a Release

```bash
# Commit your changes
git add .
git commit -m "Release v0.1.0"
git push

# Create and push a version tag
git tag v0.1.0
git push origin v0.1.0
```

The workflow will automatically start building. Check the progress at:
- **Actions Tab**: `https://github.com/YOUR_USERNAME/YOUR_REPO/actions`
- **Releases Tab**: `https://github.com/YOUR_USERNAME/YOUR_REPO/releases`

Once the workflow completes (~10-20 minutes), you'll find a draft release with all platform binaries. Review and publish it when ready.

## Updating a Failed Release

If a release fails, you can fix the issue and re-trigger:

```bash
# Commit the fix
git add .
git commit -m "Fix: issue description"
git push

# Delete the old tag (locally and remotely)
git tag -d v0.1.0
git push origin :refs/tags/v0.1.0

# Create and push the tag again
git tag v0.1.0
git push origin v0.1.0
```
