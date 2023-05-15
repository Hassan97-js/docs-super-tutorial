import Root from "./Root";
import IndexRoute from "./IndexRoute";
import Contact from "./Contact";
import EditContact from "./EditContact";
import ErrorPage from "./ErrorPage";

import { getContactLoader, getContactsLoader } from "./loaders";
import {
  createContactAction,
  updateContactAction,
  deleteContactAction
} from "./actions";

const routesData = {
  components: { Root, IndexRoute, Contact, EditContact, ErrorPage },
  loaders: {
    getContactLoader,
    getContactsLoader
  },
  actions: {
    createContactAction,
    updateContactAction,
    deleteContactAction
  }
};

export default routesData;
