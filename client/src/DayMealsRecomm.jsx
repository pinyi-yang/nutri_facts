import React from 'react';
import Axios from 'axios';
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
    } 
  }
componentDidMount(){
  Axios.post('/api/recipesearch').then(result=>{
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

  render(){
    var arr =this.state.result;
    var display=[];
    for(var i=0; i<arr.length;i++){
      display.push(
        
          <>
            <a href={arr[i].recipe.url} target= '_blank' className='recipe'>{arr[i].recipe.label}</a>
            <img src={arr[i].recipe.image} alt="" className='recipe'/>
            </>
          
          
        
      )
    }
    return( 
      <>
        <div className='container'>
        <AliceCarousel
        items={display}
        responsive={this.responsive}
        autoPlayInterval={2000}
        autoPlayDirection="rtl"
        autoPlay={false}
        fadeOutAnimation={true}
        mouseDragEnabled={true}
        playButtonEnabled={true}
        disableAutoPlayOnAction={true}
        onSlideChange={this.onSlideChange}
        onSlideChanged={this.onSlideChanged}
        />
        
        </div>
      
        
      </>
    )
  }
}




export default DayMealsRecomm;