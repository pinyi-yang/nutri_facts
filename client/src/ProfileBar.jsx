import React from 'react';

class ProfileBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addAMeal: false,
      foods: '',
      dish: ''
    }
    this.handleAddMealClick = this.handleAddMealClick.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleAddMealClick() {
    this.setState({
      addAMeal: !this.state.addAMeal
    })
  }
  handleFormChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  render() {
    if (this.state.addAMeal) {
      var addMealForm = (
        <div className='new-meal-form'>
          <form>
            <br/>
            Type: <br/>
            <select name='type'>
              <option value='breakfast'>Breakfast</option>
              <option value='lunch'>Lunch</option>
              <option value='snack'>Snack</option>
              <option value='supper'>Supper</option>
              <option value='dessert'>Dessert</option>
            </select><br/><br/>

            Foods:<br/>
            <input type='text' name='foods' value={this.state.foods} onChange={this.handleFormChange} placeholder='names for food'/><br/><br/>
            Dish:<br/>
            <input type='text' name='dish' value={this.state.dish} onChange={this.handleFormChange} placeholder='name for dish' /><br/><br/>
            <input type='submit' value='SUBMIT' />
          </form>
        </div>
      )
    }
    
    return (
      <div className="profileBar">
        <img id='profilePic' src="/profilePic.png" alt=""/>
        <div className="sidebar">
          <a href="#">Breakfast</a>
          <a href="#">Lunch</a>
          <button onClick={this.handleAddMealClick}>✚ Add a Meal</button>
          {addMealForm}
        </div>
      </div>

    );
  }
}

export default ProfileBar;