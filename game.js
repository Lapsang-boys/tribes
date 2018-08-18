var NEGATIVE_COLOR = "#ff0000";
var POSITIVE_COLOR = "#00ff00";

var turn = 0;
var power = 10;

function human(v) {
	if (v == undefined) {
		return "";
	}
	var s = Math.sign(v) == -1 ? "-" : "";
	if (Math.abs(v) > 1e9) {
		s += v/1e9 + " Bil."
	} else if (Math.abs(v) > 1e6) {
		s += v/1e6 + " Mil."
	}
	return s;
}

function next_turn() {
	turn++;
	power += 10;
	document.getElementById("turn").innerHTML = turn;
	update_resources();
	update_policies();
	color();
}

var modules = [];
function register_module(module_name, fn) {
	modules.push(fn);
}

function init_game() {
	modules.map(function(load_mod){ load_mod() });
	next_turn()
}

function color() {
	edges.get({
		filter: function (item) {
			return item.value < 0;
		}
	}).forEach(function(item) {
		edges.update({
			id: item.id,
			color: {color: NEGATIVE_COLOR}
		})
	});

	edges.get({
		filter: function (item) {
			return item.value > 0;
		}
	}).forEach(function(item) {
		edges.update({
			id: item.id,
			color: {color: POSITIVE_COLOR}
		})
	});
}

// create an array with nodes
var nodes = new vis.DataSet([
	{id: 1, title: 'Population'},
	{id: 2, title: 'Income'},
	{id: 3, title: 'Expenditure'},
	{id: 4, title: 'Income tax'},
	{id: 5, title: 'Sales tax'},
	{id: 6, title: 'Salary'},
	{id: 7, title: 'Unemployment'},
	{id: 8, title: 'Debt'}
	]);

nodes.forEach(function(node){
	nodes.update({
		id: node.id,
		label: node.title,
	});
});

// create an array with edges
var edges = new vis.DataSet([
	{from: "Income tax", to: "Income", func: "income_tax_policy"},
	{from: "Sales tax", to:  "Income", func: "sales_tax_policy"},
	{from: "Income tax", to: "Salary"}
	]);
edges.forEach(function(edge) {
	var from_id = get_node(edge.from).id
	var to_id = get_node(edge.to).id
	edges.update({
		id: edge.id,
		from: from_id,
		to: to_id,
	})
})

edges.forEach(function(edge){
	edges.update({
		id: edge.id,
		label: human(edge.value),
		value: 0.0,
	});
});

// create a network
var container = document.getElementById('mynetwork');

// provide the data in the vis format
var data = {
	nodes: nodes,
	edges: edges
};
var options = {
	autoResize: true,
	width: "100%",
	height: "100%",
	nodes: {
		borderWidth: 4,
		shape: "circle",
	},
	edges: {
		arrowStrikethrough: false,
		arrows: {
			to: {enabled: true, scaleFactor: 1, type: "arrow"},
		},
		scaling:{
			min: 1,
			max: 5,
		},
	},
};

// subscribe to any change in the DataSet
edges.on('*', function (event, properties, senderId) {
	if (event != "update") {
		return;
	}
	for (var i = 0; i < properties.data.length; i++) {
		var data = properties.data[i]
		var old = properties.oldData[i]
		if (data.value == undefined) {
			continue
		}
		if (data.value < 0 && old.value >= 0) {
			edges.update({
				id: data.id,
				to: old.from,
				from: old.to,
				color: { color: NEGATIVE_COLOR },
			})
		} else if (data.value >= 0 && old.value < 0) {
			edges.update({
				id: data.id,
				to: old.from,
				from: old.to,
				color: { color: POSITIVE_COLOR },
			})
		}
		edges.update({
			id: data.id,
			label: human(data.value),
		});

	}
});

// initialize your network!
var network = new vis.Network(container, data, options);

function update_policies() {
	edges.forEach(function (edge) {
		var func_name = edge.func;
		try {
			var fn = string_func(func_name);
		} catch (e) {
			console.log(e);
			return;
		}
		fn();
	})
	edges.forEach(function (edge) {
		var node = nodes.get(edge.to);
		nodes.update({
			id: edge.to,
			value: node.value + edge.value,
		})
	})
}

function string_func(func_name) {
	var fn = window[func_name];
	if (typeof fn !== "function") {
		throw "error: "+func_name+" is not a function";
	}
	return fn;
}

var policies = {}

function available_policies() {
	return policies
}

function register_policy(name, policy) {
	policies[name] = policy;
}

function remove_policy(name) {
	delete policy[name];
}
