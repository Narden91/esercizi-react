import React, {useEffect, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {IUsers} from "../../interfaces";
import {UserList} from "./UserList";
import {UserLayout} from "./UserLayout";

interface IUsersPageStateProps {
  users: IUsers[];
  usersToRender: IUsers[];
  isLoading: boolean;
  inputSearch: string;
  modifyUser: IModifyUser;
}

interface IModifyUser {
  id: number;
  name: string;
}

const initialState: IUsersPageStateProps = {
  users: [],
  usersToRender: [],
  isLoading: true,
  inputSearch: '',
  modifyUser: {
    id: 0,
    name: ''
  }
};

export const UserPage: React.FC = () => {
  const [state, setState] = useState<IUsersPageStateProps>(initialState);

  useEffect(() => {
    // fetch dei dati
    axios
        .get<IUsers[]>("https://jsonplaceholder.typicode.com/users")
        .then((res: AxiosResponse<IUsers[]>) => {
          const response = res.data;
          // Salvataggio dei dati nell'array dello stato
          setState({...state, users: response, usersToRender: response, isLoading: false});
      })
  }, []);

  // Funzione per la ricerca del nome
  const inputSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const arrayUpdated = state.users.filter(user => {
      //faccio in modo che la ricerca non sia case sensitive 
      // const nameToSearch = user.name.toLowerCase();
      //faccio in modo che la ricerca sia case sensitive    
      const nameToSearch = user.name;
      return nameToSearch.indexOf(event.target.value) > -1
    });

    setState((_state) => (
      {..._state, inputSearch: event.target.value, usersToRender: arrayUpdated}
    ))
  };

  // Funzione per la selezione del singolo utente dalla lista contenuta nel container figlio UserList
  const onSelectUserHandler = (user: IUsers) => {
    setState((_state) => ({..._state, modifyUser: {id: user.id, name: user.name}}));
  };

  return (
      // <h3 className="p-2">PetsPage</h3>
      <UserLayout>
        <form className="card p-2" >
          <section>
            <h3 className="p-2"> User Page </h3>

            <div className="mb-3 p-2">
              <label className="form-label">Search: </label>
              <input 
                type="text" 
                className="form-control" 
                id="userSearchInput" 
                placeholder="Name "
                value={state.inputSearch}
                onChange={inputSearchHandler}
              />
            </div>

            <div className="mb-3 p-2">
              <label className="form-label">Selected User: </label>
              <input 
                type="text" 
                className="form-control" 
                id="userSelectedOutput" 
                value={state.modifyUser.name}
              />
            </div>
            
          </section>

        </form>
        
        <UserList
          users={state.usersToRender}
          selectedUser={state.modifyUser}
          isLoading={state.isLoading}
          onSelectUser={onSelectUserHandler}
        />

      </UserLayout>
  )};
