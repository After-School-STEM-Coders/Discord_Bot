#!/bin/bash
if pgrep -f "node.*COSCY"
 then kill "$(pgrep -f "node.*COSCY")"
fi
sleep 5
node ~/Discord_Bot/COSCYBOT/main.js 2>&1 | multilog t s1048576 ~/Discord_Bot/COSCYBOT/logs/ 2>&1 &
