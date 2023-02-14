const $ = (param) => document.querySelector(param);
const $a = (param) => document.querySelectorAll(param);

const headerColors = {
	normal: [
		'yellow',
		'orange',
		'red',
		'violet',
		'indigo',
		'blue',
		'green',
		'yellow',
		'orange',
		'red',
	],
	grayscale: [
		'#4b4b4b',
		'#e2e2e2',
		'#adadad',
		'#4c4c4c',
		'#afafaf',
		'#252525',
		'#1d1d1d',
		'#4b4b4b',
		'#e2e2e2',
		'#adadad',
	],
	deuteranopia: [
		'#ffff00',
		'#bfbf00',
		'#4a4a00',
		'#a1a1ec',
		'#161680',
		'#0000ff',
		'#5b5b03',
		'#ffff00',
		'#bfbf00',
		'#4a4a00',
	],
	protanopia: [
		'#ffff00',
		'#b2b20d',
		'#5d5d0d',
		'#9393ee',
		'#161682',
		'#0000ff',
		'#797900',
		'#ffff00',
		'#b2b20d',
		'#5d5d0d',
	],
	tritanopia: [
		'#ffdddd',
		'#ff8f8f',
		'#ff0000',
		'#d39090',
		'#371111',
		'#002222',
		'#146f6f',
		'#ffdddd',
		'#ff8f8f',
		'#ff0000',
	],
	neon: [
		'#ffff00',
		'#ffd600',
		'#ff0000',
		'#ffa9ff',
		'#6200a9',
		'#0000ff',
		'#00a600',
		'#ffff00',
		'#ffd600',
		'#ff0000',
	],
	inverse: [
		'#0000ff',
		'#005aff',
		'#00ffff',
		'#117d11',
		'#b4ff7d',
		'#ffff00',
		'#ff7fff',
		'#0000ff',
		'#005aff',
		'#00ffff',
	],
	'deuteranopia-help': [
		'#ff8000',
		'#ff8000',
		'#ff8000',
		'#eeeeee',
		'#4b6682',
		'#0080ff',
		'#000000',
		'#ff8000',
		'#ff8000',
		'#ff8000',
	],
	'protanopia-help': [
		'#ff9900',
		'#ff9000',
		'#ff8000',
		'#eefbee',
		'#4b6682',
		'#0080ff',
		'#000d00',
		'#ff9900',
		'#ff9000',
		'#ff8000',
	],
	'tritanopia-help': [
		'#ffffff',
		'#ffffd2',
		'#ff0080',
		'#ee41b8',
		'#4b0026',
		'#000000',
		'#00cd40',
		'#ffffff',
		'#ffffd2',
		'#ff0080',
	],
};

$('#ghLINK').addEventListener('click', () => {
	chrome.tabs.create({ url: 'https://github.com/OtherEyesAddon/ChromeAddon/' });
});

//Bubble effect of slider
const allRanges = document.querySelectorAll('.range-wrap');

allRanges.forEach((wrap) => {
	const range = wrap.querySelector('.range');
	const bubble = wrap.querySelector('.bubble');

	range.addEventListener('input', () => {
		setBubble(range, bubble);
	});
	setBubble(range, bubble);
});

$('#popupContainer').addEventListener('click', () => {
	document.querySelector('#myPopup').classList.toggle('show');
	document.querySelector('#myPopup2').classList.remove('show');
});
$('#popupContainer2').addEventListener('click', () => {
	document.querySelector('#myPopup2').classList.toggle('show');
	document.querySelector('#myPopup').classList.remove('show');
});

//Actual code

//If there is one used, set it checked, otherwise set "normal" checked
chrome.storage.sync.get(['OE_checked_7ae09'], function (result) {
	if (!result.OE_checked_7ae09) {
		$('#normal').checked = true;
		return;
	}
	$(`#${result.OE_checked_7ae09}`).checked = true;
});

//If there is intensity used, set slider to said intensity, otherwise set intensity to 100%
chrome.storage.sync.get(['OE_intensity_63ed8'], function (result) {
	if (!result.OE_intensity_63ed8)
		chrome.storage.sync.set({ OE_intensity_63ed8: 100 });
	$('#intensity').value = result.OE_intensity_63ed8;
	setBubble($('#intensity'), $('.bubble'));
});

//when intensity slider is changed, use set intensity
$('#intensity').addEventListener('change', function () {
	chrome.storage.sync.set({ OE_intensity_63ed8: $('#intensity').value });
});

//when switch is checked set it as used, when is unchecked, check "normal" and set it aS used
$a('.switchCheck').forEach((element) =>
	element.addEventListener('change', function (e) {
		switches = $a('.switchCheck');
		switches = Array.from(switches);
		swc = switches.splice(switches.indexOf(e.target), 1);
		if (!swc[0].checked) {
			$('#normal').checked = true;
			chrome.storage.sync.set({ OE_checked_7ae09: 'normal' }, function () {});
			changeHeaderCol('normal');
		} else {
			changeHeaderCol(swc[0].id);
			chrome.storage.sync.set({ OE_checked_7ae09: swc[0].id }, function () {});
			for (const sw of switches) {
				sw.checked = false;
			}
		}
	})
);

//for bubble effect of slider
function setBubble(range, bubble) {
	const val = range.value;
	const min = range.min ? range.min : 0;
	const max = range.max ? range.max : 100;
	const newVal = Number(((val - min) * 100) / (max - min));
	bubble.innerHTML = `${val}<br>%`;
	bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}

//change header colors depending on used filter
function changeHeaderCol(buttonId) {
	let css;
	css =
		'height: 75px;padding-top: 3.5%;background: linear-gradient(-45deg,' +
		headerColors[buttonId].join(',') +
		');background-size: 800% 400%;animation: gradient 4s ease infinite;animation-timing-function: linear;';
	$('#Header').style = css;
}
