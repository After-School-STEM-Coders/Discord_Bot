# Discord_Bot

## Continuous Delivery:

Commits are automatically deployed to AWS servers. This uses Github Actions, viewable at ./Discord_Bot/.github/workflows/

Secrets stored in Github used for these scripts:

HOST - External IP address of EC2 instance.
USERNAME - username for amazon EC2 instance.
KEY - Text of .ppk key used for SSH authentication 
PORT - 22

JARVIS - Discord bot API key for bot #1
BARVIS - Discord bot API key for bot #2
NARVIS - Discord bot API key for bot #3

## Cattle, Not Pets:

Feel free to take your server out back if necessary. To stand up a new server:

1. Create an EC2 Instance based on Amazon's ubuntu image. Current one we're using is ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-20200907 (ami-07efac79022b86107) although given the lack of custom configuration, I'd strongly suspect that you will be able to use the latest version for a long time to come.

2. Log into the server and run the following instructions:
```sudo apt-get install npm
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install discord.js
sudo apt-get --yes install postgresql
sudo -u postgres createuser {USERNAME}
sudo su - postgres -c "psql -c 'ALTER USER {USERNAME} SUPERUSER'"
```

3. Re-assign the static Elastic IP address from the old server to the new one.

4. Make a new commit, ensure that the new bot builds on the new server and works.

5. Kill the old server.

## How to do stuff:

Most personal workflows should be supported. This is not a very opinionated setup. If your favorite workflow doesn't work, create an issue and let's chat about it.

Most reccomended workflow:

1) Clone the repo. Checkout your branch. Edit -> Commit -> Push.
2) Go to https://github.com/Super-COSC-Kids/Discord_Bot/actions amd watch your new code get deployed.
3) Test your new bot.

Need to SSH into the server?

 - IP: Your Elastic IP address.
 - port: `22`
 - user: `ubuntu`
 - Auth Method: `Public Key`
 - Private Key: `discordbotvm_yourname.ppk`
 - Passphrase: I would leave this blank personally and type in every time you connect

In a console, this would typically be done with the following:

`ssh -i "C:\Users\Ross\Downloads\discordbotvm.pem" username@3.xxx.xx.182`

You may have to convert your .ppk key to a .pem key for commandline access. However, you can use the .ppk file directly in PuTTY. Configure the Session screen like this:

<p align="center">
  <img src="./readme_files/images/PuTTY_Session.png" alt="Example screenshot of PuTTY Session settings for SSH access" width="400">
</p>

and make sure to use your .ppk file but going to Connection -> SSH -> Auth -> Browse... and selecting the file (or pasting path directly into the input field, of course):

<p align="center">
  <img src="./readme_files/images/PuTTY_SSH_Auth.png" alt="Example screenshot of PuTTY Session settings for SSH access" width="400">
</p>

Here's a screenshot of how to fill these into DBeaver to let it create a tunnel into the server so you can get direct SQL access:
<p align="center">
  <img src="./readme_files/images/DBeaver_SSH.png" alt="Example screenshot of DBeaver settings for SSH access" width="800">
</p>

SSH tunnels are required if you want to run code locally on your own laptop/desktop and interact with the database on the server. 

`ssh -i "C:\Users\Ross\Downloads\discordbotvm_yourname.pem" -L 5432:localhost:5432 username@3.xxx.xxx.182 -N`

This should make the database connection transparent for any versions of the bot running locally on your own machine. This makes it so that anything connecting to "localhost:5432" actually ends up connecting to port 5432 on the remote host but as if it were from localhost on the remote host. The server has no open ports besides 22, and will reject any attempts to connect to it. Furthermore, if requests do get through, the PostgreSQL instance would not allow your user to connect remotely. This SSH tunnel makes PostgreSQL see the connection as coming from "localhost", so it allows the connection the same as one originating from on the server.

Rather than editing local code and tunneling through SSH to the database, I'd reccomend using VSCode for Remote Development:
 - https://code.visualstudio.com/docs/remote/ssh-tutorial
 - https://code.visualstudio.com/blogs/2019/07/25/remote-ssh

Or IntelliJ's similar system (only available on Professional licenses!) The following link is for PyCharm, but WebStorm has similar functionality.
 - https://www.jetbrains.com/help/pycharm/configuring-remote-interpreters-via-ssh.html

Both of these allow your code to run on the remote machine, but gives you the same workflow you're used to on your own computer. It does everything over SCP and SSH but feels exactly like its locally happening on your own computer. It will give you a more consistent experience between dev and prod.

## Merge often

Final note - try to close up branches as soon as possible. Merge in any reasonably finalized changes, then rebranch again immediately and continue hacking.

