#!/bin/bash
LIST="data/picture-tree"
OUTDIR="data/"
OUTFILE="out.jpg"

thisdir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"/
dropboxpath="$(tail -n +$(rand $(wc -l "$thisdir$LIST")) "$thisdir$LIST" | head -n 1)"
echo "$thisdir/download.js" "$dropboxpath" "$thisdir$OUTDIR/"
filein=$("$thisdir/download.js" "$dropboxpath" "$thisdir$OUTDIR/")
echo "Filename: $filein"
caption="$(basename "$filein"|sed 's/^.*__photos__places__//g'|sed 's/__/:  /g')"
echo "Caption: $caption"
fileout="out.jpg"
height=$(identify "$filein" | sed 's/^.*[0-9][0-9]*x\([0-9][0-9]*\)+[0-9][0-9]*+[0-9][0-9]*.*/\1/')
fontsize="$(expr $height / 35)" # need better algorithm here...

convert "$filein"  -background white -pointsize "$fontsize"  label:$'-\n-\n'"$caption"  +swap  -gravity Center -append "$fileout"

absfile="$(readlink -f "$fileout")"

dconf write /org/mate/desktop/background/picture-filename "'$absfile'"

