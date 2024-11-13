const { TuyaContext  } = require('@tuya/tuya-connector-nodejs');
const base64 = require('base64-js'); // Si besoin, installez avec 'npm install base64-js'
const { rgbToHsv, hsvToBytes, chunk, rgbToHsvBytes } = require('../helpers');

class TuyaAdressableStrip {
  constructor({baseUrl, accessKey, secretKey} = {}) {
		this.tuya = new TuyaContext({
			baseUrl,
			accessKey,
			secretKey,
		});
	}

	setStripAddressColor(device_id, {segment, gradient, rgb} = {}) {
		const {hBytes,sBytes, vBytes} = rgbToHsvBytes(rgb || {})
		const tabInTuya = 2
		const tuyaColor = Uint8Array.from([0, tabInTuya, gradient, 20, 1, ...hBytes, ...sBytes, ...vBytes,129,segment & 0xFF])
		const b64 = base64.fromByteArray(tuyaColor)
		this.sendPaintColor(device_id, b64)
		if(rgb) {
		}
	}

	setPattern(device_id, {gradient, rgbs}) {
		const tabInTuya = 3
		const hsvsBytes = rgbs.map(rgb => {
			const {hBytes,sBytes, vBytes} = rgbToHsvBytes(rgb || {})
			return [hBytes, sBytes, vBytes]
		}).flat(2)
		const tuyaColor = Uint8Array.from([0, tabInTuya, gradient, 20, 1, ...hsvsBytes])
		const b64 = base64.fromByteArray(tuyaColor)
		this.sendPaintColor(device_id, b64)
	}

	decodePayload(payload) {
		const [firstByte, tabInTuya, gradient, stripLength,,...rest] = [...base64.toByteArray(payload)]
		const pairs = chunk(rest, 2, ([first, second]) => first*256 + second)
		const hsvs = chunk(pairs, 3, ([h, s,v]) => ({h,s,v})).filter(({s}) => s)
		const segment = tabInTuya !== 3 ? rest[rest.length-1]:undefined 
		return {
			firstByte, tabInTuya, gradient, hsvs, rest, segment, stripLength
		}
	}
	encodePayload(payload) {
		const [firstByte, tabInTuya, gradient, stripLength,,...rest] = [...base64.toByteArray(payload)]
		const pairs = chunk(rest, 2, ([first, second]) => first*256 + second)
		const hsvs = chunk(pairs, 3, ([h, s,v]) => ({h,s,v})).filter(({s}) => s)
		const segment = tabInTuya !== 3 ? rest[rest.length-1]:undefined 
		return {
			firstByte, tabInTuya, gradient, hsvs, rest, segment, stripLength
		}
	}

	sendPaintColor(device_id, param) {
		return this.tuya.request({
			path: `/v1.0/iot-03/devices/${device_id}/commands`,
			method: 'POST',
			body : {
				commands: [
					{code: "work_mode", value: 'colour'},
					{code: "paint_colour_data", value: param}
				]
			}
		});
	}
}

module.exports = TuyaAdressableStrip
