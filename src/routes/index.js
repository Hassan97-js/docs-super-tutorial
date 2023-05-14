import Root from "./Root";
import Contact from "./Contact";
import EditContact from "./EditContact";
import ErrorPage from "./ErrorPage";

import { getContactLoader, getContactsLoader } from "./loaders";
import { createContactAction, updateContactAction } from "./actions";

const routesData = {
  components: { Root, Contact, EditContact, ErrorPage },
  loaders: {
    getContactLoader,
    getContactsLoader
  },
  actions: {
    createContactAction,
    updateContactAction
  }
};

export default routesData;
