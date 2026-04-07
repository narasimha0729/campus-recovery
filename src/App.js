
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginComponent/LoginPage';
import RegisterUser from './Components/LoginComponent/RegisterUser';
import AdminMenu from './Components/LoginComponent/AdminMenu';
import StudentMenu from './Components/LoginComponent/StudentMenu';
import LostItemRegistration from './Components/ItemComponents/LostItemRegistration';

import LostItemReport from './Components/ItemComponents/LostItemReport';
import FoundItemRegistration from './Components/ItemComponents/FoundItemRegistration';
import FoundItemReport from './Components/ItemComponents/FoundItemReport';
import MatchItemReport from './Components/ItemComponents/MatchItemReport';
import MatchItemSearch from './Components/ItemComponents/MatchItemSearch';
import PersonalDetails from './Components/LoginComponent/PersonalDetails';
import StudentShow from './Components/LoginComponent/StudentShow';
import MatchFoundItemSearch from './Components/ItemComponents/MatchFoundItemSearch';
import ChatMessage from './Components/ChatComponent/ChatMessage';
import UserReport from './Components/LoginComponent/UserReport';
import StudentReport from './Components/LoginComponent/StudentReport';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<RegisterUser />} />
          <Route path='/admin-menu' element={<AdminMenu />} />
          <Route path='/student-menu' element={<StudentMenu />} />
          <Route path='/lost-entry' element={<LostItemRegistration/>}/>
           <Route path='/lost-list' element={<LostItemReport/>}/>
           <Route path='/found-entry' element={<FoundItemRegistration />} />
            <Route path='/found-list' element={<FoundItemReport />} />
             <Route path='/match-list' element={<MatchItemReport />} />
             <Route path='/search/:bid' element={<MatchItemSearch/>}/>
             <Route path='/personal-details' element={<PersonalDetails />} />
             <Route path='/student-show' element={<StudentShow />} />
             <Route path='/user-list' element={<UserReport />} />
             <Route path='/match/:foundItemId' element={<MatchFoundItemSearch />} />
             <Route path='/chat' element={<ChatMessage />} />
             <Route path='/student-repo' element={<StudentReport/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
