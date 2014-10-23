#!/bin/sh
cd /srv/
killall xinit
killall node
rm -rf /srv/node-kanban
git clone https://github.com/jguitard/node-kanban.git
chmod +x /srv/node-kanban/install/*.sh
reboot