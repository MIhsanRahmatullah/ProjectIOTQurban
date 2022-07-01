import React, { useState, useRef } from 'react'
import './Home.css'
import {RightOutlined, LeftOutlined} from '@ant-design/icons'
import { Typography } from 'antd'

const {Title} = Typography

const SliderData = [
    {
        image:'https://images.unsplash.com/photo-1564656240842-c7b5e4c2b3f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8a2FtYmluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
        image: 'https://images.unsplash.com/photo-1560888126-5c13ad3f9345?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
    },
    {
        image:'https://media.istockphoto.com/photos/momma-cow-and-calf-sharing-a-nuzzle-picture-id1068254268?b=1&k=20&m=1068254268&s=170667a&w=0&h=WemgiuoEouGII7ME_0vmx3wn0xIrbUbRAzAgK0XHTgA='
    },
    {
        image:'https://images.unsplash.com/photo-1594302954323-7846bf62b5a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2FwaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
    }
]

const ImageSlider = ({slides}) => {
    const [current, setCurrent] = useState(0)
    const length = slides.length

    setTimeout(()=>{
        setCurrent( current + 1)
        if(current == 3){
            setCurrent(0);
        }
    }, 3000)


    const nextSlide =() =>{
        setCurrent(current === length -1? 0 : current + 1)
    }

    const prevSlide =()=>{
        setCurrent(current === 0? length -1 : current -1)
    }

    if (!Array.isArray(slides) || slides.length <=0){
        return null
    }

  return (
    <section className='slider'>
        <button >
            <LeftOutlined className='left-arrow'  onClick={prevSlide}/>
        </button>
        <RightOutlined className='right-arrow' onClick={nextSlide} />
            {SliderData.map((slide, index)=>{
                return(
                    <div className={index === current ? 'slide active' : 'slide'} key=
                    {index}>
                        {index === current && (
                            <img src={slide.image} className='image'/>
                        )}
                    </div>
                )    
            })}   
        </section> 
    )
}

export default class Home extends React.Component{
    render(){
    return(
        <div>
            <Title style={{textAlign: 'center'}}>IOT QURBAN</Title>
            <div>
            <ImageSlider slides={SliderData}/>
            </div>
        </div>
        )
    }
}