import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";

const About = () => {
  const { notes } = useContext(noteContext);

  const [tab, setTab] = useState("about");

  const copyInfo = () => {
    navigator.clipboard.writeText(
      "iNotebook is a secure MERN stack notes app with authentication, CRUD operations, and cloud storage."
    );
    alert("App info copied!");
  };

  return (
    <div className="about-page container my-4">

      {/* Header */}
      <div className="text-center mb-4">
        <h2>📘 iNotebook</h2>
        <p className="text-muted">
          Secure, fast and simple cloud-based notes application
        </p>
      </div>

      {/* Stats Cards */}
      <div className="row text-center mb-4">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h4>{notes?.length || 0}</h4>
            <p>Total Notes</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h4>JWT</h4>
            <p>Authentication</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h4>MERN</h4>
            <p>Tech Stack</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="btn-group mb-3">
        <button
          className={`btn ${tab === "about" ? "btn-dark" : "btn-outline-secondary"}`}
          onClick={() => setTab("about")}
        >
          About
        </button>

        <button
          className={`btn ${tab === "features" ? "btn-dark" : "btn-outline-secondary"}`}
          onClick={() => setTab("features")}
        >
          Features
        </button>

        <button
          className={`btn ${tab === "tech" ? "btn-dark" : "btn-outline-secondary"}`}
          onClick={() => setTab("tech")}
        >
          Tech Stack
        </button>
      </div>

      {/* Content Section */}
      <div className="card p-4 shadow-sm">

        {/* ABOUT TAB */}
        {tab === "about" && (
          <>
            <h5>📌 What is iNotebook?</h5>
            <p>
              <strong>iNotebook</strong> is a secure cloud-based notes application that allows users to create, update, and delete personal notes efficiently.
              Each user has private, authenticated access to their data, ensuring complete privacy and security.
              Built with the MERN stack, iNotebook uses modern web technologies including React for frontend UI, Node.js and Express for backend APIs, and MongoDB for data storage.
              It is designed to be fast, responsive, and easy to use for everyday note-taking and organization.
            </p>

            <button className="btn btn-primary btn-sm" onClick={copyInfo}>
              📋 Copy App Info
            </button>
          </>
        )}

        {/* FEATURES TAB */}
        {tab === "features" && (
          <>
            <h5>⚡ Features</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">✔ Create Notes</li>
              <li className="list-group-item">✔ Edit Notes</li>
              <li className="list-group-item">✔ Delete Notes</li>
              <li className="list-group-item">✔ Secure Login (JWT)</li>
              <li className="list-group-item">✔ Private User Data</li>
            </ul>
          </>
        )}

        {/* TECH TAB */}
        {tab === "tech" && (
          <>
            <h5>🧠 Tech Stack</h5>
            <ul>
              <li>Frontend: React.js</li>
              <li>Backend: Node.js + Express</li>
              <li>Database: MongoDB</li>
              <li>Authentication: JWT</li>
              <li>API: REST API</li>
            </ul>
          </>
        )}

      </div>

      {/* Footer */}
      <div className="text-center text-muted mt-4">
        Built with ❤️ for learning Full Stack Development
      </div>

    </div>
  );
};

export default About;