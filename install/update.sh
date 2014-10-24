#!/bin/sh
killall xinit
killall node
cd /srv/node-kanban
git pull origin master
chmod +x /srv/node-kanban/install/*
chmod +x /srv/node-kanban/bin/*
reboot