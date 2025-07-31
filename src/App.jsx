import './App.css'
import React, { useState} from 'react';


function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [lastPressedEquals, setLastPressedEquals] = useState(false);

  const clearInput = () => {
    setInput('');
    setResult(0);
  };
  const backInput = () => {
    setInput(input.slice(0, -1));
  };
  const isOperator = (v) => ['+', '-', '*', '/'].includes(v);
  const plus = (value) => {
    if (lastPressedEquals) {
      if (isOperator(value)) {
        setInput(result + value);
        setLastPressedEquals(false);
        return;
      } else {
        setInput(value === '.' ? '0.' : value);
        setResult('');
        setLastPressedEquals(false);
        return;
      }
    }

    if (input === '') {
      if (value === '.') {
        setInput('0.');
      } else if (isOperator(value)) {
        if (value === '-') {
          setInput('-');
        }
      } else {
        setInput(value);
      }
      return;
    }

    const lastNumberMatch = input.match(/([\d.]+)$/);
    const lastNumber = lastNumberMatch ? lastNumberMatch[0] : '';
    if (value === '.') {
      if (lastNumber.includes('.')) return;
      setInput(input + value);
      return;
    }

    if (/([\D]|^)(0{2,}\d*)$/.test(input + value)) {
      return;
    }
    if (lastNumber === '0' && /[0-9]/.test(value) && value !== '.') {
      setInput(input.slice(0, -1) + value);
      return;
    }

    if (isOperator(value)) {
      if (isOperator(input.slice(-1))) {
        let newInput = input;
        while (isOperator(newInput.slice(-1))) {
          newInput = newInput.slice(0, -1);
        }
        if (value === '-' && isOperator(input.slice(-1)) && input.slice(-1) !== '-') {
          setInput(input + value);
        } else {
          setInput(newInput + value);
        }
      } else {
        setInput(input + value);
      }
      return;
    }

    setInput(input + value);
  };
  const calculate = () => {
    try {
      let exp = input;
      while (exp && isOperator(exp.slice(-1)) && !(exp.slice(-1) === '-' && isOperator(exp.slice(-2, -1)))) {
        exp = exp.slice(0, -1);
      }
      if (!exp) return;
      const evalResult = eval(exp);
      setResult(evalResult);
      setHistory([...history, { expression: exp, result: evalResult }]);
      setInput('');
      setLastPressedEquals(true);
    } catch {
      setResult('Error');
    }
  };
    

  return (
  <div className="All">
    <div className="container">
        <div className="display">
            <div className="input">
                <span className="input-text" id='display'>{input === '' ? result : input}</span>
            </div>
            <div className="result">
                <span className="result-text">{result}</span> 
            </div>
        </div>
        <div className="history">
            <h2>History</h2>
            <ul>
                {history.map((item, index) => (
                    <li key={index}>
                        <span className="expression">{item.expression}</span> = 
                        <span className="result">{item.result}</span>
                    </li>
                ))}
            </ul>
        </div>
            <div className="all">
                <button onClick={clearInput} id='clear'>AC</button>
                <button onClick={backInput} id='back'>C</button>
                <button onClick={() => plus('/')} className="operator" id='divide'>/</button>
                <button onClick={() => plus('*')} className="operator" id='multiply'>*</button>
                <button onClick={() => plus('7')} className="number" id='seven'>7</button>
                <button onClick={() => plus('8')} className="number" id='eight'>8</button>
                <button onClick={() => plus('9')} className="number" id='nine'>9</button>
                <button onClick={() => plus('-')} className="operator" id='subtract'>-</button>
                <button onClick={() => plus('4')} className="number" id='four'>4</button>
                <button onClick={() => plus('5')} className="number" id='five'>5</button>
                <button onClick={() => plus('6')} className="number" id='six'>6</button>
                <button onClick={() => plus('+')} className="operator" id='add'>+</button>
                <button onClick={() => plus('1')} className="number" id='one'>1</button>
                <button onClick={() => plus('2')} className="number" id='two'>2</button>
                <button onClick={() => plus('3')} className="number" id='three'>3</button>
                <button onClick={calculate} className="operator" id='equals'>=</button>
                <button onClick={() => plus('0')} className="number" id='zero'>0</button>
                <button onClick={() => plus('.')} className="number" id='decimal'>.</button>
                
                

            </div>
        </div>
  </div>
);

}

export default App
