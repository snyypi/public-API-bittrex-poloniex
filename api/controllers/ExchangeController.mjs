import _ from 'lodash';
import query from '../../configs/connections.mjs';

export default {
  async find(req, res) {
    const { query: { name } } = req;

    try {
      if (!_.isString(name) || name === '') throw Error;

      const sql = `
        SELECT
          coin, price
        FROM MarketData
        WHERE exchange = "${name}";
      `;
      const results = await query(sql);

      const info = results.map(({ coin, price }) => (
        { coin, value: price }
      ));
      res.json({ status: 'OK', info });
    } catch (e) {
      res.json({
        status: 'NOTOK',
        errorcode: 1002,
        errormessage: 'Invalid exchange not found',
        messagedetail: 'Provide more info if needed',
      });
    }
  },
};
