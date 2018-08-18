function update_resources() {
	update_ui();
	document.getElementById("turn").innerHTML = turn;
}
function update_ui() {
	update_population();
	update_income();
	update_expenditure();
	update_debt();
	update_surplus();
}
function update_population() {
	document.getElementById("population").innerHTML = human(population());
}
function update_income() {
	document.getElementById("income").innerHTML = human(income());
}
function update_expenditure() {
	document.getElementById("expenditure").innerHTML = human(expenditure());
}
function update_debt() {
	document.getElementById("debt").innerHTML = human(debt());
}
function update_surplus() {
	document.getElementById("surplus").innerHTML = human(surplus());
}

function population() {
	return get_value("Population");
}
function debt() {
	return get_value("Debt");
}
function interest() {
	return get_value("Interest");
}
function income() {
	return get_value("Income");
}
function expenditure() {
	return get_value("Expenditure");
}
function surplus() {
	return income() - expenditure();
}

function create_plot(policy_func) {
	console.log(policy_func)
	var container = document.getElementById('function_plot');
	var items = []
	for (var i = 0; i <= 1; i += 0.1) {
		item = {x: i, y: policy_func(i).f(1)}
		console.log(item)
		items.push(item)
	}
	var dataset = new vis.DataSet(items);
	var options = {
		start: 0,
		end: 1
	};
	var graph2d = new vis.Graph2d(container, dataset, options);
}
