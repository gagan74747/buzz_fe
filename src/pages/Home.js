/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
import { createContext, useState } from 'react';
import Navbar from '../components/Navbar';
import Feed from '../components/Feed';
import FriendsContext from '../components/FriendsContext';

const userContext = createContext();
export { userContext };

function Home() {
  const [user, setUser] = useState({ profile_img: '', is_Admin: false, user_id: '' });
  const update = (profile_img, is_Admin, user_id) => {
    setUser({ profile_img, is_Admin, user_id });
  };
  return (
    <userContext.Provider value={{ user, update }}>
      <Navbar />
      <FriendsContext />
      <Feed />
    </userContext.Provider>
  );
}

export default Home;
