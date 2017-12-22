import cm from 'compose-middleware';

import body from 'body-parser';
import cookie from 'cookie-parser';
import csrf from 'csurf';

const { compose } = cm;

export default function middleware() {
  return compose([
    body.json(),
    cookie(),
    csrf({ cookie: true }),
    (err, req, res, next) => {
      if (err.code !== 'EBADCSRFTOKEN') return next(err);

      res.status(403);
      return res.send('form tampered with');
    },
  ]);
}
