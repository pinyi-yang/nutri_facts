import React from 'react';
import FoodsNutriIndicator from './FoodsNutriIndicator';

class MealHistroyMeals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewpoint: 0
    }
    this.handleLastPageClick = this.handleLastPageClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
  }

  handleNextPageClick() {
    let max = this.props.meals.length;
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
    let meals = this.props.meals.slice(viewpoint, viewpoint+4);
    
    let content = meals.map(meal => {
      console.log(meal.type);
      return (
        <div className='meal-history-meal-single'>
          <b>{meal.type ? meal.type : 'random'}</b>
          <ul>
            {meal.food.map(item => (
              <li>{item.name}</li>
            ))}
          </ul>
          <FoodsNutriIndicator foods={meal}/>
        </div> 
      )
    })
    
    return (
      <>
        <img src='./img/last_page.png' className='page-icon' id='history-lastpage-icon' alt='last page' onClick={this.handleLastPageClick}/>
        {content}
        <img src='./img/next_page.png' className='page-icon' id='history-nextpage-icon' alt='last page' onClick={this.handleNextPageClick}/>
      </>
    )
  }
}

export default MealHistroyMeals;