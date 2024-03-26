import { UseStateComponent } from './components/UseState';
import { ClassStateComponent } from './components/ClassState';
import './App.css';
import { UseReducerComponent } from './components/UseReducer';

function App() {
  return (
    <div className="App">
      <UseStateComponent name='UseStateComponent' />
      <ClassStateComponent name='ClassStateComponent'/>
      <UseReducerComponent name='UseReducerComponent'/>
    </div>
  );
}

export default App;
