#!/bin/bash
pgrep -f "node.*rulesbranch" | while read -r line
do
  kill $line
done
node ~/Discord_Bot/rulesbranch/main.js 2>&1 | multilog t s1048576 ~/Discord_Bot/rulesbranch/logs/ 2>&1 &