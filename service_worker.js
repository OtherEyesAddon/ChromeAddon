chrome.storage.onChanged.addListener(function (changes, namespace) {
	for (let [key, { newValue }] of Object.entries(changes)) {
		console.log(`${newValue} in ${key}`);
		if (key === 'OE_checked_7ae09') {
			neon = newValue === 'neon';
			chrome.storage.sync.set(
				{ OE_used_matrix_8b0f: { matrix: filters[newValue], neon } },
				() => {}
			);
		}
	}
});

const OE_matrix_7234f = [
	//     R  G  B  A  +
	/*R*/ [1, 0, 0, 0, 0],
	/*G*/ [0, 1, 0, 0, 0],
	/*B*/ [0, 0, 1, 0, 0],
	/*A*/ [0, 0, 0, 1, 0],
];
const OE_matrix_deuteranopia_61cd0 = [
	[0.29031, 0.70969, -0.0, 0, 0],
	[0.29031, 0.70969, -0.0, 0, 0],
	[-0.02197, 0.02197, 1.0, 0, 0],
	[0, 0, 0, 1, 0],
];
const OE_matrix_protanopia_93e0a = [
	[0.10889, 0.89111, -0.0, 0, 0],
	[0.10889, 0.89111, 0.0, 0, 0],
	[0.00447, -0.00447, 1.0, 0, 0],
	[0, 0, 0, 1, 0],
];
const OE_matrix_tritanopia_32059 = [
	[1, 0.15236, -0.15236, 0, 0],
	[0, 0.86717, 0.13283, 0, 0],
	[-0, 0.86717, 0.13283, 0, 0],
	[0, 0, 0, 1, 0],
];
const OE_matrix_deuteranopia_help_67ae0 = [
	[1, 0, 0, 0, 0],
	[0.5, 0, 0.5, 0, 0],
	[0, 0, 1, 0, 0],
	[0, 0, 0, 1, 0],
];
const OE_matrix_protanopia_help_df18c = [
	[1, 0, 0, 0, 0],
	[0.5, 0.1, 0.5, 0, 0],
	[0, 0, 1, 0, 0],
	[0, 0, 0, 1, 0],
];
const OE_matrix_tritanopia_help_6ac28 = [
	[1, 0, 0, 0, 0],
	[0, 1.6, -0.6, 0, 0],
	[0.5, 0.5, 0, 0, 0],
	[0, 0, 0, 1, 0],
];
const OE_matrix_grayscale_93bdc = [
	[0.299, 0.587, 0.114, 0, 0],
	[0.299, 0.587, 0.114, 0, 0],
	[0.299, 0.587, 0.114, 0, 0],
	[0, 0, 0, 1, 0],
];
const OE_matrix_neon_74fa9 = [
	[1.3, 0.0, 0.0, 0, 0],
	[0.0, 1.3, 0.0, 0, 0],
	[0.0, 0.0, 1.3, 0, 0],
	[0, 0, 0, 1, 0],
];
const OE_matrix_inverse_8ef36 = [
	[-1, 0, 0, 0, 1],
	[0, -1, 0, 0, 1],
	[0, 0, -1, 0, 1],
	[0, 0, 0, 1, 0],
];
const filters = {
	normal: OE_matrix_7234f,
	deuteranopia: OE_matrix_deuteranopia_61cd0,
	protanopia: OE_matrix_protanopia_93e0a,
	tritanopia: OE_matrix_tritanopia_32059,
	'deuteranopia-help': OE_matrix_deuteranopia_help_67ae0,
	'protanopia-help': OE_matrix_protanopia_help_df18c,
	'tritanopia-help': OE_matrix_tritanopia_help_6ac28,
	grayscale: OE_matrix_grayscale_93bdc,
	neon: OE_matrix_neon_74fa9,
	inverse: OE_matrix_inverse_8ef36,
};
