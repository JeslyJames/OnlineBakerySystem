import React from 'react';

const ContactUs = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Contact Us</h1>
      <p style={styles.description}>
        We’d love to hear from you! Feel free to reach out for any inquiries or feedback.
      </p>
      <form style={styles.form}>
        <label style={styles.label}>
          Name:
          <input type="text" name="name" style={styles.input} required />
        </label>
        <label style={styles.label}>
          Email:
          <input type="email" name="email" style={styles.input} required />
        </label>
        <label style={styles.label}>
          Message:
          <textarea name="message" style={styles.textarea} required />
        </label>
        <button type="submit" style={styles.button}>Send Message</button>
      </form>
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  title: {
    textAlign: 'center',
    color: '#D5006D', // Updated to dark pink
  },
  description: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '10px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '15px',
  },
  textarea: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    height: '100px',
    marginBottom: '15px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#D5006D', // Updated to dark pink
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  }
};

export default ContactUs;
