import { UseStateComponent } from './components/UseState';
import { ClassStateComponent } from './components/ClassState';
import './App.css';

function App() {
  return (
    <div className="App">
      <UseStateComponent name='UseStateComponent' />
      <ClassStateComponent name='ClassStateComponent'/>
    </div>
  );
}

export default App;
