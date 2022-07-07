import {app} from '../app.js';
import {addUserToDB, checkUserExists} from '../db.js';
import {checkPhoneNumber} from '../utils/checkPhoneNumber.js';

import type {AlwatrConnection} from '../@alwatr/micro-server/src/micro-server';

app.route('all', '/adduser', async (connection: AlwatrConnection) => {
  addUserRoute(connection);
});

async function addUserRoute(connection: AlwatrConnection): Promise<void> {
  // parse params
  const params = new URLSearchParams(connection.url.search);
  const phoneNumber: string | null = params.get('phoneNumber');
  const name: string | null = params.get('name');

  if (!(phoneNumber !== null && checkPhoneNumber(phoneNumber) && name !== null)) {
    connection.reply({
      ok: false,
      statusCode: 400,
      errorCode: 'BAD_REQUEST',
      data: {
        app: 'Alshaf-i API [adduser]',
        message: 'Cannot params from URL',
      },
    });
    return;
  }

  const user: any = {};
  user[phoneNumber] = name;

  // check exist in DB
  if (!(await checkUserExists(user))) {
    await addUserToDB(user);
    connection.reply({
      ok: true,
      data: {
        app: 'Alshaf-i API [adduser]',
        message: 'User is registred',
      },
    });
  } else {
    connection.reply({
      ok: false,
      statusCode: 409,
      errorCode: 'USER_EXISTS',
      data: {
        app: 'Alshaf-i API [adduser]',
        message: 'The user is already registred',
      },
    });
  }
}
