import { useEffect, useState } from 'react'
import style from './App.module.css'

const BUTTONS = [
	'7',
	'8',
	'9',
	'/',
	'4',
	'5',
	'6',
	'*',
	'1',
	'2',
	'3',
	'-',
	'C',
	'0',
	'=',
	'+',
]

function App() {
	const { calculator, display, keypad, input, operatorCSS, clear, equal, result } = style
	const [operand1, setOperand1] = useState('')
	const [operator, setOperator] = useState('')
	const [operand2, setOperand2] = useState('')
	const [inResult, setInResult] = useState(false)

	useEffect(() => {
		document.addEventListener('keydown', onKeypress)

		return () => {
			document.removeEventListener('keydown', onKeypress)
		}
	})

	const onKeypress = (e) => {
		const { key } = e
		if (BUTTONS.includes(key) || key === 'Delete' || key === 'Enter') {
			if (!inResult || key === 'Delete') {
				handleClick({ target: { innerText: key } })
			}
		}
	}

	const handleClick = (e) => {
		const { innerText } = e.target

		if (Number(innerText) || innerText === '0') {
			if (operator !== '') {
				setOperand2(operand2 + innerText)
			} else {
				setOperand1(operand1 + innerText)
			}
		}

		if (innerText === 'C' || innerText === 'Delete') {
			setOperand1('')
			setOperator('')
			setOperand2('')
			setInResult(false)
		}

		if (['+', '-', '*', '/'].includes(innerText)) {
			if (operator === '' || operand2 === '') {
				setOperator(innerText)
			}
		}

		if (innerText === '=' || innerText === 'Enter') {
			if (operand1 !== '' && operand2 !== '') {
				setInResult(true)

				console.log(operand1, operator, operand2)

				switch (operator) {
					case '+':
						setOperand1(+operand1 + +operand2)
						break
					case '-':
						setOperand1(+operand1 - +operand2)
						break
					case '*':
						setOperand1(+operand1 * +operand2)
						break
					case '/':
						setOperand1(
							+operand1 % +operand2 === 0
								? +operand1 / +operand2
								: (+operand1 / +operand2).toFixed(5),
						)
						break
					default:
						break
				}
				setOperator('')
				setOperand2('')
			}
		}
	}

	return (
		<>
			<div className='App'>
				<div className={calculator}>
					<div className={display}>
						<input
							className={input + ' ' + `${inResult ? result : null}`}
							type='text'
							value={operand1 + operator + operand2}
							placeholder='0'
							disabled
						/>
					</div>
					<div className={keypad} onClick={handleClick}>
						{BUTTONS.map((num) => (
							<button
								className={
									num === '='
										? equal
										: num === 'C'
										? clear
										: ['+', '-', '*', '/'].includes(num)
										? operatorCSS
										: null
								}
								key={num}
								disabled={inResult && num !== 'C'}
							>
								{num}
							</button>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default App
