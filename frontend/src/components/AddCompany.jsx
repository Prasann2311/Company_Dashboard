import React, { useState } from 'react';
import { createCompany } from '../services/api';

const AddCompany = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        industry: '',
        employee_count: '',
        revenue: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCompany(formData);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error creating company:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add New Company</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Company Name</label>
                        <input type="text" name="name" required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input type="text" name="phone" required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <textarea name="address" rows="3" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label>Industry</label>
                        <select name="industry" onChange={handleChange}>
                            <option value="">Select Industry</option>
                            <option value="Technology">Technology</option>
                            <option value="Finance">Finance</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Education">Education</option>
                            <option value="Retail">Retail</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Employee Count</label>
                        <input type="number" name="employee_count" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Revenue ($)</label>
                        <input type="number" name="revenue" onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="button" className="btn" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddCompany;