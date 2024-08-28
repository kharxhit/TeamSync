import React from 'react';
import ReactDOM from 'react-dom';
import { AuthContextProvider } from './context/authContext';
import { BoardProvider} from './context/boardContext';
import './index.css'
import App from './App';
import { TaskProvider } from './context/taskContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthContextProvider>
      <BoardProvider>
        <TaskProvider>
      <App />
      </TaskProvider>
      </BoardProvider>
      </AuthContextProvider>
  </React.StrictMode>
);

