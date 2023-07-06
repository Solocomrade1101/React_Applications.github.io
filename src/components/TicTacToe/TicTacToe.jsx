import React from 'react';
import './TicTacToe.css'
const X = 'X';
const O = 'O';

const WINNING_PATTERNS = [
  7, 56, 448,	  // Horizontal
  73, 146, 292,	// Vertical
  273, 84			  // Cross
];

const Circle = () => (
  <svg className="pawn circle" viewBox="0 0 128 128">
    <path d="M64,16A48,48 0 1,0 64,112A48,48 0 1,0 64,16"/>
  </svg>
);

const Times = () => (
  <svg className="pawn times" viewBox="0 0 128 128">
    <path d="M16,16L112,112"/>
    <path d="M112,16L16,112"/>
  </svg>
);

class Line extends React.PureComponent {
  
  d() {
    const {pattern} = this.props;
    return {
      7: `M 0,5 H 100`,
      56: `M 0,50 H 100`,
      448: `M 0,95 H 100`,
      73: `M 5,0 V 100`,
      146: `M 50,0 V 100`,
      292: `M 95,0 V 100`,
      273: `M 0,0 L 100,100`,
      84: `M 100,0 L 0,100`,
    }[pattern];
  }
  
  render() {
    const {show} = this.props;
    return (
      <svg className={`line ${show ? 'visible' : ''}`} viewBox='0 0 100 100'>
        <path d={this.d()}/>
      </svg>
    );
  }
}

const Cube = ({value, onClick}) => (
  <div className={`cube ${value ? 'rotated' : ''}`} onClick={onClick} >
    {['top','bottom','left','right','front','back'].map(face => ( 
      <div className={face}>
        {face === 'back' && value === O && <Circle/>}
        {face === 'back' && value === X && <Times/>}
      </div>
    ))}
  </div>
);

const Row = ({children}) => <div className="row">{children}</div>

const Results = ({winner, draw, onPlayAgain}) => (
  <div className='results'>
    <div className='message'>
      <div className='symbol'>
        {winner === X && <Times/>}
        {winner === O && <Circle/>}
        {draw && <React.Fragment><Times/><Circle/></React.Fragment>}
      </div>
      <div className='text'>
        {winner ? 'Wins!' : 'Draw!'}
      </div>
    </div>
    <div className='replay' onClick={onPlayAgain}>Play Again</div>
  </div>
);

const Board = ({board, onClick}) => (
  <div className="board">
    {board.map((row, i) => (
      <Row>
        {row.map((col, j) => (
          <Cube value={col} onClick={() => onClick(i, j)}/>
        ))}
      </Row>
    ))}
  </div>
);

class TicTacToe extends React.PureComponent {
  
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  
  getInitialState() {
    return {
      player: X,
      patterns: {[X]: 0, [O]: 0},
      winner: null,
      rotated: false,
      board: [
        [null,null,null],
        [null,null,null],
        [null,null,null]
      ]
    };
  }
  
  handleOnClick = (i, j) => {
    if(null === this.state.board[i][j]) {
      const {player, board, patterns} = this.state;
      const state = {
        board: [...board],
        player: player === X ? O : X,
        patterns: {...patterns}
      };
      
      // Set the value in the board
      state.board[i][j] = player;
      
      // Add the value to the player pattern using bitwise OR
      state.patterns[player] = state.patterns[player] |= Math.pow(2,(i*3+j));
      
      state.winner = this.checkForWin(state.patterns);
      
      this.setState(state);
      
      if(state.winner || this.isBoardFull(board)) {
        setTimeout(() => {
          this.setState({rotated: true});
        }, 1500);
      }
    }
  };

  checkForWin(patterns) {
    // Loop through all possible winning sets
		for(let i = 0; i < WINNING_PATTERNS.length; i++) {
			// Use bitwise AND to determind if the player's score
			// Holds a winning combination
			if((WINNING_PATTERNS[i] & patterns[X]) === WINNING_PATTERNS[i])
				return X;
			if((WINNING_PATTERNS[i] & patterns[O]) === WINNING_PATTERNS[i])
				return O;
		}
		// No winner
		return false;
  }

  isBoardFull(board) {
    return !this.state.board.some((row, i) => {
      return row.some((col, j) => null === col)
    })
  }

  handleOnPlayAgain = () => {
    this.setState({rotated: false});
    setTimeout(() => {
      this.setState(this.getInitialState());
    }, 1000);
  };

  getWinningPattern() {
    const {winner, patterns} = this.state;
    return WINNING_PATTERNS.find(pattern => (pattern & patterns[winner]) === pattern);
  }
  
  render() {
    const {board, winner, rotated} = this.state;
    return (
      <div className='block'>
        <div className={`game ${rotated ? 'rotated' : ''}`}>
          <Results winner={winner} draw={!winner && this.isBoardFull(board)} onPlayAgain={this.handleOnPlayAgain}/>
          <Line show={winner} pattern={this.getWinningPattern()}/>
          <Board board={board} onClick={this.handleOnClick}/>
        </div>
      </div>
    );
  }
}

export default TicTacToe;