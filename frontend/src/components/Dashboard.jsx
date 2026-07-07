import React, { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import CompanyList from './CompanyList';
import AddCompany from './AddCompany';
import EditCompany from './EditCompany';
import { getStats } from '../services/api';
import { FaBuilding, FaUsers, FaDollarSign, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalCompanies: 0,
        totalEmployees: 0,
        totalRevenue: 0,
        industryDistribution: []
    });
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        fetchStats();
    }, [refreshTrigger]);

    const fetchStats = async () => {
        try {
            const response = await getStats();
            setStats(response.data.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const handleEdit = (company) => {
        setSelectedCompany(company);
        setShowEditModal(true);
    };

    const handleSuccess = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div>
            <div className="navbar">
                <h1>🏢 Company Management Dashboard</h1>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                    + Add New Company
                </button>
            </div>

            <div className="dashboard-container">
                <div className="stats-grid">
                    <StatsCard 
                        title="Total Companies" 
                        value={stats.totalCompanies} 
                        icon={<FaBuilding />} 
                    />
                    <StatsCard 
                        title="Total Employees" 
                        value={stats.totalEmployees.toLocaleString()} 
                        icon={<FaUsers />} 
                    />
                    <StatsCard 
                        title="Total Revenue" 
                        value={`$${stats.totalRevenue.toLocaleString()}`} 
                        icon={<FaDollarSign />} 
                    />
                    <StatsCard 
                        title="Industries" 
                        value={stats.industryDistribution.length} 
                        icon={<FaChartLine />} 
                    />
                </div>

                <CompanyList 
                    onEdit={handleEdit} 
                    refreshTrigger={refreshTrigger} 
                />

                {showAddModal && (
                    <AddCompany 
                        onClose={() => setShowAddModal(false)}
                        onSuccess={handleSuccess}
                    />
                )}

                {showEditModal && selectedCompany && (
                    <EditCompany 
                        company={selectedCompany}
                        onClose={() => setShowEditModal(false)}
                        onSuccess={handleSuccess}
                    />
                )}
            </div>
        </div>
    );
};

export default Dashboard;