const Router = require("express").Router;
const ProductController = require('../controllers/product-controller');
const OrgatizationController = require('../controllers/organization-controller');
const IndividualController = require('../controllers/individual-controller');
const ProxyBodyController = require('../controllers/proxy-body-controller');
const ProxyHeaderController = require('../controllers/proxy-header-controller');
const VoditelController = require('../controllers/voditel-controller');
const StudBodyController = require('../controllers/stud-body-controller');
const StudHeaderController = require('../controllers/stud-header-controller');


const router = new Router();

router.get
    (
        '/products',
        ProductController.getAllRecords,
    );

router.post
    (
        '/products',
        ProductController.createRecord,
    );

router.put
    (
        '/products',
        ProductController.updateRecord,
    );

router.delete
    (
        '/products/:id',
        ProductController.removeRecord,
    );

router.get
    (
        '/organizations',
        OrgatizationController.getAllRecords,
    );

router.post
    (
        '/organizations',
        OrgatizationController.createRecord,
    );

router.put
    (
        '/organizations',
        OrgatizationController.updateRecord,
    );

router.delete
    (
        '/organizations/:id',
        OrgatizationController.removeRecord,
    );

router.get
    (
        '/individuals',
        IndividualController.getAllRecords,
    );

router.post
    (
        '/individuals',
        IndividualController.createRecord,
    );

router.put
    (
        '/individuals',
        IndividualController.updateRecord,
    );

router.delete
    (
        '/individuals/:id',
        IndividualController.removeRecord,
    );

router.get
    (
        '/proxy-bodies/:headerId',
        ProxyBodyController.getAllHeadersRecords,
    );

router.post
    (
        '/proxy-bodies',
        ProxyBodyController.createRecord,
    );

router.put
    (
        '/proxy-bodies',
        ProxyBodyController.updateRecord,
    );

router.delete
    (
        '/proxy-bodies/:id',
        ProxyBodyController.removeRecord,
    );

router.get
    (
        '/proxy-headers',
        ProxyHeaderController.getAllRecords,
    );

router.get
    (
        '/proxy-headers/:id',
        ProxyHeaderController.getOneRecord,
    );

router.post
    (
        '/proxy-headers',
        ProxyHeaderController.createRecord,
    );

router.put
    (
        '/proxy-headers',
        ProxyHeaderController.updateRecord,
    );

router.delete
    (
        '/proxy-headers/:id',
        ProxyHeaderController.removeRecord,
    );

    router.get
    (
        '/voditels',
        VoditelController.getAllRecords,
    );

router.post
    (
        '/voditels',
        VoditelController.createRecord,
    );

router.put
    (
        '/voditels',
        VoditelController.updateRecord,
    );

router.delete
    (
        '/voditels/:id',
        VoditelController.removeRecord,
    );

router.get
    (
        '/stud-bodies/:headerId',
        StudBodyController.getAllHeadersRecords,
    );

router.post
    (
        '/stud-bodies',
        StudBodyController.createRecord,
    );

router.put
    (
        '/stud-bodies',
        StudBodyController.updateRecord,
    );

router.delete
    (
        '/stud-bodies/:id',
        StudBodyController.removeRecord,
    );

router.get
    (
        '/stud-headers',
        StudHeaderController.getAllRecords,
    );

router.get
    (
        '/stud-headers/:id',
        StudHeaderController.getOneRecord,
    );

router.post
    (
        '/stud-headers',
        StudHeaderController.createRecord,
    );

router.put
    (
        '/stud-headers',
        StudHeaderController.updateRecord,
    );

router.delete
    (
        '/stud-headers/:id',
        StudHeaderController.removeRecord,
    );
module.exports = router;