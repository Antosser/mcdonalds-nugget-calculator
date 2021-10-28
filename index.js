var possible = (n, packs) => {
	if (n <= 0)
		return null;
	if (packs.includes(n))
		return [n];
	for (let i = 0; i < packs.length; i++) {
		if (possible(n - packs[i], packs))
			return possible(n - packs[i], packs).concat([packs[i]]);
	}
	return null;
}

let countDecimals = (value) => {
    if (Math.floor(value) !== value)
        return value.toString().split(".")[1].length || 0;
    return 0;
}

let often = (arr, n) => {
	let result = 0;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] == n) 
			result++;
	}
	return result;
}

$("#calculate").click(() => {
	packs = $("#packs").val().split(',');
	for (let i = 0; i < packs.length; i++)
		packs[i] = parseFloat(packs[i]);
	packs.sort((a, b) => a - b);
	packs.reverse();
	let decimals = 0;
	for (let i = 0; i < packs.length; i++) {
		if (countDecimals(packs[i]) > decimals)
			decimals = countDecimals(packs[i]);
	}
	for (let i = 0; i < packs.length; i++) {
		packs[i] *= 10 ** decimals;
	}
	if (!$("#nuggets").val())
		return;
	let set = possible(parseFloat($("#nuggets").val() * 10 ** decimals), packs);

	$("#output").empty();
	if (set) {
		packs.reverse();
		let table = $("<table />");
		for (let i = 0; i < packs.length; i++) {
			tr = $("<tr />").append($("<td />").append(packs[i] / 10 ** decimals));
			tr.append($("<td />").append(often(set, packs[i])));
			table.append(tr);
		}
		$("#output").append(table);
	}
	else {
		$("#output").append($("<div>Not possible</div>").css("margin", "5px").css("color", "red"));
	}
	//$("#output").append($("<div></div>").append("Hello"));
});