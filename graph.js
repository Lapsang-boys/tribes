function set_population(population) {
	set_value("Population", population);
}
function set_income(income) {
	set_value("Income", income);
}
function set_expenditure(expenditure) {
	set_value("Expenditure", expenditure);
}

function get_node(name) {
	var ns = nodes.get({
		filter: function (item) {
			return item.title.toLowerCase() === name.toLowerCase();
		}
	});
	if (ns.length < 1) {
		throw "no nodes with name: " + name;
	}
	return ns[0];
}
function get_edge(from_name, to_name) {
	var from = get_node(from_name);
	var to = get_node(to_name);
	var es = edges.get({
		filter: function (edge) {
			return edge.to === to.id && edge.from == from.id
		}
	})
	if (es.length < 1) {
		throw "no edge between: "+from_name+ " -- " + to_name;
	}
	return es[0];
}
function set_edge_value(from_name, to_name, value) {
	var edge = get_edge(from_name, to_name)
	edges.update({
		id: edge.id,
		value: value,
	});
}

function get_value(name) {
	return get_node(name).value;
}
function set_value(name, value) {
	var node = get_node(name);
	nodes.update({
		id: node.id,
		value: value,
	});
}
