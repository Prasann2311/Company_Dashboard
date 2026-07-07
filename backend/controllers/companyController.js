const Company = require('../models/Company');

exports.getAllCompanies = async (req, res) => {
    try {
        console.log('Fetching all companies...');
        const companies = await Company.getAll();
        console.log(`Found ${companies.length} companies`);
        res.json({ success: true, data: companies });
    } catch (error) {
        console.error('Error in getAllCompanies:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getCompanyById = async (req, res) => {
    try {
        const company = await Company.getById(req.params.id);
        if (!company) {
            return res.status(404).json({ success: false, message: 'Company not found' });
        }
        res.json({ success: true, data: company });
    } catch (error) {
        console.error('Error in getCompanyById:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createCompany = async (req, res) => {
    try {
        const id = await Company.create(req.body);
        const newCompany = await Company.getById(id);
        res.status(201).json({ success: true, data: newCompany });
    } catch (error) {
        console.error('Error in createCompany:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateCompany = async (req, res) => {
    try {
        const updated = await Company.update(req.params.id, req.body);
        if (updated === 0) {
            return res.status(404).json({ success: false, message: 'Company not found' });
        }
        const updatedCompany = await Company.getById(req.params.id);
        res.json({ success: true, data: updatedCompany });
    } catch (error) {
        console.error('Error in updateCompany:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteCompany = async (req, res) => {
    try {
        const deleted = await Company.delete(req.params.id);
        if (deleted === 0) {
            return res.status(404).json({ success: false, message: 'Company not found' });
        }
        res.json({ success: true, message: 'Company deleted successfully' });
    } catch (error) {
        console.error('Error in deleteCompany:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getStats = async (req, res) => {
    try {
        const stats = await Company.getStats();
        res.json({ success: true, data: stats });
    } catch (error) {
        console.error('Error in getStats:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};