import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LandingPage: React.FC = () => {
  // State for card scan status
  const [isCardAccepted, setIsCardAccepted] = useState<boolean>(false);

  // State for current time
  const [currentTime, setCurrentTime] = useState<string>("");

  // State for today's date
  const [currentDate, setCurrentDate] = useState<string>("");

  // Update current time and date every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      setCurrentDate(now.toLocaleDateString());
    }, 1000);
    return () => clearInterval(timer); // Cleanup the interval on unmount
  }, []);

  // Handle card scan logic
  const handleCardScan = (): void => {
    setIsCardAccepted(true); // Show "Thank You" message
    setTimeout(() => {
      setIsCardAccepted(false); // Reset for next student
    }, 3000); // Reset after 3 seconds
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Student Portal
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Student
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Admin
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content Section */}
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
        {!isCardAccepted ? (
          <div className="text-center">
            <h2 className="display-4 text-primary mb-4">Welcome to Student Portal</h2>
            <div className="text-center">
              <div className="row justify-content-center mb-4">
                <div className="col-md-4 mb-3">
                  <div className="card shadow">
                    <div className="card-body text-center">
                      <h3 className="text-dark">{currentTime}</h3>
                      <h3 className="text-dark">{currentDate}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h4 className="text-muted mb-3">Please scan your card to proceed</h4>
            <p className="lead text-secondary mb-4">
              This portal helps students verify their identity for entering specific classes.
            </p>
            {/* Student and Admin Sections */}
            <div className="row justify-content-center mb-4">
              <div className="col-md-4 mb-3">
                <div className="card shadow">
                  <div className="card-body text-center">
                    <h5 className="card-title text-secondary">Student</h5>
                    <p className="card-text">
                      Access your schedule and classroom information here.
                    </p>
                    <button className="btn btn-primary">Go to Student Section</button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card shadow">
                  <div className="card-body text-center">
                    <h5 className="card-title text-secondary">Admin</h5>
                    <p className="card-text">
                      Manage student entries and class schedules here.
                    </p>
                    <button className="btn btn-primary">Go to Admin Section</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Thank You message after card scan
          <div className="text-center">
            <h2 className="display-4 text-success mb-4">Thank You!</h2>
            <p className="lead text-muted">
              Your card has been accepted. Ready for the next student.
            </p>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">&copy; 2025 Student Portal | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default LandingPage;
