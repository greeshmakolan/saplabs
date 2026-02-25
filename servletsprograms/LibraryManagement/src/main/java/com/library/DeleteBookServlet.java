package com.library;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
@WebServlet("/DeleteBookServlet")
public class DeleteBookServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
            throws IOException {

        int id = Integer.parseInt(request.getParameter("id"));

        try {
            Connection con = DBConnection.getConnection();
            PreparedStatement ps =
                    con.prepareStatement("DELETE FROM books WHERE id=?");

            ps.setInt(1, id);
            int rows = ps.executeUpdate();

            PrintWriter out = response.getWriter();

            if (rows > 0)
                out.println("Book Deleted Successfully!");
            else
                out.println("Book Not Found!");

            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
