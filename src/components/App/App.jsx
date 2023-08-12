import Header from '../Header/Header';
import Footer from '../Home/Footer/Footer';
import './App.css';
import Routing from "../../Routing";
import {AuthProvider} from "../AuthProvider/AuthProvider";



export default function App() {

  return (
    <div className='App'>

    <AuthProvider>
      <Header />
      <Routing />
      <Footer />

    </AuthProvider>

    </div>
  );
};
