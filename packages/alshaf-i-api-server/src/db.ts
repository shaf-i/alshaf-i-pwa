import {writeJsonFile, readJsonFile} from './@alwatr/data-storage/src/data-storage.js';
import {jsonFilePath} from './config.js';
import {User} from './type.js';

export async function addUserToDB(user: object): Promise<boolean> {
  let userList = await getUserList();
  userList = {...userList, ...user};
  await writeJsonFile(jsonFilePath, userList);
  return true;
}

// return true if user exists in DB
export async function checkUserExists(user: User): Promise<boolean> {
  const userList = await getUserList();
  if (Object.keys(user)[0] in userList) {
    return true;
  } else {
    return false;
  }
}

async function getUserList(): Promise<object> {
  try {
    const jsonFileContent = await readJsonFile(jsonFilePath);
    return jsonFileContent;
  } catch {
    // if json file empty
    return {};
  }
}
