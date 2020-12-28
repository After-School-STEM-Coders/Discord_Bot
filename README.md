  # logging branch

  ## What is the intention for logging?
  
 output from console.log() and error output (such as occurs when the application crashes) should be stored in a file for future reference to help with debugging.

 The typical terminal output should suffice.
 
 There is a risk that long-lived instances may create large log files. Canonical ways to handle this include:
 
  - logrotate(8)
  - cyclog
  - multilog (daemontools)
  
  I've chosen not to go with logrotate because it requires cron jobs, so it's possible that a runaway process will write a truly unexpected amount of data in the time window allowed.
  cyclog and multilog both seem simple and exactly what we need, but cyclog is not readily available in apt-get.
  
  Therefore `multilog` appears to be a good choice. This changes the initial server setup to:
  
  \2. Log into the server and run the following instructions:
  ```sh
  sudo apt-get install npm
  curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
  sudo apt-get install -y nodejs
  npm install discord.js
  sudo apt-get --yes install postgresql
  sudo -u postgres createuser {USERNAME}
  sudo su - postgres -c "psql -c 'ALTER USER {USERNAME} SUPERUSER'"
  sudo apt-get install daemontools
  ```
 
  Then the command to run the discord bot becomes:
  ```node main.js 2>&1 | multilog t s1048576 ./logs/```
 
  ## Primary maintainers of the roles_command branch:
  
   - @rckoepke
   
  ## Todo list:
 
   - Investigate potentially using `systemd` / `journald` instead of `multilog`.
   