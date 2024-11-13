const { TUYA_ACCESS_KEY, TUYA_SERVER_URL, TUYA_SECRET_KEY, PORT, APIKEY } = require('./conf');
const PromiseB = require('bluebird')
const TuyaAdressableStrip = require('./lib/tuya')
const express = require('express');
const { rgbToHsv } = require('./helpers');
const json = require('express').json;

const tuyaAccount  = new TuyaAdressableStrip({
	baseUrl: TUYA_SERVER_URL,
	accessKey: TUYA_ACCESS_KEY,
	secretKey: TUYA_SECRET_KEY
})

const app = express();
const auth = (req, res, next) => {
	if(req.headers.authorization !== APIKEY) return res.status(401).send('Not authenticated')
	next()
}
app.use(json());
app.use(auth)
app.post('/:deviceId/cell/:segment', async (req, res) => {
	await tuyaAccount.setStripAddressColor(req.params.deviceId, {...req.body, segment: req.params.segment})
  res.json({ result: 'ok!' });
});

app.post('/:deviceId/set-pattern', async (req, res) => {
	await tuyaAccount.setPattern(req.params.deviceId, req.body)
  res.json({ result: 'ok!' });
});

app.post('/decode-payload', async (req, res) => {
	await tuyaAccount.decodePayload(req.body)
  res.json({ result: 'ok!' });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  server.close(() => {})
})

process.on('SIGHINT', () => {
  server.close(() => {})
})
