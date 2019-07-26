import React from 'react';

class MealOptions extends React.Component {
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
    let max = this.props.options.length;
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
    let options = this.props.options.slice(viewpoint, viewpoint+4);
    return (
      <div className='meals-options-list'>
        <img src='./img/last_page.png' className='page-icon' id='options-lastpage-icon' alt='last page' onClick={this.handleLastPageClick}/>

        {options.map((option, i) => (
          <div className='meals-option' 
                key={i}
                style={{backgroundImage: "url(" + option.image + ")"}}
                onMouseOver={() => this.props.handleHoverOption(i)}
                onMouseLeave={this.props.handleOffOption}
                onClick={() => this.props.handleMealOptionSelect(option, this.props.type)}>
            <div className='meal-option-name'>
              <div>
               {option.url ? <a target="_blank" href={option.url} onClick={this.preventBubbling}>{option.name}</a> : option.name}
              </div>
            </div>
          </div>
        ))}

        <img src='./img/next_page.png' className='page-icon' id='options-nextpage-icon' alt='last page' onClick={this.handleNextPageClick}/>
      </div>
    );
  }
}


export default MealOptions;