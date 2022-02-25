import React from 'react';
import {IUsers,IModifyUser} from "../../interfaces";

interface IUserList {
  users: IUsers[];
  selectedUser: IModifyUser;
  isLoading?: boolean
  onSelectUser: (user: IUsers) => void;
}

export const UserList: React.FC<IUserList> = (
  {
    users,
    selectedUser,
    isLoading = true,
    onSelectUser
  }
) => {

  function setBackgroundIdSelected(userId: number, userIdToCheck: number) {
    return userId == userIdToCheck ? 'bg-dark text-white' : ''
  }

  return (
    <div className="list-group p-2 align-items-center ">
      {
        isLoading ?
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div> : 
          <>
            {
              users.map((user: IUsers) => {
                return (
                <section 
                key={user.id}  
                className={`list-group-item m-2 w-100 ${setBackgroundIdSelected(user.id, selectedUser.id)} `}
                onClick={() => onSelectUser(user)}
                >
                  <div className="d-flex align-items-center cursor-pointer ">
                    <span className="ml-10"> {user.name} </span>
                    <span className="badge rounded-pill bg-secondary ml-10">{user.email}</span>
                    <span className="badge rounded-pill bg-info ml-10">{user.company.name}</span>
                  </div>
                </section>)
              })
            }
          </>
      }
    </div>
  );
};
