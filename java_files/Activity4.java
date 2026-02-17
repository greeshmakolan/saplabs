import java.io.*;

public class Activity4 {
    public static void main(String[] args) {

        try (FileReader fr = new FileReader("data.txt");
                BufferedReader br = new BufferedReader(fr)) {

            String line;

            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        }

        catch (FileNotFoundException e) {
            System.out.println("File not found!");
        }

        catch (IOException e) {
            System.out.println("Error reading file!");
        }
    }
}