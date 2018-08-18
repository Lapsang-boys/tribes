function greeter(person) {
    return "Hello, " + person;
}
var user = "Jane User";
document.getElementById("greeting").innerHTML = greeter(user);
