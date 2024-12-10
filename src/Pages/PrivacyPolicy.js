import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="privacy-container">
      <div className="privacy-content">
        <h1>Privacy Policy</h1>

        <section className="privacy-section">
          <h2>General Information</h2>
          <p>
            This privacy policy serves as a template for a student project in the course "Product Design and Implementation" 
            and is not intended for publication. The guidelines and measures outlined here represent exemplary standards 
            and have no legally binding effect. The purpose is to provide a basic understanding of how personal data 
            might be handled on a hypothetical mental health website.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Collection and Processing of Personal Data</h2>
          <p>
            No personal data—such as names, email addresses, or IP addresses—are collected, stored, or processed on 
            this fictitious platform. All displayed content, comment functions, or user interactions are purely 
            illustrative and solely intended for demonstration purposes within the context of the project in the 
            "Product Design and Implementation" course. No actual data exchange with third parties takes place.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Security and Confidentiality</h2>
          <p>
            Although no real user data is collected within this project, in a theoretical scenario where data 
            processing would occur, a high level of importance would be placed on security and confidentiality. 
            In a real-life implementation, technical and organizational measures—such as encrypted connections 
            (SSL/TLS) and regular security audits—would be employed to protect data against unauthorized access, 
            loss, or misuse.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Changes to This Privacy Policy</h2>
          <p>
            Because this is a non-binding template, the contents of this privacy policy may be adjusted or expanded 
            at any time to reflect current legal requirements or changing project conditions. Any modifications within 
            the context of this student project remain purely academic, as no actual publication or data processing 
            will take place.
          </p>
        </section>

        <div className="privacy-button" onClick={() => navigate(-1)}>
          <h1>Return</h1>
        </div>
      </div>
    </div>
  );
}
