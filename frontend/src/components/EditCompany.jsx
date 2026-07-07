import React, { useState, useEffect } from 'react';
import { updateCompany } from '../services/api';

const EditCompany = ({ company, onClose, onSuccess }) => {
    const [formData, setFormData] = useState(company);

    useEffect(() => {
        setFormData(company);
    }, [company]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCompany(company.id, formData);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error updating company:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edit Company</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Company Name</label>
                        <input type="text" name="name" value={formData.name} required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input type="text" name="phone" value={formData.phone} required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <textarea name="address" rows="3" value={formData.address} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label>Industry</label>
                        <select name="industry" value={formData.industry} onChange={handleChange}>
                            <option value="Technology">Technology</option>
                            <option value="Finance">Finance</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Education">Education</option>
                            <option value="Retail">Retail</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Employee Count</label>
                        <input type="number" name="employee_count" value={formData.employee_count} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Revenue ($)</label>
                        <input type="number" name="revenue" value={formData.revenue} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                    <button type="button" className="btn" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditCompany;