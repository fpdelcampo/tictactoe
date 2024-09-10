import { useEffect, useState } from 'react';
import Board from './components/Board';
import {evaluate, findBestMove} from './algorithms/minimax'

function App() {

	const [values, setValues] = useState(Array(9).fill(0))
	const [toggle, setToggle] = useState('X')
	const [move, setMove] = useState(0)
	const [state, setState] = useState(-2)

	function toggleButton() {
		setToggle((toggle) => toggle === 'X' ? 'O' : "X")
	}
	
	function onMove(index) {
		if(values[index] !== 0 || state !== -2) {
			return
		}
		const newValues = values.slice()
		newValues[index] = move % 2 ? -1 : 1
		setValues(newValues)
		setMove((move) => move + 1)
	}

	function display() {
		if(state === 0) {
			return "It's a tie!"
		}
		if(state === 1) {
			return "X wins!"
		}
		if(state === -1) {
			return "O wins"
		}
	}

	function reset() {
		setValues(Array(9).fill(0))
		setState(-2)
		setMove(0)
	}

	useEffect(() => {
		const evaluation = evaluate(values)
		if(evaluation === -2 && move % 2 === (toggle === 'X' ? 1 : 0)) {
			const bestMove = findBestMove(values)
			if(bestMove !== -1) {
				const newValues = values.slice()
				newValues[bestMove] = move % 2 ? -1 : 1
				setValues(newValues)
				setMove((move) => move + 1)
			}
		}
		setState(evaluation)
	}, [values, move, toggle])

  	return (
		<>
			<div className='bg-orange-100 h-screen'>
				<p className='py-20 text-center text-3xl font-bold'>TicTacToe!</p>
				<div className='flex flex-col justify-center items-center'>
					<Board squares={values} onMove={onMove}></Board>
					<p className='mb-20 font-bold text-xl'>Playing as {toggle}</p>
					<div
						onClick={toggleButton}
						className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all transition-colors duration-300 ${
							toggle === "X" ? 'bg-green-500' : 'bg-gray-400'
						}`}>
		
						<div
							className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
							toggle === "X"? 'translate-x-7' : 'translate-x-0' // Ball moves based on toggle state
						}`}></div>
					</div>
					{state !== -2 && 
						<div className='mt-20'>
							<div className='font-bold text-xl text-center py-10'>{display()}</div>
							<button className='bg-gray-100 h-10 w-40 border border-black rounded-lg' onClick={reset}>Play Again!</button>
						</div>
					} 
				</div>
			</div>
		</>
  	);
}
export default App;