#!/bin/bash
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" != "main" ]]; then
  echo '--> Only execute this on main branch'
  exit 0
fi

# make sure you don't tag an old commit
git pull --ff-only

# don't create git tag here, it will automatically be created in the next step
npx bump prerelease --preid alpha --push

# github will automatically create a tag when you create a release
tag="v$(node -p "require('./package.json').version")"
gh release create \
  "$tag" \
  --prerelease \
  --draft \
  --title "$tag" \
  --notes "releases $tag"
