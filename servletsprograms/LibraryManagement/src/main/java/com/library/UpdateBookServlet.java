package com.library;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
@WebServlet("/UpdateBookServlet")
public class UpdateBookServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
            throws IOException {

        int id = Integer.parseInt(request.getParameter("id"));
        double price = Double.parseDouble(request.getParameter("price"));

        try {
            Connection con = DBConnection.getConnection();

            PreparedStatement ps =
                    con.prepareStatement(
                        "UPDATE books SET price=? WHERE id=?");

            ps.setDouble(1, price);
            ps.setInt(2, id);

            int rows = ps.executeUpdate();

            PrintWriter out = response.getWriter();

            if (rows > 0)
                out.println("Book Updated Successfully!");
            else
                out.println("Book Not Found!");

            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
