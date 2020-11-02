#!/bin/bash
if pgrep -f "node.*COSCY"
 then kill "$(pgrep -f "node.*COSCY")"
fi
sleep 5
node ~/Discord_Bot/COSCYBOT/main.js &
