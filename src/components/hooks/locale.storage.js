import { useEffect,useState } from "react";

export default function useLocaleStorage(key, defaultValue) {
    const [contacts, setContacts] = useState(() => {
        return JSON.parse(window.localStorage.getItem(key) ?? defaultValue);
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(contacts))
    }, [contacts]);

    return [contacts,setContacts]
};