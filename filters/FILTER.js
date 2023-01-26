stylingID = document.createElement('style');
stylingID.id = 'OtherEyesFilter_56a9dc';
document.body.appendChild(stylingID);

filterID = document.createElement('div');
filterID.id = 'OtherEyesFilter_4de6af';
filterID.setAttribute(
	'style',
	'height: 0; padding: 0; margin: 0; line-height: 0;'
);
document.body.appendChild(filterID);

chrome.storage.sync.get(['OE_used_matrix_8b0f'], function (result) {
	const { matrix, neon } = result.OE_used_matrix_8b0f;
	console.log(matrix);
	chrome.storage.sync.get(['OE_intensity_63ed8'], function (result) {
		filterID.innerHTML = `<svg id="colorblind-filters" style="display: none"><defs><filter id="OE_Filter_9f5ec"><feColorMatrix type="matrix" values="${matrixToString(
			neon
				? matrixIntensityNeon(result.OE_intensity_63ed8)
				: matrixIntensity(matrix, result.OE_intensity_63ed8)
		)}" in="SourceGraphic"/></filter></defs></svg>`;
	});
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
	for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
		if (key === 'OE_used_matrix_8b0f') {
			const { matrix, neon } = newValue;
			console.log(matrix);
			chrome.storage.sync.get(['OE_intensity_63ed8'], function (result) {
				filterID.innerHTML = `<svg id="colorblind-filters" style="display: none"><defs><filter id="OE_Filter_9f5ec"><feColorMatrix type="matrix" values="${matrixToString(
					neon
						? matrixIntensityNeon(result.OE_intensity_63ed8)
						: matrixIntensity(matrix, result.OE_intensity_63ed8)
				)}" in="SourceGraphic"/></filter></defs></svg>`;
			});
		}
		if (key === 'OE_intensity_63ed8') {
			chrome.storage.sync.get(['OE_used_matrix_8b0f'], function (result) {
				const { matrix, neon } = result.OE_used_matrix_8b0f;
				filterID.innerHTML = `<svg id="colorblind-filters" style="display: none"><defs><filter id="OE_Filter_9f5ec"><feColorMatrix type="matrix" values="${matrixToString(
					neon
						? matrixIntensityNeon(newValue)
						: matrixIntensity(matrix, newValue)
				)}" in="SourceGraphic"/></filter></defs></svg>`;
			});
		}
	}
});

stylingID.innerHTML = `html{-webkit-filter:url(#OE_Filter_9f5ec);-moz-filter:(#OE_Filter_9f5ec);-ms-filter:(#OE_Filter_9f5ec);-o-filter:(#OE_Filter_9f5ec);filter:(#OE_Filter_9f5ec);}`;

setTimeout(function () {
	window.scrollBy(1, 1);
	window.scrollBy(-1, -1);
}, 1);

function matrixIntensity(matrix, intensity) {
	newmat = [];
	for (let i = 0; i < matrix.length; i++) {
		newmat.push([]);
		const element = matrix[i];
		for (let j = 0; j < element.length; j++) {
			var element2 = element[j];
			if (i === j) {
				let mult = (1 - element2) / 100;
				element2 = 1 - intensity * mult;
			} else {
				if (intensity === 0) element2 = 0;
				else {
					if (intensity === 100) element2 = element2;
					else {
						element2 = element2 * (intensity / 100);
					}
				}
			}
			newmat[i].push(element2);
		}
	}
	return newmat;
}
/*ALTERNATIVE (mostly) AI WRITTEN (works for neon):
function matrixIntensity(matrix, intensity) {
  // Check that matrix is a valid array of arrays of numbers
  if (!Array.isArray(matrix) || matrix.length === 0 || !matrix.every(row => Array.isArray(row) && row.length > 0 && row.every(cell => typeof cell === 'number'))) {
    throw new Error('matrix must be a non-empty array of arrays of numbers');
  }

  // Check that intensity is a valid integer in the range 0-100
  if (!Number.isInteger(intensity) || intensity < 0 || intensity > 100) {
    throw new Error('intensity must be an integer in the range 0-100');
  }

  // Transform the values in the matrix
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (i === j) {
        // For the diagonal elements, transform x to 1
        matrix[i][j] = 1-((1 - matrix[i][j]) * intensity / 100);
      } else {
        // For all other elements, transform x to 0
        matrix[i][j] = matrix[i][j] * intensity / 100;
      }
    }
  }

  // Return the transformed matrix
  return matrix;
} */

function matrixToString(matrix) {
	str = '';
	for (const col of matrix) {
		for (const val of col) {
			str += `${val},`;
		}
		str += ' ';
	}
	return str;
}
function matrixIntensityNeon(intensity) {
	newmat = [
		[1 + 0.3 * (intensity / 100), 0.0, 0.0, 0, 0],
		[0.0, 1 + 0.3 * (intensity / 100), 0.0, 0, 0],
		[0.0, 0.0, 1 + 0.3 * (intensity / 100), 0, 0],
		[0, 0, 0, 1, 0],
	];
	return newmat;
}