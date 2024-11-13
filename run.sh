#!/usr/bin/with-contenv bashio
TUYA_SECRET_KEY=$(jq -r '.TUYA_SECRET_KEY' /data/options.json)
TUYA_ACCESS_KEY=$(jq -r '.TUYA_ACCESS_KEY' /data/options.json)
APIKEY=$(jq -r '.APIKEY' /data/options.json)

# Définir les variables d'environnement pour le reste du script
export TUYA_SECRET_KEY
export TUYA_ACCESS_KEY
export APIKEY

node src/index.js