import { redirect } from "react-router-dom";
import { createContact, updateContact, deleteContact } from "../contacts";

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

const deleteContactAction = async ({ params }) => {
  // throw new Error("oh dang!");

  const isDeleted = await deleteContact(params.id);

  if (isDeleted) {
    return redirect("/");
  }
};

export { createContactAction, updateContactAction, deleteContactAction };
