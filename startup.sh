#!/bin/bash
if pgrep -f "node.*roles_branch_bot"
 then kill "$(pgrep -f "node.*roles_branch_bot")"
fi
sleep 5
node ~/Discord_Bot/COSCYBOT/main.js &
