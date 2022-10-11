const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/',userController.view);
router.post('/',userController.find);
router.get('/addUser',userController.form);
router.post('/addUser',userController.create);
router.get('/edit-user/:id',userController.editUser);
router.post('/edit-user/:id',userController.update);
router.get('/deleteUser/:id',userController.delete);
router.get('/userProfile/:id',userController.viewUser);

module.exports=router;
