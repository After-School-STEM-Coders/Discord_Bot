#!/bin/bash
if pgrep -f "node.*loggingbranch"
 then kill "$(pgrep -f "node.*loggingbranch")"
fi
sleep 5
node ~/Discord_Bot/loggingbranch/main.js 2>&1 | multilog t s1048576 ~/Discord_Bot/loggingbranch/logs/ 2>&1 &

cd ../
