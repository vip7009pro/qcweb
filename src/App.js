import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main'
import './components/bootstrap.min.css'
import { checkLogin } from './Api/Api';
import LoginPage from './components/LoginPage/LoginPage';
function App() {  
  const [loginState, setloginState] = useState(0);
  useEffect(()=>{
    checkLogin().then(data=>
      {
        console.log(data);
        if(data.data.tk_status == 'ng')
        {
          setloginState(0);
        }
        else
        {
          setloginState(1);
        }
      })
      .catch(err=>{
        console.log(err+ ' ');
      })
  },[])
  console.log("Login State = " + loginState);
  if (loginState == 0) {
    return (
      <LoginPage />
    )
  }
  return (
    <>
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  ); 
}
export default App;
