import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';
import ChatPanel from './components/Chat/ChatPanel';
import Notification from './components/Notification/Notification';
import ChatButton from './components/ChatButton/ChatButton';
import './components/bootstrap.min.css'

function App() {
  return (
    <>
      <div>        
        <Header />    
        <ChatPanel/> 
        <ChatButton/>
        <Notification/>
        <Body />
        <Footer />        
      </div>
    </>
  );
}

export default App;
