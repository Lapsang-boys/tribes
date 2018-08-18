function unemployment_policy() {
	;
}

function homelessness_policy() {
	;
}

function health_policy() {
	;
}

function income_policy() {
}

function expenditure_policy() {
	;
}

function treasury_policy() {
	;
}

function debt_policy() {
	;
}

function interest_policy() {
	;
}

function income_tax_policy() {
	var p = population();
	var it = get_value("Income tax");
	var salary = get_value("Salary");
	set_edge_value("Income tax", "Income", it*p*salary);
	// set_edge_value("Income tax", "Salary", -it*p*salary);
}

function sales_tax_policy() {
	var sales = 0.4;
	var p = population();
	var st = get_value("Sales tax");
	var salary = get_value("Salary");
	set_edge_value("Sales tax", "Income", st*(p*salary*sales));
}

function public_healthcare_policy() {
	;
}
