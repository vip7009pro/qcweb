import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main'
import './components/bootstrap.min.css'
import { checkLogin } from './Api/Api';
import LoginPage from './components/LoginPage/LoginPage';
import { UserContext } from "./Context"
import './components/dataTables.bootstrap4.min.css'
function App() {
  const [loginState, setloginState] = useState(0);
  const [userdata, setUserData] = useState("okma");
  useEffect(() => {
    checkLogin().then(data => {
      console.log(data);
      if (data.data.tk_status == 'ng') {
        setloginState(0);
        setUserData(data.data.data);
      }
      else {
        setloginState(1);
        console.log(data.data.data);
        setUserData(data.data.data);
      }
    })
      .catch(err => {
        console.log(err + ' ');
      })
  }, []);
  console.log("Login State = " + loginState);
  if (loginState == 1) {
    return (
      <>
        <div>
          <UserContext.Provider value={[userdata, setUserData]}>
            <Header />
            <Main />
            <Footer />
          </UserContext.Provider>
        </div>
      </>
    );
  }
  return (
    <LoginPage />
  )
}
export default App;
