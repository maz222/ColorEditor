// RGB = [red, green, blue] (0-255)
// HSL = [Hue, saturation, lightness] - [(int),(float <= 1),(float <= 1)]
// HEX = [red, green, blue] (00-FF)

function RGBtoHEX(rgb) {
    function base10to16(number) {
        var remainders = [];
        while(number > 16) {
            var r = number % 16;
            remainders.push(r);
            number = (number - r) / 16;
        }
        var HEXstring = "";
        function getChar(number) {
            if (number < 10) {
                return String(number);
            }
            else {
                switch(number) {
                    case 10:
                        return "A";
                    case 11:
                        return "B";
                    case 12:
                        return "C";
                    case 13:
                        return "D";
                    case 14:
                        return "E";
                    case 15:
                        return "F";
                }
            }
        }
        HEXstring = getChar(number);
        for(var i = remainders.length - 1; i >= 0; i--) {
            HEXstring += getChar(remainders[i]);
        }
        return HEXstring;
    }
    function base16toColor(number) {
        if(number.length < 2) {
            return "0" + number;
        }
        else {
            return number;
        }
    }
    var temp = [base10to16(rgb[0]), base10to16(rgb[1]), base10to16(rgb[2])];
    return [base16toColor(temp[0]), base16toColor(temp[1]), base16toColor(temp[2])];
}

function RGBtoHSL(rgb) {
    var red = rgb[0] / 255;
    var green = rgb[1] / 255;
    var blue = rgb[2] / 255;
    var cMax = Math.max(red, green, blue);
    var cMin = Math.min(red, green, blue);
    var delta = cMax - cMin;
    var hue = 0;
    if (delta != 0) {
        switch (cMax) {
            case red:
                hue = 60 * (((green - blue) / delta) % 6);
                break;
            case green:
                hue = 60 * (((blue - red) / delta) + 2);
                break;
            case blue:
                hue = 60 * (((red - green) / delta) + 4);
                break;
        }
    }
    var lightness = (cMax + cMin) / 2;
    var saturation = 0;
    if (delta != 0) {
        saturation = delta / (1 - Math.abs(2*lightness - 1));
    }
    return [hue, saturation, lightness];
}

function HSLtoRGB(hsl) {
    var c = (1 - math.abs(2 * hsl[2] - 1)) * hsl[1];
    var x = c * (1 - math.abs(hsl[0] / 60) % 2 - 1);
    var m = hsl[2] - c / 2;
    var rgb = [];
    switch (true) {
        case (hsl[0] >= 0 && hsl[0] < 60):
            rgb = [c,x,0];
            break;
        case (hsl[0] >= 60 && hsl[0] < 120):
            rgb = [x,c,0];
            break;
        case (hsl[0] >= 120 && hsl[0] < 180):
            rgb = [0,c,x];
            break;
        case (hsl[0] >= 180 && hsl[0] < 240):
            rgb = [0,x,c];
            break;
        case (hsl[0] >= 240 && hsl[0] < 300):
            rgb = [x,0,c];
            break;
        case (hsl[0] >= 300 && hsl[0] < 360):
            rgb = [c,0,x];
            break;
        default:
            rgb = [0,0,0];
            break;
    }
    rgb = [(rgb[0] + m) * 255, (rgb[1] + m) * 255, (rgb[1] + m) * 255];
    return rgb;
}

function HSLtoHEX(hsl) {
    return RGBtoHEX(HSLtoRGB(hsl));
}

function HEXtoRGB(hex) {
    var power = 0;
    var total = 0;
    for(var i = hex.length - 1; i >= 0; i--) {
        switch(hex[i]) {
            case "A":
                total += Math.pow(16,power) * 10;
                break;
            case "B":
                total += Math.pow(16,power) * 11;
                break;
            case "C":
                total += Math.pow(16,power) * 12;
                break;
            case "D":
                total += Math.pow(16,power) * 13;
                break;
            case "E":
                total += Math.pow(16,power) * 14;
                break;
            case "F":
                total += Math.pow(16,power) * 15;
                break;
            default:
                total += Math.pow(16,power) * hex[i];
        }
        power++;
    }
    return total;
}

function HEXtoHSL(hex) {
    return RGBtoHSL(HEXtoRGB(hex));
}

function mergeHSLString(hsl) {
    return "hsla(" + hsl[0] + "," + (hsl[1] * 100) + "%," + (hsl[2] * 100) + "%," + "1)";
}

function mergeHEXString(hex) {
    return "#" + hex[0] + hex[1] + hex[2];
}

function mergeRGBString(rgb) {
    return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
}

function splitRGBString(rgb) {
    rgb = rgb.slice(4, rgb.length - 1);
    rgb = rgb.split(",");
    for(num in rgb) {
        rgb[num] = parseInt(rgb[num]);
    }
    return rgb;
}

