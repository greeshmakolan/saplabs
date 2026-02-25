package com.library;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
@WebServlet("/SearchBookServlet")
public class SearchBookServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws IOException {

        String title = request.getParameter("title");

        try {
            Connection con = DBConnection.getConnection();

            PreparedStatement ps =
                    con.prepareStatement(
                        "SELECT * FROM books WHERE title LIKE ?");

            ps.setString(1, "%" + title + "%");

            ResultSet rs = ps.executeQuery();

            PrintWriter out = response.getWriter();

            while (rs.next()) {
                out.println("ID: " + rs.getInt("id"));
                out.println(" Title: " + rs.getString("title"));
                out.println(" Author: " + rs.getString("author"));
                out.println("<br><br>");
            }

            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
