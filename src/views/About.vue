<template>
  <div id="about">
    <h1 class="text-center text-4xl mt-2 mb-2">About AskLingua</h1>
    
    <div id="content">
      <p>AskLingua was created by Philip Perry (software developer and language geek) 
        in cooperation with Renton Perry (graphics).</p>
      <br>
      <router-link to="/howto" class="text-base underline">How to play</router-link>
      <br><br>
      Feedback is much appreciated: 
        <a
      href="javascript:void(
        window.open(
          'https://form.jotform.com/213145745724355',
          'blank',
          'scrollbars=yes,
          toolbar=no,
          width=700,
          height=500'
        )
      )
    ">
      Contact us
    </a> 
    <br>
    <div id=stayinformed>
      <hr>
      <br />
      <h3>Stay informed on new features</h3>
      <p>We have many more things planned, for instance:</p>
      <p>Android/iOS app, leaderboard, more languages, other things to guess, etc. </p>
      <p class=signup><a href="https://twitter.com/AskLingua" target="_blank">Follow AskLingua on Twitter</a> or
      <a href="https://asklingua.us20.list-manage.com/subscribe?u=33a92fb170de7e1d490b68911&id=39ff1526de" target="_blank">subscribe to the newsletter.</a></p>
    </div>

    </div>
  </div>  

</template>

<style>

a {
  text-decoration: underline;
}

 #about {
    max-width: 800px;
    margin: 2vh auto;
    border-radius: 25px;
    border: 2px solid #ff8c00;
    color: #A52A2A;
    padding: 1vh;
    padding-bottom: 5vh;
  }

  #content {
    text-align: left;
  }

  h2 {
    font-size: 2rem;
    font-weight: bold;
  }
</style>