	#!/bin/sh
	apt-get update
	apt-get -y upgrade
	apt-get -y install raspi-copies-and-fills xinit unclutter nano matchbox x11-xserver-utils luakit xautomation git
	echo "deb http://sm5.us/gonk wheezy main" >> /etc/apt/sources.list
	apt-get update
	apt-get -y --force-yes install nodejs-latest
	cd /srv/
	git clone https://github.com/jguitard/node-kanban.git
	chmod +x /srv/node-kanban/install/*.sh
	chmod +x /srv/node-kanban/bin/*
	mv /etc/rc.local /etc/rc.local.old
	touch /etc/rc.local
	echo "/srv/node-kanban/install/run.sh &" >> /etc/rc.local
	echo "exit 0" >> /etc/rc.local
	reboot