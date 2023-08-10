import React, {useState} from "react";
import { nanoid } from 'nanoid';
import { ContactForm } from "../ContactForm/ContactForm";
import { Filter } from "components/Filter/Filter";
import { ContactList } from "components/ContactList/ContactList";
import  useLocaleStorage  from '../hooks/locale.storage';



const PhoneBook = () => {
    const [contacts, setContacts] = useLocaleStorage('contacts',[]);
    const [filter, setFilter] = useState('');
 
    const handleSubmit = (evt) => {
        evt.preventDefault();

        const nameContact = evt.target.name.value;
        const numberTel = evt.target.number.value;
        const nameRepeat = contacts.map(contact => contact.name);
        if (nameRepeat.includes(nameContact)) {
            alert(`${nameContact} is already in contacts`);
            evt.target.name.value = '';
            evt.target.number.value = '';
            return
        }
         let contact = {
      id: nanoid(),
      name:nameContact,
      number:numberTel,
    }

    setContacts(contacts => ([...contacts, contact]))
       
        evt.target.name.value = '';
        evt.target.number.value = '';
    };

    const deleteNumber = (id) => {
        const searchResults  = Object.values(contacts).filter(contact => contact.id !== id);
        setContacts(searchResults )
}

    const searchByName = (e) => {
        const nameInput = e.target.value.toLowerCase();
        const searchResults = contacts.filter(contact => contact.name.includes(nameInput));
        setFilter(nameInput);
      
}


  
         return (
             <>
                 <ContactForm Submit={handleSubmit} />
                 <Filter Search={searchByName} /> 
                <ContactList contacts={contacts} filter={filter}  deleteNumber={deleteNumber}  />
             </>
         )
    };


export default PhoneBook;