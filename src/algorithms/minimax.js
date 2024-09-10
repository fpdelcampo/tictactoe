function countMoves(values) {
    var move = 0
    for(let i = 0; i<9; i++) {
        if(values[i] !==0 ){
            move += 1
        }
    }
    return move
}

export function evaluate(values) {
    var res = -2
    const move = countMoves(values)
    for(let i = 0; i<3; i++) {
        if(values[i] !== 0 && values[i] === values[i + 3] && values[i+3] === values[i + 6]) {
            res = values[i]
        }
    }
    for(let i = 0; i<3; i++) {
        if(values[3 * i] !== 0 && values[3 * i] === values[3 * i + 1] && values[3 * i + 1] === values[3 * i + 2]) {
            res = values[3 * i]
        }
    }
    if(values[0] !== 0 && values[0] === values[4] && values[4] === values[8]) {
        res = values[4]
    }
    if(values[2] !== 0 && values[2] === values[4] && values[4] === values[6]) {
        res = values[4]
    }
    if(move === 9 && res === -2) {
        res = 0
    }
    return res
}

function minimax(values, isMaximizing) {

    var evaluation = evaluate(values)
    if(evaluation !== -2) {
        return evaluation
    }
    if(isMaximizing) {
        let best = -Infinity
        for(let i = 0; i < 9; i++) {
            if(values[i] === 0) {
                values[i] = 1
                let score = minimax(values, false)
                values[i] = 0
                best = Math.max(best, score)
            }
        }
        return best
    }
    else {
        let best = Infinity
        for(let i = 0; i < 9; i++) {
            if(values[i] === 0) {
                values[i] = -1
                let score = minimax(values, true)
                values[i] = 0
                best = Math.min(best, score)            
            }
        }
        return best
    }
}

export function findBestMove(values) {
    const move = countMoves(values)
    const isMaximizing = move % 2 === 0
    let bestMove = null
    let bestScore = isMaximizing ? -Infinity : Infinity
    for(let i = 0; i < 9; i++) {
        if(values[i] === 0) {
            values[i] = isMaximizing ? 1 : -1
            let score = minimax(values, !isMaximizing)
            values[i] = 0
            if(isMaximizing && score > bestScore) {
                bestScore = score
                bestMove = i
            }
            if(!isMaximizing && score < bestScore) {
                bestScore = score
                bestMove = i
            }
            console.log("Move " + i + "; score " + score)
        }
    }
    console.log('Best move: ' + bestMove + '; best score: ' + bestScore)
    return bestMove
}