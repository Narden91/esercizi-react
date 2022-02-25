import React, {useRef, useState} from 'react';
import {IFormHelloProps} from "../interfaces";

const intialFormState: IFormHelloProps = {
  name: '',
  surname: ''
};


export const Hello: React.FC = () => {
    // Controlled Form
    const [form, setForm] = useState<IFormHelloProps>(intialFormState);
    
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [event.target.name]: event.target.value})
      };
    
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Oggetto eventualmente da inviare al Backend
        const objToDisplay = {
            NAME: form.name,
            SURNAME: form.surname
        }
        
        // Check se sono state inserite informazioni corrette
        if (validateInput(form.name) && validateInput(form.surname)){
            alert(`Ciao ${form.name} ${form.surname}`);
        } else{
            alert(` Hai inserito informazioni sbagliate`);
        }
    }

    // Funzione per effettuare il check di nome e cognome (almeno 3 lettere)
    const validateInput = (input: string) => {
        let re = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,}$/
        return String(input).toLowerCase().match(re);
      };

    return (
        <form className="card p-2" onSubmit={onSubmit}>
          <h3 className="p-2"> Info Input Page </h3>
          <label className="input-group p-2">
            <span className="input-group-text">Name</span>
            <input name="name" type="text" className={`form-control ${validateInput(form.name) ? 'is-valid' : ''}`}
                   value={form.name} onChange={onChangeHandler}/>
          </label>
    
          <label className="input-group p-2">
            <span className="input-group-text">Surname</span>
            <input name="surname" className={`form-control ${validateInput(form.surname) ? 'is-valid' : ''}`}
                   value={form.surname} onChange={onChangeHandler}/>
          </label>
            
          <div >
            <button type="submit" className="btn btn-info ml-10"> Display Submitted Info </button>
          </div>
        </form>
    );
}

