

# node-kanban

NodeKanban is a tool that aims to support change management in software engineering.

This tool offers to the users a virtual Kanban Board and also the required software components for interacting with the board from their workstations. The user experience is designed as nearest as possible to a physical Kanban board so users can take the virtual implementation as a help for quick change management instead of a hurdle that delays or adds undesired constraints to the software development process.


## How it works?

This tool shows a Kanban board in a huge screen so the team members can see the whole working flow. They can handle tasks status from their computers using a lightweight and unobtrusive client application and the status changes are reflected on the screen in real time. As simple as that.

## Hardware and software requirements

NodeKanban is intended to run on Raspberry Pi, under a almost minimal Raspbian operating system setup, attached to a Full HD screen via HDMI interface and a Ethernet network connection. However, it can run on any platform that supports Node.js, has a network connection, and has the ability to attach a screen with at least 1920 by 1080 pixels.

## Raspberry PI recipe

1. Get:

- A fully-working computer with Internet access and SD card reader.
- A Raspberry PI (model B or model B+).
- A MicroUSB power adaptor.
- An HDMI cable.
- An Ethernet cable.
- An available Ethernet outlet with DHCP enabled (for connecting the Raspberry PI to the Internet).
- An USB keyboard.
- A empty SD card (at least class 10 SDHC with 8 GB storage is recommended).

2. Download the latest raspbian-ua-netinst ZIP archive release here: https://github.com/debian-pi/raspbian-ua-netinst/releases

3. Insert the SD card in your computer, uncompress the ZIP archive and copy its contents to the SD card.

4.Create a plain text file called post-install.txt into the SD card. Add the following content and save it:

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
	mv /etc/rc.local /etc/rc.local.old
	touch /etc/rc.local
	echo "/srv/node-kanban/install/run.sh &" >> /etc/rc.local
	echo "exit 0" >> /etc/rc.local
	reboot

5. Eject the SD card from your computer. Don't forget to unmount (extract safely) the drive.

6. Insert the SD card in the Raspberry Pi, attach it to the screen using the HDMI cable, plug the Ethernet cable, connect the keyboard, and finally connect the power adaptor using the MicroUSB cable.

7. Wait until the installation is ready. The Raspberry Pi will reboot a few times and the installation will be ready when you see the Kanban Board at your screen.

### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.
