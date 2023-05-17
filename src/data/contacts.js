import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getContacts(query) {
  await fakeNetwork(`getContacts:${query}`);
  let contacts = await localforage.getItem("contacts");
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
  await fakeNetwork();

  let id = Math.random().toString(36).substring(2, 9);
  let contact = { id, createdAt: Date.now() };
  let contacts = await getContacts();

  contacts.unshift(contact);
  await set(contacts);

  return contact;
}

export async function getContact(id) {
  await fakeNetwork(`contact:${id}`);
  let contacts = await localforage.getItem("contacts");
  let contact = contacts.find((contact) => contact.id === id);
  return contact ?? null;
}

export async function updateContact(id, updates) {
  await fakeNetwork();
  let contacts = await localforage.getItem("contacts");
  let contact = contacts.find((contact) => contact.id === id);
  if (!contact) throw new Error("No contact found for", id);
  Object.assign(contact, updates);
  await set(contacts);
  return contact;
}

export async function deleteContact(id) {
  let contacts = await localforage.getItem("contacts");
  let index = contacts.findIndex((contact) => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
}

function set(contacts) {
  return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}

/* 
  {
        ...createContact(),
        first: "Hassan",
        last: "Dev",
        avatar: "https://placekitten.com/g/200/200",
        twitter: "@hassan",
        notes: "Some notes",
        favorite: true
      },
      {
        ...createContact(),
        first: "Tarik",
        last: "Dark",
        avatar: "https://placekitten.com/g/200/200",
        twitter: "@tarik",
        notes: "Some notes",
        favorite: false
      },
      {
        ...createContact(),
        first: "Farik",
        last: "Nisharry",
        avatar:
          "https://images.generated.photos/N2CcsCSW8zfqYHVmlhU_JXjaBKM0xwxUUNZMGK_BTEI/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTcxMTAzLmpwZw.jpg",
        twitter: "@faris",
        notes: "Some notes",
        favorite: false
      } 
      
*/
