import _ from 'lodash';
import query from '../../configs/connections.mjs';

export default {
  async find(req, res) {
    let { query: { pair } } = req;

    try {
      if (!_.isString(pair) || pair === '') throw Error;

      pair = _.replace(pair, '-', '/');
      const sql = `
        SELECT
          exchange, coin, price, updated
        FROM MarketData
        WHERE coin = "${pair}";
      `;
      const results = await query(sql);

      /* eslint-disable object-curly-newline */
      const info = results.map(({ exchange, coin, price, updated }) => (
        { exchange, coin, value: price, updated }
      ));
      res.json({ status: 'OK', info });
    } catch (e) {
      res.json({
        status: 'NOTOK',
        errorcode: 1001,
        errormessage: 'Coin pair not found',
        messagedetail: 'Provide more info if needed',
      });
    }
  },
};
