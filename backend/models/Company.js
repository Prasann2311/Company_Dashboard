const db = require('../config/db');

class Company {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM companies ORDER BY created_at DESC');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM companies WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(companyData) {
        const { name, email, phone, address, industry, employee_count, revenue } = companyData;
        const [result] = await db.query(
            'INSERT INTO companies (name, email, phone, address, industry, employee_count, revenue) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, email, phone, address, industry, employee_count, revenue]
        );
        return result.insertId;
    }

    static async update(id, companyData) {
        const { name, email, phone, address, industry, employee_count, revenue } = companyData;
        const [result] = await db.query(
            'UPDATE companies SET name = ?, email = ?, phone = ?, address = ?, industry = ?, employee_count = ?, revenue = ? WHERE id = ?',
            [name, email, phone, address, industry, employee_count, revenue, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM companies WHERE id = ?', [id]);
        return result.affectedRows;
    }

    static async getStats() {
        const [total] = await db.query('SELECT COUNT(*) as total FROM companies');
        const [totalEmployees] = await db.query('SELECT SUM(employee_count) as total FROM companies');
        const [totalRevenue] = await db.query('SELECT SUM(revenue) as total FROM companies');
        const [industryCount] = await db.query('SELECT industry, COUNT(*) as count FROM companies GROUP BY industry');
        
        return {
            totalCompanies: total[0].total,
            totalEmployees: totalEmployees[0].total || 0,
            totalRevenue: totalRevenue[0].total || 0,
            industryDistribution: industryCount
        };
    }
}

module.exports = Company;