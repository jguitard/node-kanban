#!/bin/sh
cd /srv/node-kanban
git pull origin development
chmod +x /srv/node-kanban/install/*
chmod +x /srv/node-kanban/bin/*