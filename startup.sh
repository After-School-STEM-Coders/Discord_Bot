#!/bin/bash
if pgrep -f Discord_Bot
 then kill $(pgrep -f Discord_Bot)
fi
sleep 5
node ~/Discord_Bot/main.js &
