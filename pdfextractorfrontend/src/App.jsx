
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Pdfupload from './components/Pdfupload';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Header/>
      <Dashboard/>
      <Footer/>
    
    </div>
  );
}

export default App;
