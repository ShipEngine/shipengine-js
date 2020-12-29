#!/bin/bash
# This script programmatically generates tutorials and examples from .lit files.

doc_path=./docs

# use cd to go to  path so relative paths in css don't break in literate.
cd $doc_path || return

# stick all *lit files in current directory in array
i=0
while read -r line; do
  lit_files[$i]="$line"
  ((i++))
done < <(ls ./*.lit)

function generate_docs() {
  lit -w "$1" -odir tutorials
  lit -t "$1" -odir examples
}

# generate docs for each .lit file
for file in "${lit_files[@]}"; do
  generate_docs "$file"
done

cd - || return
