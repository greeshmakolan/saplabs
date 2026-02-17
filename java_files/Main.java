// Superclass
class Dog {
    void sound() {
        System.out.println("woof");
    }
}

// Subclass
class Beagle extends Dog {
    void bark() {
        System.out.println("arf arf");
    }
}

// Main class to run the program
public class Main {
    public static void main(String[] args) {
        Beagle b = new Beagle();

        b.sound();  // Inherited from Dog
        b.bark();   // Method of Beagle
    }
}