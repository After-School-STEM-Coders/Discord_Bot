#!/bin/bash
if pgrep -f "node.*Barvis"
 then kill "$(pgrep -f "node.*Barvis")"
fi
sleep 5
node ~/Discord_Bot/Barvis/main.js &