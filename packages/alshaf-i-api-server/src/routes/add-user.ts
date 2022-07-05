import {app} from '../app.js';

import type {AlwatrConnection} from '../@alwatr/micro-server/src/micro-server';

app.route('all', '/adduser', async (connection: AlwatrConnection) => {
  connection.reply({
    ok: true,
    data: {
      app: 'Alshaf-i API [adduser]',
      message: 'Recived !',
    },
  });
});
