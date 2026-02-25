package com.library;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

@WebServlet("/AddBookServlet")
public class AddBookServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
            throws ServletException, IOException {

        String title = request.getParameter("title");
        String author = request.getParameter("author");
        double price = Double.parseDouble(request.getParameter("price"));

        try {
            Connection con = DBConnection.getConnection();

            PreparedStatement ps = con.prepareStatement(
                    "INSERT INTO books(title,author,price) VALUES(?,?,?)");

            ps.setString(1, title);
            ps.setString(2, author);
            ps.setDouble(3, price);

            ps.executeUpdate();

            PrintWriter out = response.getWriter();
            out.println("Book Added Successfully!<br>");
            out.println("<a href='addBook.html'>Add Another Book</a>");

            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
