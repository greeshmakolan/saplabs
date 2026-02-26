package com.ems.employee_management.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ems.employee_management.model.Employee;
import com.ems.employee_management.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    // Add Employee
    public Employee saveEmployee(Employee employee) {
        return repository.save(employee);
    }

    // Get All Employees
    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    // Get Employee By ID
    public Employee getEmployeeById(Long id) {
        return repository.findById(id).orElse(null);
    }

    // Update Employee
    public Employee updateEmployee(Long id, Employee employee) {
        Employee existingEmployee = repository.findById(id).orElse(null);

        if (existingEmployee != null) {
            existingEmployee.setName(employee.getName());
            existingEmployee.setEmail(employee.getEmail());
            existingEmployee.setPhone(employee.getPhone());
            existingEmployee.setDepartment(employee.getDepartment());
            existingEmployee.setSalary(employee.getSalary());
            return repository.save(existingEmployee);
        }
        return null;
    }

    // Delete Employee
    public void deleteEmployee(Long id) {
        repository.deleteById(id);
    }
}