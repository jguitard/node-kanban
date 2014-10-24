/srv/node-kanban/install/update.sh
/srv/node-kanban/bin/www &
xinit /srv/node-kanban/install/screen.sh &
unclutter -d :0 &
sleep 15s
echo key F11 | xte -x:0