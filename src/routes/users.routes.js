const { Router} = require('express');
const router = Router();

const { 
    renderFormAdd, 
    createNewUser, 
    renderAllUsers, 
    renderUpdate, 
    updateUser, 
    deleteUser 
} = require('../controllers/users.controller')

router.get('/user/add', renderFormAdd);
router.post('/user/new-user', createNewUser);

router.get('/users', renderAllUsers);

router.get('/user/update/:id', renderUpdate);
router.put('/user/update/:id', updateUser);

router.delete('/user/delete/:id', deleteUser);


module.exports = router;