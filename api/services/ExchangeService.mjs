import ccxt from 'ccxt';

import query from '../../configs/connections.mjs';
import { MARKETS, COINS } from '../../configs/markets.mjs';

const getPriceCoinFromExchange = async () => {
  MARKETS.forEach(async (market) => {
    const exchange = new ccxt[market]();

    await Promise.all(COINS.map(async (coin) => {
      const book = await exchange.fetchOrderBook(coin);
      const price = book.bids[0][0];

      //
      let sql = `
        UPDATE MarketData
        SET
          price = '${price}'
        WHERE
          exchange = '${market}' AND coin = '${coin}';
      `;
      const result = await query(sql);

      if (result.affectedRows === 0) {
        sql = `
          INSERT INTO
            MarketData (coin, exchange, price)
          VALUE
            ('${coin}', '${market}', '${price}');
        `;

        await query(sql);
      }

      console.log('Get Exchange Data');
      return { market, coin, price };
    }));
  });
};
// setInterval(getPriceCoinFromExchange, DELAY);
export default { getPriceCoinFromExchange };
