import React, { useState } from 'react';
import { db, fb_auth } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const TeacherRegister = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        password: '',
        confirmPassword: '',
        role: 'Teacher'
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, confirmPassword, ...otherData } = formData;

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(fb_auth, email, password);
            await addDoc(collection(db, 'teachers'), {
                ...otherData,
                email
            });
            console.log('Form Data Submitted:', formData);
            alert('Registration successful');
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                password: '',
                confirmPassword: ''
            });
            navigate('/login')
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('Error adding document');
        }
    };

    return (
        <div>
            <h2>Teacher Registration</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Company Origin:</label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className='px-8 py-2 text-white rounded-full bg-button-color' type="submit">Register</button>
            </form>
        </div>
    );
};

export default TeacherRegister;
