import React, { useState, useEffect } from 'react'
import './App.css';
import DeskSvg from './components/DeskSvg'
import postits from './postits.png'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (text) => {
    const task = tasks.push(input)
    setInput('')
    tasks.concat(task)
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    setInput(e.target.value)
  };

  const listTasks = tasks.map((task, i) =>
    <div className='post-it' key={i}>
      <div>{task}</div>
    </div>
  )

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    if (isActive === false) {
      setIsActive(true);
      setIsPaused(false);
    }
    else {
      setIsPaused(!isPaused);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  return (
    <div className="App">

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h2>Enter a short line of text</h2>
              <input type="text" onChange={handleInputChange} maxLength={20} />
              <div className="modal-buttons">
                <button onClick={handleCloseModal}>Cancel</button>
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="tack-board-container" style={{ display: "flex" }}>
        {tasks &&
          listTasks
        }
      </div>

      <div className="desk-container">
        <div className="desk-items">

          <div className="timer">
            <div className="timer-display">
              <span className="digits">
                {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
              </span>
              <span className="digits">
                {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
              </span>
              <span className="digits mili-sec">
                {("0" + ((time / 10) % 100)).slice(-2)}
              </span>
            </div>
            <div className="button-start-resume">
              <div className="button" onClick={handleStart}></div>
            </div>
            <div className="button-reset">
              <div className="button" onClick={handleReset}></div>
            </div>
          </div>
          <div className='postits' onClick={handleOpenModal}>
            <img src={postits} alt="stack of post it notes" />
          </div>
        </div>
        <div>
          <DeskSvg />
        </div>
        {/* <div className="corner-top-both-bevel"></div> */}
      </div>
    </div>
  );
}

export default App;
