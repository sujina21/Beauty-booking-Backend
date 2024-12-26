const router = require('express').Router();
const nailController = require('../controllers/nailController');

router.get('/', nailController.get_all_nail_services);
router.get('/:id', nailController.get_nail_service_by_id);
router.post('/', nailController.add_nail_service);
router.patch('/:id', nailController.update_nail_service);
router.delete('/:id', nailController.delete_nail_service_by_id);