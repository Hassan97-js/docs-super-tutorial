import { redirect } from "react-router-dom";
import { createContact, updateContact } from "../contacts";

const createContactAction = async () => {
  const contact = await createContact();

  // return { contact };
  return redirect(`/contacts/${contact.id}/edit`);
};

const updateContactAction = async ({ request, params }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.id, updates);
  return redirect(`/contacts/${params.id}`);
};

export { createContactAction, updateContactAction };
