function setRed(value) {
	var slider = document.getElementById("red-slider");
	var text = document.getElementById("red-text");
	value = verifyRGB(value);
	slider.value = value;
	text.value = value;
	text.style.backgroundColor = "rgb(" + value + ",0,0)";
	setHex();
}

function setGreen(value) {
	var slider = document.getElementById("green-slider");
	var text = document.getElementById("green-text");
	value = verifyRGB(value);
	slider.value = value;
	text.value = value;
	text.style.backgroundColor = "rgb(0," + value + ",0)";
	setHex();
}

function setBlue(value) {
	var slider = document.getElementById("blue-slider");
	var text = document.getElementById("blue-text");
	value = verifyRGB(value);
	slider.value = value;
	text.value = value;
	text.style.backgroundColor = "rgb(0,0," + value + ")";
	setHex();
}

function verifyRGB(value) {
	if(isNaN(value)) {
		return 0;
	}
	return(Math.min(Math.max(value,0),255));
}

function RGBtoHEX(strValue) {
	strValue = parseInt(strValue).toString(16).toUpperCase();
	if(strValue.length < 2) {
		strValue = "0" + strValue;
	}
	return strValue;
}

function setHex() {
	var redVal = document.getElementById("red-slider").value;
	var greenVal = document.getElementById("green-slider").value;
	var blueVal = document.getElementById("blue-slider").value;
	var hexField = document.getElementById("hex-text");
	hexField.style.backgroundColor = "rgb(" + redVal + "," + greenVal + "," + blueVal + ")";
	hexVal = [RGBtoHEX(redVal), RGBtoHEX(greenVal), RGBtoHEX(blueVal)];
	console.log(hexVal);
	hexVal = "#" + hexVal[0] + hexVal[1] + hexVal[2];
	hexField.value = hexVal;
	hexField.style.color = getHexTextColor([redVal, greenVal, blueVal]);
}

function setFromHex(value) {
	value = value.replace(/\s+/, "");
	if(value[0] == "#")
	{
		value = value.slice(1,value.length);
	}
	if(value.length < 6 || !verifyHEX(value.slice(0,2)) || !verifyHEX(value.slice(2,4)) || !verifyHEX(value.slice(4,6)))
	{
		value = "000000";
	}
	var RGB = [parseInt(value.slice(0,2), 16), parseInt(value.slice(2,4), 16), parseInt(value.slice(4,6), 16)];
	setRed(RGB[0]);
	setGreen(RGB[1]);
	setBlue(RGB[2]);
}

function getHexTextColor(RGBvalue) {
	var whiteContrast = Math.abs(255 - RGBvalue[0]) + Math.abs(255 - RGBvalue[1]) + Math.abs(255 - RGBvalue[2]);
	var RGBTotal = parseInt(RGBvalue[0]) + parseInt(RGBvalue[1]) + parseInt(RGBvalue[2]);
	if(whiteContrast > RGBTotal) {
		return "rgb(255,255,255)";
	}
	return "rgb(0,0,0)";
}

function verifyHEX(value) {
	var val = parseInt(value, 16);
	if(isNaN(val)) {
		return false;
	}
	if(val > 255 || val < 0) {
		return false;
	}
	return true;
}
