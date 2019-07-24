import React from 'react';
import {Link} from 'react-router-dom';

class ProfileBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addAMeal: false,
      foods: '',
      dish: '',
      type: ''
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
    //? old add meal form, replaced by AddMealForm
    // if (this.state.addAMeal) {
    //   var addMealForm = (
    //     <div className='new-meal-form'>
          // <form onSubmit={(e) => this.props.handNewMealSubmit(e, this.state.foods, this.state.dish, this.state.type)}>
          //   <br/>
          //   Type: <br/>
          //   <select name='type' onChange={this.handleFormChange}>
          //     <option value=''>--</option>
          //     <option value='breakfast'>Breakfast</option>
          //     <option value='lunch'>Lunch</option>
          //     <option value='snack'>Snack</option>
          //     <option value='supper'>Supper</option>
          //     <option value='dessert'>Dessert</option>
          //   </select><br/><br/>

          //   Foods:<br/>
          //   <input type='text' name='foods' value={this.state.foods} onChange={this.handleFormChange} placeholder='names for food'/><br/><br/>
          //   Dish:<br/>
          //   <input type='text' name='dish' value={this.state.dish} onChange={this.handleFormChange} placeholder='name for dish' /><br/><br/>
          //   <input type='submit' value='SUBMIT' />
          // </form>
    //     </div>
    //   )
    // }
    
    return (
      <div className="profileBar">
        <img id='profilePic' src="/profilePic.png" alt=""/>
        <div className="sidebar">
          <a href="#">Breakfast</a>
          <a href="#">Lunch</a>
          <a href='#' onClick={this.props.handleAddMealClick}>➕ Add a Meal</a>
          {/* <button onClick={this.handleAddMealClick}>✚ Add a Meal</button>
          {addMealForm} */}
        </div>
      </div>

    );
  }
}

export default ProfileBar;