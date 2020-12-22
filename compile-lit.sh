#!/bin/bash env

current_path=$(dirname "$0")
lit_base="$current_path/dist"
doc_base="$current_path"

lit -w $lit_base/addresses.lit -odir $doc_base/tutorials
lit -t $lit_base/addresses.lit -odir $doc_base/examples


# lit -w $base/tracking.lit -odir tutorials
# lit -t $base/tracking.lit -odir examples

