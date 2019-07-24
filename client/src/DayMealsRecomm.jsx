import React from 'react';
<<<<<<< HEAD
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const DayMealsRecomm = props => (
  <div className='day-meals-recomm'>
    this is the day meals recommendation.
  </div>

)
/*render() { 

  return (
  <Router>
    <nav>
    <Link to='/OneRecomendation'>Recommendation</Link>
    </nav>
    </Router>
  );

}*/


=======
import Axios from 'axios';
import cors from 'cors';




class DayMealsRecomm extends React.Component {
  constructor(props){
    super(props); 
    this.state={
      label:"",
      url: "",
      image: ""

    } 

  }
componentDidMount(){
  Axios.post('/api/recipesearch').then(result=>{
    let label = result.data.hits[0].recipe.label
    let image = result.data.hits[0].recipe.image
    let url = result.data.hits[0].recipe.url
    console.log()

    this.setState({
      label,
      image,
      url
    })
    console.log(result)
  })
}
  


  render(){
    var content =[<div>hello</div>,<div>mike</div>]
    return( 
      <>
      <h2>{this.state.label}</h2>
      <img src={this.state.image} alt=""/>
      <a href={this.state.url}></a>
      {content}
      </>

    )
  }
}


>>>>>>> b2f095ab0f4b7d07d8ba2e416c01f01160ae3457


export default DayMealsRecomm;