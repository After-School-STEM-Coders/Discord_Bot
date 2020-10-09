#!/bin/bash
if pgrep -f "node.*Discord"
 then kill "$(pgrep -f "node.*Discord")"
fi
sleep 5
node ~/Discord_Bot/main.js &
