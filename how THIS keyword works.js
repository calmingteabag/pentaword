// It was a MESS but I think I got it.
// The big issue is WHO the heck 'this' is refering to. Things are easy when we are using
// functions, but get ugly when objects are involved. It's pretty easy, actually.

// You do remember that, 'this' in isolated functions refers to global object and
// classes are actually functions with methods in Javasript?

// Here's the explanation:
class Hololive {
    constructor(name) {
        // This on CONSTRUCTOR, always refers to the OBJECT.
        this.name
    };

    sing() {
        // 'this' refers to the object Hololive
        console.log(`${this.name} is singing`)
    };

    addToDOMBroken() {
        // 'this' here returns an error saying addToDOMBroken is not a function. 

        // A funny thing that happens in methods is that 'this' loses sight of where it came from. So
        // 'this here doesn't know its origin (if its an object, global, etc) thus returning an error
        document.getElementById("sing").addEventListener("click", function () { this.sing() }, false)
    };

    addToDOMFixed() {
        // When we do this (and modify from this.sing to gura.sing) we are passing a context to this. Even
        // though 'this' doesn't appear on code, its implicit and refering to the new gura object.
        // And classes are functions right? 
        let gura = new Hololive()
        document.getElementById("sing").addEventListener("click", function () { gura.sing() }, false)
    };

    addtoDOMArrow() {
        // Now it's IMPORTANT!

        // Arrow functions doesn't have its own this, it 'gets' its 'this' from parent context, which in this
        // case is our class. 

        // Why it works? Aren't classes = functions? So in this case 'this' is refering to a class but for JS, 
        // a class is actually a function. And isolated functions's 'this' refers to global. That's why it works.
        document.getElementById("sing").addEventListener("click", () => { this.sing() }, false)
    };


    // Function that executes the 'add' function on load
    execOnPageLoad() {
        document.addEventListener("DOMContentLoaded", { working_function_here!!},false)
    };
};