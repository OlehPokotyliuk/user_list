import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';
import { useState } from 'react';
import { useEffect } from 'react';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [success, setSuccess] = useState(false);
  const [invites, setInvites] = useState([]);
  useEffect(()=>{
    fetch('https://reqres.in/api/users')
    .then(res=> res.json())
    .then(json=>{
      setUsers(json.data);
    }).catch(err => {
      console.warn(err);
      alert('Ошибка при получении данных');
    }).finally(()=>{
      setIsloading(false);
    })
  }, [])
  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  }
  const onClickInvite = (id) =>{
    if(invites.includes(id)){
      setInvites(prev => prev.filter(_id => _id !== id))
    }else{
      setInvites(prev => [...prev, id]);
    };
  }
  const onClickSendInvites = () => {
    setSuccess(true);
  }

  return (
    <div className="App">
      {
        success ? (
        <Success count={invites.length}/>
        ) : (
          <Users 
          searchValue={searchValue} 
          items={users} 
          isLoading={isLoading} 
          invites={invites}
          onClickInvite={onClickInvite}
          onChangeSearchValue={onChangeSearchValue}
          onClickSendInvites={onClickSendInvites}
        />
        )
      }
      
    </div>
  );
}

export default App;
