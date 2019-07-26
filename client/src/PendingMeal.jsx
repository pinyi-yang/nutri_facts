import React from 'react';
import PendingMealNutri from './PendingMealNutri';

class PendingMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewpoint: 0
    }
    this.handleLastPageClick = this.handleLastPageClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
  }

  preventBubbling(e) {
    e.stopPropagation();
  }

  handleNextPageClick() {
    let max = this.props.pendingMeal.length;
    max = max > 4 ? max - 4 : 0;
    let current = this.state.viewpoint;
    if (current < max) {
      this.setState({
        viewpoint: current+1
      })
    }
  }

  handleLastPageClick() {
    let current = this.state.viewpoint;
    if (current > 0) {
      this.setState({
        viewpoint: current-1
      })
    }
  }

  render() {
    let viewpoint = this.state.viewpoint;
    let pendingMeal = this.props.pendingMeal.slice(viewpoint, viewpoint+4);  

    if (pendingMeal.length > 0) {
      var content = (
        <>
          <div className='pending-meal-title'>
            {this.props.pendingMeal.length} meals added, <button onClick={this.props.handEnjoyMealClick}>Enjoy!</button>
          </div>
          <div className='pending-meal-container'>
            <div className='pending-meal-list'>
              <img src='./img/last_page.png' className='page-icon' id='pending-lastpage-icon' alt='last page' onClick={this.handleLastPageClick}/>
              {pendingMeal.map((option, i) => (
                <div className='pending-option' 
                      key={i}
                      style={{backgroundImage: "url(" + option.image + ")"}}>
                  <span className='pending-option-title'>{option.name}</span>
                  <button value={i} onClick={this.props.handlePendingOptionRemove}>Remove</button>
                </div>
              ))}
              <img src='./img/next_page.png' className='page-icon' id='pending-nextpage-icon' alt='last page' onClick={this.handleNextPageClick}/>
            </div>
            <PendingMealNutri pendingMeal={this.props.pendingMeal}/>
          </div>
        </>
      )
    } else {
      content = <div className='message-div'>
        Waiting for Food, Click to Add.
      </div>
    }
  
    return(
      <div className='pending-meal-div'>
        {content}
      </div>
  
    ); 
  }
}

export default PendingMeal;