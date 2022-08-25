import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import CharacterList from './pages/CharacterList'
import Character from './pages/Character'
import Layout from './components/Layout'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
            <Route path='/' element={<CharacterList/>} />
            <Route path='/character/:characterId' element={<Character/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;