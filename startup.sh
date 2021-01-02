#!/bin/bash
pgrep -f "node.*welcome_roles_branch" | while read -r line
do
  kill $line
done
mkdir -p ~/Discord_Bot/rules_branch/logs/
node ~/Discord_Bot/welcome_roles_branch/main.js 2>&1 | multilog t s1048576 ~/Discord_Bot/welcome_roles_branch/logs/ 2>&1 &