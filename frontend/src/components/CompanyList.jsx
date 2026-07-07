import React, { useState, useEffect } from 'react';
import { getCompanies, deleteCompany } from '../services/api';

const CompanyList = ({ onEdit, refreshTrigger }) => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCompanies();
    }, [refreshTrigger]);

    const fetchCompanies = async () => {
        try {
            const response = await getCompanies();
            setCompanies(response.data.data);
        } catch (error) {
            console.error('Error fetching companies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this company?')) {
            try {
                await deleteCompany(id);
                fetchCompanies();
            } catch (error) {
                console.error('Error deleting company:', error);
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="company-table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Industry</th>
                        <th>Employees</th>
                        <th>Revenue</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map(company => (
                        <tr key={company.id}>
                            <td>{company.id}</td>
                            <td>{company.name}</td>
                            <td>{company.email}</td>
                            <td>{company.phone}</td>
                            <td>{company.industry}</td>
                            <td>{company.employee_count}</td>
                            <td>${(company.revenue || 0).toLocaleString()}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => onEdit(company)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(company.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompanyList;