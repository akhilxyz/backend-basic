const router = require('express').Router()
const userHandler = require('../handlers/user')
const checkAuth = require("../middleware/auth")

// After going user route we have some Request Methods for different operations

// login user 
router.post('/login', userHandler.loginUser)

// POST - Create - 201 (Created), ‘Location’ header with link to /users/{id} containing new ID. Avoid using POST on single resource
router.post('/', userHandler.addUser)

// GET - Read - 200 (OK), list of users. Use pagination, sorting and filtering to navigate big lists. 200 (OK), single user. 404 (Not Found), if ID not found or invalid.
router.get('/', checkAuth, userHandler.getUser)

// PATCH - Partial Update/Modify - 405 (Method not allowed), unless you want to modify the collection itself. 200 (OK) or 204 (No Content). Use 404 (Not Found), if ID not found or invalid.
router.patch('/', checkAuth, userHandler.updateUser)

// DELETE - Delete 405 (Method not allowed), unless you want to delete the whole collection — use with caution. 200 (OK). 404 (Not Found), if ID not found or invalid.
router.delete('/', checkAuth, userHandler.deleteUser)

// WE also have PUT Method - Update/Replace - 405 (Method not allowed), 
// unless you want to update every resource in the entire collection of resource.	
//200 (OK) or 204 (No Content). Use 404 (Not Found), if ID not found or invalid.

module.exports = router