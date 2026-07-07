const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
router.use((req, res, next) => {
    console.log(`📌 API Route hit: ${req.method} ${req.originalUrl}`);
    next();
});

router.get('/companies', companyController.getAllCompanies);
router.get('/companies/:id', companyController.getCompanyById);
router.post('/companies', companyController.createCompany);
router.put('/companies/:id', companyController.updateCompany);
router.delete('/companies/:id', companyController.deleteCompany);
router.get('/stats', companyController.getStats);

module.exports = router;