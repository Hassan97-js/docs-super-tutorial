import { getContacts, getContact } from "../contacts.js";

const getContactsLoader = async () => {
  const contacts = await getContacts();
  return { contacts };
};

const getContactLoader = async ({ params }) => {
  const contact = await getContact(params.id);
  return { contact };
};

export { getContactsLoader, getContactLoader };
