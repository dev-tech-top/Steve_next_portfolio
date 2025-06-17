import React, { useState } from 'react';

export const ContactSection = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend or email service
        setSubmitted(true);
    };

    return (
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
            <h2>Contact Me</h2>
            {submitted ? (
                <p>Thank you for reaching out! I'll get back to you soon.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', marginBottom: 8 }}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', marginBottom: 8 }}
                        />
                    </div>
                    <div>
                        <label>Message:</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            required
                            rows={4}
                            style={{ width: '100%', marginBottom: 8 }}
                        />
                    </div>
                    <button type="submit">Send</button>
                </form>
            )}
        </div>
    );
};
