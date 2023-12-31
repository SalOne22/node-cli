const argv = require('yargs').argv;

const contacts = require('./contacts');

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      console.table(await contacts.listContacts());
      break;

    case 'get':
      console.log(await contacts.getContactById(id));
      break;

    case 'add':
      console.log(await contacts.addContact(name, email, phone));
      break;

    case 'remove':
      console.log(await contacts.removeContact(id));
      break;

    default:
      console.warn('\x1B[31mUnknown action type!');
  }
}

async function run() {
  try {
    await invokeAction(argv);
  } catch (err) {
    console.error('Something went wrong...', err.message);
  }
}

run();
