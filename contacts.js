const fs = require('fs').promises;
const path = require('path');

const { nanoid } = require('nanoid');

const contactsPath = path.resolve('db/contacts.json');

// TODO: задокументувати кожну функцію
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  return contacts.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const contactToDeleteIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactToDeleteIndex === -1) return null;

  const [deletedContact] = contacts.splice(contactToDeleteIndex, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return deletedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
