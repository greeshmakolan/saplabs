import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
public class Activity1 {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a string: ");
        String input = sc.nextLine();

        // Email regex pattern
        String emailRegex = "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b";

        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(input);

        if (matcher.find()) {

            String email = matcher.group();
            System.out.println("Valid Email Found: " + email);

            // Extract username and domain
            String[] parts = email.split("@");
            String username = parts[0];
            String domain = parts[1];

            System.out.println("Username: " + username);
            System.out.println("Domain: " + domain);

        } else {
            System.out.println("No valid email found.");
        }
    }
}
