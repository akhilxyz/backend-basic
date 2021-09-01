const router = require('express').Router()
const postHandler = require('../handlers/post')
const checkAuth = require("../middleware/auth")

// POST - Create - 201 (Created), link to /Post containing new ID. Avoid using POST on single resource
router.post('/', checkAuth, postHandler.addPost)

// PUT Method - Update/Replace - 405 (Method not allowed), unless you want to update every resource 
 // in the entire collection of resource. 200 (OK) or 204 (No Content). Use 404 (Not Found), if ID not found or invalid.
router.put('/like', checkAuth, postHandler.likePost)

// for Unlike the post
router.put('/unlike', checkAuth, postHandler.unlikePost)

// for comment on the post
router.put('/comment', checkAuth, postHandler.commentPost)

router.delete('/comment', checkAuth, postHandler.deleteComment)

// GET - Read - 200 (OK), list of users. Use pagination, sorting and filtering to navigate big lists. 200 (OK), single user. 404 (Not Found), if ID not found or invalid.
router.get('/', checkAuth, postHandler.getPost)

// PATCH - Partial Update/Modify - 405 (Method not allowed), unless you want to modify the collection itself. 200 (OK) or 204 (No Content). Use 404 (Not Found), if ID not found or invalid.
router.patch('/', checkAuth, postHandler.updatePost)

// DELETE - Delete 405 (Method not allowed), unless you want to delete the whole collection — use with caution. 200 (OK). 404 (Not Found), if ID not found or invalid.
router.delete('/', checkAuth, postHandler.deletePost)

module.exports = router