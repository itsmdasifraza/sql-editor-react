import './App.css';
import { Route, Routes } from "react-router-dom"
import {SqlEditor} from './pages/SqlEditor/SqlEditor';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SqlEditor/>} />
      </Routes>
    </>
  );
}

export default App;
