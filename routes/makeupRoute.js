const router = require('express').Router();
const makeupController = require('../controllers/makeupController');

router.get('/', makeupController.get_all_makeup_services);
router.get('/:id', makeupController.get_makeup_service_by_id);
router.post('/', makeupController.add_makeup_service);
router.patch('/:id', makeupController.update_makeup_service);
router.delete('/:id', makeupController.delete_makeup_service_by_id);