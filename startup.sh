#!/bin/bash
if pgrep -f "node.*Narvis"
 then kill "$(pgrep -f "node.*Narvis")"
fi
sleep 5
node ~/Discord_Bot/Narvis/main.js &
