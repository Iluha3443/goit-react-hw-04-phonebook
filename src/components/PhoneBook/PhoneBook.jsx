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
        setContacts(prevState => ({
            contacts: [...prevState.contacts, { id: nanoid(), name: nameContact, number: numberTel }]
        }));
       
        evt.target.name.value = '';
        evt.target.number.value = '';
    };

 const deleteNumber = (id) => {
  setContacts(prevState => ({
    ...prevState,
    contacts: prevState.contacts.filter(contact => contact.id !== id)
  }));
}

  const  searchByName = (e) => {
        const nameInput = e.target.value.toLowerCase();
        const searchResults = contacts.filter((contact) => contact.name.toLowerCase().includes(nameInput));
       
        if (searchResults.length > 0) {
            setFilter(nameInput);
        }   
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