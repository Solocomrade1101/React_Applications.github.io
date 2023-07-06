import React from 'react';
import casinoStyles from './Casino.module.css'
import corona from '../../img/corona.png'

function RepeatButton(props) {

  return (
    <div  onClick={props.onClick} className={casinoStyles.button_block}>
      <button className={casinoStyles.button}>Начать заново</button>
    </div>
  );
}

function WinningSound() {
  return (
  <audio autoplay="autoplay" className={casinoStyles.player} preload="false">
    <source src="https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav" />
  </audio>  
  );
}

class Casino extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null
    }
    this.finishHandler = this.finishHandler.bind(this)
    this.handleClick = this.handleClick.bind(this);
  }  

  handleClick(e) { 
    e.currentTarget.classList.add(`${casinoStyles.lever_arm_an}`);
    setTimeout(removeClass, 700, e)
    function removeClass(ex){
      ex.target.closest('div').classList.remove(`${casinoStyles.lever_arm_an}`)
    }


    this.setState({ winner: null });
    this.emptyArray();
    this._child1.forceUpdateHandler();
    this._child2.forceUpdateHandler();
    this._child3.forceUpdateHandler();
  }

  static loser = 'YOU LOST!';

  static matches = [];

  finishHandler(value) {
    Casino.matches.push(value);  

    if (Casino.matches.length === 3) {
      const { winner } = this.state;
      const first = Casino.matches[0];
      let results = Casino.matches.every(match => match === first)
      this.setState({ winner: results });
    }
  }

  emptyArray() {
    Casino.matches = [];
  }

  render() {
    const { winner } = this.state;
    const getLoser = () => {       
      return (
        <span style={{color: 'red', textShadow: 'none'}}>{Casino.loser}</span>
      )
      
    }
    let repeatButton = <RepeatButton onClick={this.handleClick} />
    let winningSound = null;

    
    
    
    if (winner) {
      winningSound = <WinningSound />
    }

    return (
      <div className={casinoStyles.block}>
        {winningSound}
        <div className={casinoStyles.title_block}>
          <h1 className={casinoStyles.title} style={{ color: `${winner === null ? 'white' : winner ? 'gold' : getLoser()}`}}>
            <span>{winner === null ? 'Waiting…' : winner ? ' WIN! ' : getLoser()}</span>
          </h1>
        </div>
        <div className={casinoStyles.corona}>
          <img className={casinoStyles.corona_img} src={corona} alt="corona" />
          
        </div>
        <div className={casinoStyles.arcs}>
          <div className={casinoStyles.spinner_block}>
            <div className={casinoStyles.spinner_container}>
              <Spinner onFinish={this.finishHandler} ref={(child) => { this._child1 = child; }} timer="1000" />
              <Spinner onFinish={this.finishHandler} ref={(child) => { this._child2 = child; }} timer="1400" />
              <Spinner onFinish={this.finishHandler} ref={(child) => { this._child3 = child; }} timer="2200" />
            </div>
          </div>
        </div>
        <h1 className={casinoStyles.subtitle}>Casino</h1>
        {repeatButton}    
        
      </div>
      
    );
  }
}  
  
class Spinner extends React.Component {  
  constructor(props){
    super(props);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  };

  forceUpdateHandler(){
    this.reset();
  }; 

  reset() {
    if (this.timer) { 
      clearInterval(this.timer); 
    }  

    this.start = this.setStartPosition();

    this.setState({
      position: this.start,
      timeRemaining: this.props.timer        
    });

    this.timer = setInterval(() => {
      this.tick()
    }, 100);      
  }

  state = {
    position: 0,
    lastPosition: null
  }
  static iconHeight = 124;
  multiplier = Math.floor(Math.random()*(4-1)+1);

  start = this.setStartPosition();
  speed = Spinner.iconHeight * this.multiplier;    

  setStartPosition() {
    return ((Math.floor((Math.random()*9))) * Spinner.iconHeight)*-1;
  }

  moveBackground() {
    this.setState({ 
      position: this.state.position - this.speed,
      timeRemaining: this.state.timeRemaining - 100
    })
  }

  getSymbolFromPosition() {
    let { position } = this.state;
    const totalSymbols = 9;
    const maxPosition = (Spinner.iconHeight * (totalSymbols-1)*-1);
    let moved = (this.props.timer/100) * this.multiplier
    let startPosition = this.start;
    let currentPosition = startPosition;    
    console.log(Spinner)
    for (let i = 0; i < moved; i++) {              
      currentPosition -= Spinner.iconHeight;

      if (currentPosition < maxPosition) {
        currentPosition = 0;
      }      
    }

    this.props.onFinish(currentPosition);
  }

  tick() {      
    if (this.state.timeRemaining <= 0) {
      clearInterval(this.timer);        
      this.getSymbolFromPosition();    

    } else {
      this.moveBackground();
    }      
  }

  componentDidMount() {
    clearInterval(this.timer);

    this.setState({
      position: this.start,
      timeRemaining: this.props.timer
    });

    this.timer = setInterval(() => {
      this.tick()
    }, 80);

    
  }

  render() {
    let { position, current } = this.state;   

    return (            
      <div 
        style={{backgroundPosition: '-3px ' + position + '118px'}}
        className={casinoStyles.icons}          
      />
    )
  }
}

export default Casino