import shedule from 'node-schedule';

import ExchangeService from './api/services/ExchangeService.mjs';
import server from './configs/index.mjs';
import { CRON } from './configs/markets.mjs';

(async () => {
  try {
    shedule.scheduleJob(CRON, await ExchangeService.getPriceCoinFromExchange);
  } catch (e) {
    console.log(e);
  }

  await server.listen(80);
})();
