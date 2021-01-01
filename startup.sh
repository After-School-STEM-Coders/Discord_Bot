#!/bin/bash
pgrep -f "node.*COSCY" | while read -r line
do
  kill $line
done
mkdir -p ~/Discord_Bot/COSCYBOT/logs/
node ~/Discord_Bot/COSCYBOT/main.js 2>&1 | multilog t s1048576 ~/Discord_Bot/COSCYBOT/logs/ 2>&1 &