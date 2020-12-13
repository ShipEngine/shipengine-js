#!/bin/bash

tag="v$(node -p "require('./package.json').version")"

gh release create \
  "$tag" \
  --prerelease \
  --draft \
  --title "$tag" \
  --notes "releases $tag"
