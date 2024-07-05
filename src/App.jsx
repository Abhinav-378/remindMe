//components
import Header from './components/Header/Header';
import SignedIn from './components/Main/SignedIn';
import SignedOut from './components/Main/SignedOut';

import {
  useSession,
} from "@supabase/auth-helpers-react";

//css
import './App.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import './CustomDateTimePicker.css';
import './CustomClock.css'; // Import your custom CSS file for Clock


function App() {
  const session = useSession();  
  return (
    <>
    <Header/>
    <div id="container">
      <div style={{minWidth:"400px"}}>
        {session ? (
          <SignedIn />
        ) : (
          // <button onClick={() => googleSignIn()}>Sign in with Google</button>
          <SignedOut />
        )}
      </div>

    </div>
    </>
    
  );
}

export default App;
