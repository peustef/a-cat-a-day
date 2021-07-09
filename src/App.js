import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
body{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
}
`

const MainContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items: center;
  box-sizing:border-box;
  background-color: pink;
  height:100vh;
  width:100vw;
  margin: auto;
  img{
    width:30vw;
    height:30vw;
  }
  button{
    margin-bottom:16px;
    margin-right:4px;
  }
  h2{
    margin-bottom:0;
  }
  h4{
    margin-top:0;
  }

`
const imageUrl = 'https://api.thecatapi.com/v1/images/search?mime_types=jpg,png'
const gifUrl = 'https://api.thecatapi.com/v1/images/search?mime_types=gif'

export default class App extends React.Component {
  state = {
    catPic: [],
    catGif: [],
    renderCat: ""
  }

  getCatPic = () => [
    axios.get(`${imageUrl}`)
      .then((res) => {
        this.setState({ catPic: res.data, renderCat: "img" })
      })
      .catch((err) => {
        console.log(err)
      })
  ]

  getCatGif = () => [
    axios.get(`${gifUrl}`)
      .then((res) => {
        this.setState({ catGif: res.data, renderCat: "gif" })
      })
      .catch((err) => {
        console.log(err)
      })
  ]

  render() {

    const catPics = this.state.catPic.map((pic) => {
      return pic.url
    })
    const catGifs = this.state.catGif.map((gif) => {
      return gif.url
    })

    const renderPage = () => {
      if (this.state.renderCat === "img") {
        return <div>
          <img src={catPics} alt={"cat pic"}></img>
          <p>have a cat day!</p>
        </div>
      } else if (this.state.renderCat === "gif") {
        return <div>
          <img src={catGifs} alt={"cat pic"}></img>
          <p>have a cat day!</p>
        </div>
      }
    }


    return (
      <MainContainer>
        <GlobalStyle />

        <h2>a cat a day</h2>
        <h4>(or as many as you like)</h4>
        <div>
          <button onClick={this.getCatGif}>get a cat gif</button>
          <button onClick={this.getCatPic}>get a cat pic</button>
        </div>

        {renderPage()}

      </MainContainer>
    );
  }
}

