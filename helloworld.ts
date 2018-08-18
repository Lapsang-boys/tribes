function greeter(person: string) {
    return "Hello, " + person;
}

let user = "Jane User";

document.getElementById("greeting").innerHTML = greeter(user);
