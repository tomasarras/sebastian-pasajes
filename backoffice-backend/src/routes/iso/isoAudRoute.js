const express = require('express')
const router = express.Router()
const isoAudController = require('../../controllers/iso/isoAudController')

router.get('/', isoAudController.getAllAud)
router.get('/:id', isoAudController.getAudById)
router.put('/:id', isoAudController.updateAud)
router.delete('/:id', isoAudController.deleteAud)

module.exports = router 