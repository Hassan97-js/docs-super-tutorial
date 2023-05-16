import { useEffect } from "react";

import {
  NavLink,
  Outlet,
  Form,
  useLoaderData,
  useNavigation,
  useSubmit
} from "react-router-dom";

const Root = () => {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  const locationExist = !!navigation.location;
  const urlSearch = locationExist && new URLSearchParams(navigation.location.search);
  const isUserSearching = locationExist && urlSearch.has("q");

  const handleSubmitSearchQuery = (event) => {
    const isFirstSearch = q == null;
    submit(event.currentTarget.form, {
      replace: !isFirstSearch
    });
  };

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>

        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={isUserSearching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={handleSubmitSearchQuery}
            />

            <div id="search-spinner" aria-hidden hidden={!isUserSearching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>

          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) => {
                      return isActive ? "active" : isPending ? "pending" : "";
                    }}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}

                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>

      <div id="detail" className={navigation.state === "loading" ? "loading" : ""}>
        <Outlet />
      </div>
    </>
  );
};

export default Root;
