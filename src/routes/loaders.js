import { getContacts, getContact } from "../contacts.js";

const getContactsLoader = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
};

const getContactLoader = async ({ params }) => {
  const contact = await getContact(params.id);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found"
    });
  }
  return { contact };
};

export { getContactsLoader, getContactLoader };
