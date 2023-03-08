const fs = require("fs").promises;
const path = require("path");
const uuid = require("uuid");
const { program } = require("commander");
require("colors");

const contactsPath = path.resolve("./db/contacts.json/", "contacts.json");

// list
async function listContacts() {
  try {
    const fileData = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(fileData);

    return contacts;
  } catch (err) {
    console.log(err);
  }
}

// get
async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);

    return contact ? contact : null;
  } catch (err) {
    console.log(err);
  }
}

// remove
async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    const deletedContact = contacts[index];

    if (index !== -1) {
      contacts.splice(index, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
    }

    return deletedContact ? contacts : null;
  } catch (err) {
    console.log(err);
  }
}

// add
async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: uuid.v4(),
      name: name,
      email: email,
      phone: phone,
    };

    const contacts = await listContacts();
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return contacts;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
