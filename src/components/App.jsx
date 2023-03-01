import React, { Component } from "react";
import shortid from "shortid";

import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactLists/ContactLists";
import Filter from "./Filter/Filter";

import style from './App.module.css';


class App extends Component {

    state = {
        contacts: [],
        filter: '',
      }

      componentDidMount() {
        console.log('Mount')

        const contacts = localStorage.getItem('contacts');
        const parsedContact = JSON.parse(contacts);

        if(parsedContact) {
            this.setState({ contacts: parsedContact });
        }
      }

      componentDidUpdate(prevProps, prevState) {
        console.log('Update');

        if(this.state.contacts !== prevState.contacts) {
            console.log('Update file contacts');
            localStorage.setItem('contacts', JSON.stringify(this.state.contacts));

        }

        console.log(prevProps);
        console.log(prevState);
      }

    deteleContact = (contactId) => {

        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== contactId),
        }))

      }

    addContact = ({ name, number }) => {
        const { contacts } = this.state;

        
        const newContact = {
            id: shortid.generate(),
            name: name,
            number: number
        }

        const checkedName = contacts.find(contact => 
            contact.name.toLowerCase() === newContact.name.toLowerCase(),
            );

            if(checkedName) {
                alert(`${newContact.name} is already in contact.`)
                return;
            }

        console.log(newContact);

        this.setState(prevState => ({
            contacts: [newContact, ...prevState.contacts]
        }))

    }

    changeFilter = e => {
        this.setState({filter: e.currentTarget.value})
    }

    getFilterContact = () => {
        const { contacts, filter } = this.state;

        const normalizedFilter = filter.toLowerCase();

        return contacts.filter(contact => 
            contact.name.toLowerCase().includes(normalizedFilter),
            );
    }

  render(){
    const { filter, contacts } = this.state;

    const filteredContacts = this.getFilterContact();

    return (
        <div className={style.container}>
            <h1>Phonebook</h1>
            <ContactForm onSubmit={this.addContact} />

            <h2>Contacts</h2>
            {contacts.length > 0 ? (
                <>
                    <Filter value={filter} onChange={this.changeFilter} />
                    <ContactList contacts={filteredContacts} onDeleteContact={this.deteleContact} />
                </>
            ): (
                <h1>Contact list is empty</h1>
            )} 

        </div>
      );
  }
};

export default App;
