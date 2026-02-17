import java.util.*;
class InvalidAgeException extends Exception {
    InvalidAgeException(String message) {
        super(message);
    }
}
public class Activity3 {
    static void checkAge(int age) throws InvalidAgeException {
        if (age < 18) {
            throw new InvalidAgeException("Age must be 18 or above!");
        } else {
            System.out.println("Eligible");
        }
    }
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        try {
            System.out.println("Enter age:");
            int age = sc.nextInt();

            checkAge(age);
        }
        catch (InputMismatchException e) {
            System.out.println("Invalid input! Please enter numbers only.");
        }
        catch (InvalidAgeException e) {
            System.out.println("Custom Exception: " + e.getMessage());
        }
        finally {
            System.out.println("Program Ended");
        }
    }
}