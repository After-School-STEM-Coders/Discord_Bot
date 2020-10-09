#!/bin/bash
if pgrep -f Discord_Bot
 then kill $(pgrep -f Discord_Bot)
fi
node ~/Discord_Bot/main.js &
