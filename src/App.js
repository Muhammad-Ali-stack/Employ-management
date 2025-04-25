import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import swal from 'sweetalert';
import { FaUserPlus, FaSignOutAlt, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

class App extends Component {
  constructor() {
    super();
    this.state = {
      employeeList: [
        {
          firstName: "Jannat ",
          lastName: "Faisal",
          email: "faisal@gmail.com",
          salary: "50,000",
          joinDate: "30/8/2018"
        },
        {
          firstName: "Ahmed",
          lastName: "Faisal",
          email: "Ahmed@gmail.com",
          salary: "70,000",
          joinDate: "30/8/2017"
        },
        {
          firstName: "Ahad",
          lastName: "Faisal",
          email: "Ahad0@gmail.com",
          salary: "90,000",
          joinDate: '30/8/2015'
        }
      ],
      addEmployee: false,
      editIndex: null,
      user: null
    }
    this.updateFirstName = this.updateFirstName.bind(this)
    this.updateLastName = this.updateLastName.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.updateSalary = this.updateSalary.bind(this)
  }

  // Event Functions
  login() {
    const email = document.getElementById(`email`).value;
    const password = document.getElementById('password').value;
    if (email === "admin@domain.com" && password === "admin") {
      this.setState({
        user: {
          email: email,
          password: password
        }
      });
      swal("Login Successful", "Welcome to Employee Management System", "success");
    } else {
      swal("Access Denied", "Please enter correct email and password", "error");
    }
  }

  addEmployee() {
    this.setState({
      addEmployee: true,
    })
  }

  cancelAddEmployee() {
    this.setState({
      addEmployee: false,
    })
  }

  addEmployeeData() {
    const firstName = document.getElementById(`firstName`).value;
    const lastName = document.getElementById(`lastName`).value;
    const email2 = document.getElementById(`email2`).value;
    const salary = document.getElementById(`salary`).value;
    
    if (!firstName || !lastName || !email2 || !salary) {
      swal("Error", "Please fill all fields", "error");
      return;
    }
    
    const date = new Date();
    const joinDate = date.getDate() + "/" + (+date.getMonth() + 1) + "/" + date.getFullYear();
    
    this.setState(prevState => ({
      employeeList: [
        ...prevState.employeeList,
        {
          firstName,
          lastName,
          email: email2,
          salary,
          joinDate
        }
      ],
      addEmployee: false,
    }), () => {
      swal("Success", "Employee added successfully", "success");
    });
  }

  logOut() {
    this.setState({
      user: null
    });
    swal("Logged Out", "You have been successfully logged out", "info");
  }

  deleteEmployee(index) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this employee data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.setState(prevState => ({
          employeeList: prevState.employeeList.filter((emp, i) => i !== index)
        }), () => {
          swal("Deleted!", "Employee data has been deleted.", "success");
        });
      }
    });
  }

  editEmployee(index) {
    const employee = this.state.employeeList[index];
    this.setState({
      editIndex: index,
      editedFirstName: employee.firstName,
      editedLastName: employee.lastName,
      editedEmail: employee.email,
      editedSalary: employee.salary
    })
  }

  canceleditEmployee() {
    this.setState({
      editIndex: null
    })
  }

  updateEmployee() {
    const { editIndex, editedFirstName, editedLastName, editedEmail, editedSalary } = this.state;
    
    if (!editedFirstName || !editedLastName || !editedEmail || !editedSalary) {
      swal("Error", "Please fill all fields", "error");
      return;
    }
    
    this.setState(prevState => ({
      employeeList: prevState.employeeList.map((emp, index) => 
        index === editIndex ? {
          ...emp,
          firstName: editedFirstName,
          lastName: editedLastName,
          email: editedEmail,
          salary: editedSalary
        } : emp
      ),
      editIndex: null
    }), () => {
      swal("Updated!", "Employee data has been updated.", "success");
    });
  }

  updateFirstName(e) {
    this.setState({
      editedFirstName: e.target.value
    })
  }

  updateLastName(e) {
    this.setState({
      editedLastName: e.target.value
    })
  }

  updateEmail(e) {
    this.setState({
      editedEmail: e.target.value
    })
  }
    
  updateSalary(e) {
    this.setState({
      editedSalary: e.target.value
    })
  }

  // JSX Rendering Functions
  renderHeader() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Employee Management System</h1>
        {this.state.user && (
          <div className="user-info">
            <span>Logged in as: {this.state.user.email}</span>
          </div>
        )}
      </header>
    )
  }

  renderLogin() {
    return (
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title"><b>Login</b></h1>
          <form className="login-form">
            <div className="form-group">
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                placeholder="Email address"
                required
              />
            </div>
            <div className="form-group">
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                placeholder="Password"
                required
              />
            </div>
            <button 
              type="button" 
              className="btn btn-primary login-btn" 
              onClick={() => { this.login() }}
            >
              Login
            </button>
          </form>
        </div>
      </div>  
    )
  }

  rendertoDoList() {
    return (
      <div className="container main-content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="page-title">Employee List</h1>
          <button 
            className="btn btn-success add-employee-btn"
            onClick={() => { this.addEmployee() }}
          >
            <FaUserPlus className="mr-2" /> Add Employee
          </button>
        </div>
        
        <div className="table-responsive">
          <table className="table table-hover employee-table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Salary</th>
                <th scope="col">Join Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employeeList.map((value, index) => (
                this.state.editIndex !== index ? 
                <tr key={index} className="employee-row">
                  <th scope="row">{index + 1}</th>
                  <td>{value.firstName}</td>
                  <td>{value.lastName}</td>
                  <td>{value.email}</td>
                  <td>Rs. {value.salary}/=</td>
                  <td>{value.joinDate}</td>
                  <td className="actions">
                    <button 
                      onClick={() => this.editEmployee(index)} 
                      className="btn btn-sm btn-primary mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => this.deleteEmployee(index)} 
                      className="btn btn-sm btn-danger"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
                : 
                <tr key={index} className="edit-row">
                  <th scope="row">{index + 1}</th>
                  <td>
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      value={this.state.editedFirstName} 
                      onChange={this.updateFirstName}
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      value={this.state.editedLastName} 
                      onChange={this.updateLastName}
                    />
                  </td>
                  <td>
                    <input 
                      type="email" 
                      className="form-control form-control-sm" 
                      value={this.state.editedEmail} 
                      onChange={this.updateEmail}
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      value={this.state.editedSalary} 
                      onChange={this.updateSalary}
                    />
                  </td>
                  <td>{value.joinDate}</td>
                  <td className="actions">
                    <button 
                      onClick={() => this.updateEmployee(index)} 
                      className="btn btn-sm btn-success mr-2"
                    >
                      <FaCheck />
                    </button>
                    <button 
                      onClick={() => this.canceleditEmployee()} 
                      className="btn btn-sm btn-secondary"
                    >
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  renderAddEmployee() {
    return (
      <div className="container add-employee-container">
        <div className="add-employee-card">
          <h1 className="page-title">Add New Employee</h1>
          <form className="add-employee-form">
            <div className="form-group">
              <label>First Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="firstName" 
                placeholder="Enter First Name"
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="lastName" 
                placeholder="Enter Last Name"
                required
              />
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input 
                type="email" 
                className="form-control" 
                id="email2" 
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group">
              <label>Salary</label>
              <input 
                type="text" 
                className="form-control" 
                id="salary" 
                placeholder="Enter Salary"
                required
              />
            </div>
            <div className="form-actions">
              <button 
                type="button" 
                className="btn btn-primary mr-3" 
                onClick={() => { this.addEmployeeData() }}
              >
                Add Employee
              </button>
              <button 
                type="button" 
                className="btn btn-outline-secondary" 
                onClick={() => { this.cancelAddEmployee() }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  renderLogOut() {
    return (
      <div className="logout-container">
        <button 
          className="btn btn-warning logout-btn" 
          onClick={() => { this.logOut(); }}
        >
          <FaSignOutAlt className="mr-2" /> Log Out
        </button>
        <div className="footer">
        <p className="credits">
  <a 
    href="https://www.linkedin.com/in/jannatfaisal786?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    Made by Jannat Faisal
  </a>
</p>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        {this.renderHeader()}
        {!this.state.user && this.renderLogin()}
        {this.state.user && !this.state.addEmployee && this.rendertoDoList()}
        {this.state.addEmployee && this.renderAddEmployee()}
        {this.state.user && !this.state.addEmployee && this.renderLogOut()}
      </div>
    );
  }
}

export default App;