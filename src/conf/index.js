require('dotenv').config()
const {existsSync} = require('fs');
const pathfs = require('path');
const pathToHomeAssistantConfig = pathfs.resolve('/data/options.json')
if(existsSync(pathToHomeAssistantConfig)) {
	require('dotenv').config({path: pathToHomeAssistantConfig})
}
const {
  TUYA_SERVER_URL,
  TUYA_SECRET_KEY,
  TUYA_ACCESS_KEY,
  APIKEY,
  PORT
} = process.env

console.log('Configure with tuya', TUYA_ACCESS_KEY)
module.exports = {
  TUYA_SERVER_URL: TUYA_SERVER_URL || 'https://openapi.tuyaeu.com',
  TUYA_SECRET_KEY: TUYA_SECRET_KEY || '',
  TUYA_ACCESS_KEY: TUYA_ACCESS_KEY || '',
  APIKEY: APIKEY || '',
  PORT: PORT || '5845',
}