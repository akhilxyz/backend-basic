const router = require('express').Router()
const galleryHandler = require('../handlers/gallery')
const checkAuth = require("../middleware/auth")

// POST - Create - 201 (Created), link to /gallery containing new ID. Avoid using POST on single resource
router.post('/', checkAuth, galleryHandler.addGallery)

// GET - Read - 200 (OK), list of images. Use pagination, sorting and filtering to navigate big lists. 200 (OK), single user. 404 (Not Found), if ID not found or invalid.
router.get('/', checkAuth, galleryHandler.getGallery)

// PATCH - Partial Update/Modify - 405 (Method not allowed), unless you want to modify the collection itself. 200 (OK) or 204 (No Content). Use 404 (Not Found), if ID not found or invalid.
router.patch('/', checkAuth, galleryHandler.updateGallery)

// DELETE - Delete 405 (Method not allowed), unless you want to delete the whole collection — use with caution. 200 (OK). 404 (Not Found), if ID not found or invalid.
router.delete('/', checkAuth, galleryHandler.deleteImage)

module.exports = router;