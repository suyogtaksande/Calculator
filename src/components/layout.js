import React, {useState} from 'react';
import './layout.css';
import Output from './output';

const Layout = (props) => {
    let [input, setInput] = useState('0')
    let [result, setResult] = useState('')
    let addClass = 'button'
    let numberOperators = ['C','DEL','%','/','7','8','9','*','4','5','6','-','1','2','3','+','0','.','=']
    const hancleClick =(event) => {
        const value = event.target.value;
        if (value === '=') {
            if (input !== '') {
                let res = ''
                try {
                    res = eval(input)
                } catch(err) {
                    setResult('Math Error')
                }
                if (res === undefined) {
                    setResult('Math Error')
                }
                else {
                    setResult(input + '=')
                    setInput(res)
                }
            }
        }
        else if (value === 'C') {
            setInput('0')
            setResult('')
        }
        else if (value === 'DEL') {
            let str = input
            str = str.substr(0, str.length-1)
            setInput(str)
        }
        else if (input === '0') {
            setInput(value)
        }
        else {
            setInput((input +=value))
        }
    }
    const calKeys = []
    for (const [i, element] of numberOperators.entries()) {
        if (element === 'C' || element === 'DEL') {
            addClass = "button clear"
        }
        else if (element === '%' || element === '/' || element === '*' || element === '-' || element === '+' || element === '.' || element === '=') {
            addClass = "button operator"
        }
        else if (element === '=') {
            addClass = "button equal-sign"
        }
        calKeys.push(<input className={addClass} value={element} onClick={hancleClick}  type='button'></input>)
        addClass = 'button'
    }
    return(
        <div className='frame'>
            <div className='calculator'>
                <br></br>
                <Output user={input} answer={result} />
                <img />
                <div className='keys'>
                    {calKeys}
                </div>
            </div>
        </div>
    )
};

export default Layout;