import java.util.Scanner;

public class Seq {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String str = "Hello World";
        if (str.contains("He")) {
            System.out.println("'" + "He" + "' is present in the string.");
        } else {
            System.out.println("'" + "He" + "' is NOT present in the string.");
        }
        sc.close();
    }
}
