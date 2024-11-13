module.exports.rgbToHsv = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
  
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s, v = max;
    let d = max - min;
  
    if (max === 0) {
        s = 0;
    } else {
        s = d / max;
    }
  
    if (d === 0) {
        h = 0;
    } else {
        switch (max) {
            case r:
                h = (g - b) / d;
                if (g < b) {
                    h += 6;
                }
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
  
    // Convert to degrees for hue
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    v = Math.round(v * 100);
  
    return { h, s, v };
}

module.exports.decimalToTwoBytes = (value) => {
	return [Math.floor(value / 256),value % 256]
}

module.exports.hsvToBytes = (hue, saturation, value) => {
    return {
        hBytes: module.exports.decimalToTwoBytes(hue),
        sBytes:  module.exports.decimalToTwoBytes(saturation),
        vBytes:  module.exports.decimalToTwoBytes(value),
    };
}

module.exports.chunk = (array, n, cb) => {
    const agg = []
    for (let i = 0; i < array.length; i+=n) {
        const slice = array.slice(i, i + n)
        const result = cb ? cb(slice) : slice
        agg.push(result)
    }
    return agg
}

module.exports.rgbToHsvBytes = ({r, g, b}) => {
    const {h, s, v} = module.exports.rgbToHsv(r,g,b)
    const {hBytes, sBytes, vBytes} = module.exports.hsvToBytes(h, s * 10, v * 10)
    return {hBytes, sBytes, vBytes}

}