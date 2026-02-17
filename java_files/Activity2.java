import java.util.*;
public class Activity2{
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter User Name: ");
        String name = sc.nextLine();
        System.out.print("Enter OTP: ");
        String otp = sc.nextLine();
        System.out.print("Enter Expiry Time (in minutes): ");
        String expiry = sc.nextLine();
        StringBuilder sms = new StringBuilder();
        sms.append("Hello ").append(name).append(", ");
        sms.append("Your OTP is ").append(otp).append(". ");
        sms.append("It is valid for ").append(expiry).append(" minutes.");
        System.out.println("\nOriginal Message:");
        System.out.println(sms);
        sms.insert(0, "SMS ALERT: ");
        System.out.println("\nAfter Insert:");
        System.out.println(sms);
        int otpStart = sms.indexOf(otp);
        sms.replace(otpStart, otpStart + otp.length(), "****");
        System.out.println("\nAfter Replacing OTP:");
        System.out.println(sms);
        sms.reverse();
        System.out.println("\nAfter Reversing Message:");
        System.out.println(sms);
    }
}
