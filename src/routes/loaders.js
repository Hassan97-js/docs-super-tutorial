import { getContacts, getContact } from "../contacts.js";

const getContactsLoader = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
};

const getContactLoader = async ({ params }) => {
  const contact = await getContact(params.id);
  return { contact };
};

export { getContactsLoader, getContactLoader };
