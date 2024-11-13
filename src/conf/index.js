const {
  TUYA_SERVER_URL,
  TUYA_SECRET_KEY,
  TUYA_ACCESS_KEY,
  APIKEY,
  PORT
} = process.env
module.exports = {
  TUYA_SERVER_URL: TUYA_SERVER_URL || 'https://openapi.tuyaeu.com',
  TUYA_SECRET_KEY: TUYA_SECRET_KEY || '',
  TUYA_ACCESS_KEY: TUYA_ACCESS_KEY || '',
  APIKEY: APIKEY || '',
  PORT: PORT || '3000',
}