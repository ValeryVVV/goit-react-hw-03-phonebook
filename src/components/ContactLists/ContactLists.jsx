import React from "react";
import PropTypes from 'prop-types';

import style from './ContactLists.module.css';

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul>
    {contacts.map(({ id, name, number }) => (
      <li key={id} className={style.item}>
        <p className={style.contact}>
          {name}...
          {number}
        </p>
        <button className={style.btn} type="submit" onClick={() => onDeleteContact(id)}>Delete</button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
      })
    ),
    onDeleteContact: PropTypes.func.isRequired,
  };

export default ContactList;
