import React, { useState } from 'react';
import axios from 'axios';


function EmailForm() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !email || !subject) {
      alert('All fields are required!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('to', email);
    formData.append('subject', subject);

    try {
      const response = await axios.post('http://localhost:3000/send', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Email sent successfully: ' + response.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send email.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <br />
      <label>
        Subject:
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
      </label>
      <br />
      <label>
        File:
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
      </label>
      <br />
      <button type="submit">Send Email</button>
    </form>
  );
}

export default EmailForm;
