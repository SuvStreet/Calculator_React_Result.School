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
	const {
		calculator,
		display,
		keypad,
		input,
		operatorCSS,
		clear,
		equal,
		result,
		smallFontSize17,
	} = style

	const [operand1, setOperand1] = useState('')
	const [operator, setOperator] = useState('')
	const [operand2, setOperand2] = useState('')
	const [inResult, setInResult] = useState(false)
	const [fontSize, setFontSize] = useState(false)

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

		enteringNumbers(innerText)
		enterClear(innerText)
		enteringOperators(innerText)
		enteringResult(innerText)
	}

	function enteringNumbers(num) {
		if (Number(num) || num === '0') {
			if (operator !== '') {
				if (operand2 === '' && num === '0') return
				if (operand2.length <= 9) {
					setOperand2(operand2 + num)
				}
			} else {
				if (operand1 === '' && num === '0') return
				if (operand1.length <= 9) {
					setOperand1(operand1 + num)
				}
			}
		}

		if ((operand1 + operator + operand2).length >= 14) {
			setFontSize(true)
		}
	}

	function enterClear(clear) {
		if (clear === 'C' || clear === 'Delete') {
			setOperand1('')
			setOperator('')
			setOperand2('')
			setInResult(false)
			setFontSize(false)
		}
	}

	function enteringOperators(op) {
		if (['+', '-', '*', '/'].includes(op)) {
			if (operator === '' || operand2 === '') {
				setOperator(op)
			}
		}
	}

	function enteringResult(result) {
		if (result === '=' || result === 'Enter') {
			if (operand1 !== '' && operand2 !== '') {
				setInResult(true)

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
						setFontSize(false)
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
							className={
								input +
								' ' +
								`${inResult ? result : ''}` +
								' ' +
								`${fontSize ? smallFontSize17 : ''}`
							}
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
