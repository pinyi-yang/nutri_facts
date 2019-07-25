import React from 'react';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

class DayMealsRecomm extends React.Component {

  constructor(props){
    super(props); 
    this.state={
      label:"",
      url: "",
      image: "",
      result: [],
      currentIndex: 0,
      itemsInSlide: 4,
    } 
  }
  componentDidMount(){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.post('/api/recipesearch').then(result=>{
      let label = result.data.hits[0].recipe.label
      let image = result.data.hits[0].recipe.image
      let url = result.data.hits[0].recipe.url
      console.log(result)
      
      this.setState({
        label,
        image,
        url,
        result: result.data.hits
      })
      console.log(result)
    })
  }
  
  slidePrevPage = () => {
    const currentIndex = this.state.currentIndex - this.state.itemsInSlide
    this.setState({ currentIndex })
  }

  slideNextPage = () => {
    const { itemsInSlide, display: { length }} = this.state
    let currentIndex = this.state.currentIndex + itemsInSlide
    if (currentIndex > length) currentIndex = length

    this.setState({ currentIndex })
  }
  handleOnSlideChange = (event) => {
    const { itemsInSlide, display } = event
    this.setState({ itemsInSlide, currentIndex: display })
  }

  render(){
  var arr =this.state.result;
  var display=[];
  for(var i=0; i<arr.length;i++){
      display.push(
        <div className ='meal'>
          <a href={arr[i].recipe.url} target= '_blank' className='recipe' rel="noopener noreferrer">{arr[i].recipe.label}</a>
          <img src={arr[i].recipe.image} alt=" food image" className='recipe'/>
        </div>
      )
    }
    return( 
      <>
        <div className='container'>
        <AliceCarousel 
        items={display}
        responsive={this.responsive}
        fadeOutAnimation={true}
        mouseDragEnabled={true}
        
        disableAutoPlayOnAction={true}
        onSlideChange={this.onSlideChange}
        onSlideChanged={this.onSlideChanged}
        />
        <button onClick={this.slidePrevPage}>Prev Page</button>
        <button onClick={this.slideNextPage}>Next Page</button>
        </div>
      
        
      </>
    )
  }
}


export default DayMealsRecomm;