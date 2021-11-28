import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';
import ChatPanel from './components/Chat/ChatPanel';
import Notification from './components/Notification/Notification';

function App() {
  return (
    <>
      <div>
        <Header />    
        <ChatPanel/> 
        <Notification/>
        <Body />
        <Footer />
      </div>
    </>
  );
}

export default App;
