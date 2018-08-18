register_module("Sweden", init);

function init() {
	set_population(1e7);
	set_income(8e11);
	set_expenditure(7.9e11);

	set_value("Debt", 0);
	set_value("Income tax", 0.3);
	set_value("Sales tax", 0.25);
	set_value("Unemployment", 0.05);
	set_value("Salary", 2e4);
	update_ui();

	function linear(pos) {return function(val) {return pos*val}; }
	function clamp(pos, low, high) {
		return function(val) {
			if (pos < low) {
				return val * low;
			}
			return val * high;
		};
	}

	luxary_tax_policy = {
		"name": "Luxary tax",
		"desc": "Luxary products such as sports cars and yachts are faced with an additional sales tax.",
		"func": function(pos) {
			var impl = {
				name: "",
				desc: "",
			}
			if (pos < 0.1) {
				impl.name = "Panama paradise"
				impl.desc ="Companies across the world come to our country for its hospitality ;)"
				impl.f = clamp(pos, 0, 0.1)
			} else if (pos >= 0.1 && pos < 0.3) {
				impl.name = "Tree huggers"
				impl.desc = "We tax on ivory and endangered species"
				impl.f = clamp(pos, 0.1, 0.3)
			} else if (pos >= 0.3) {
				impl.name = "Robin Hood"
				impl.desc = "We tax on everything not explicitly needed for survival. Heavily."
				impl.f = clamp(pos, 0.3, 1.0)
			}
			return impl;
		}
	}

	property_tax_policy = {
		"name": "Property tax",
		"desc": "Generic desc",
		"func": function(pos) {
			var impl = {
				name: "",
				desc: "",
				f: linear(pos),
			}
			return impl;
		}
	}

	register_policy("Luxary tax", luxary_tax_policy)
	register_policy("Property tax", property_tax_policy)
	// register_policy("Airline tax", )

	create_plot(luxary_tax_policy.func)
}
