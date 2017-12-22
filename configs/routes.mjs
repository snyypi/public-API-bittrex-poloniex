import express from 'express';

import PriceController from '../api/controllers/PriceController.mjs';
import ExchangeController from '../api/controllers/ExchangeController.mjs';

const router = express.Router();

router.route('/coin-price')
  .get(PriceController.find);
router.route('/exchange-info')
  .get(ExchangeController.find);

export default router;
