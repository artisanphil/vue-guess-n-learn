<template>
  <div id="about">
    <h1 class="text-center text-4xl mt-2 mb-2">How to play</h1>
    
    <div id="content">
      <p>AskLingua is like the game "Guess Who", but for language learning. 
        Play a game against Lingua the clever cockatoo, by asking questions in the language you are learning.</p>

    <br>
    1) Choose language
    <br>
    <img src="/images/help/language-selection.png">
    <br>
    2) Select a character for Lingua to guess
    <br>
    <img src="/images/help/choose-object.png">
    <br>
    3) Now Lingua chooses a character.
    <br>
    <img src="/images/help/lingua-choice.png">
    <br>
    4) Lingua asks a question.    
    <br>
    <img src="/images/help/ask-question.png">
    <br>
    4) Now it's your turn to choose an attribute you want to ask about.
    <br>
    <img src="/images/help/choose-attribute.png">
    <br>
    5) Next you will need to ask the question that matches the attribute you picked. You will be shown either
    a multiple choice question, jumbled sentence or gap question.
    <br><br>
    <strong>Multiple-Choice:</strong><br>
    <img src="/images/help/multiple-choice.png">
    <br>
    <strong>Jumbled sentence:</strong><br>
    Click on the words to create a sentence. Some of the words are wrong!
    If you made a mistake, click on the eraser icon behind the textbox to delete the last word you added.
    <img src="/images/help/jumbled-sentence.png">
    <br>
    <strong>Fill in the blank:</strong><br>
    <img src="/images/help/gap.png">

    <br><br>
    6) Lingua will then answer your question and hide all characters that match (or don't match) the attribute 
    you asked about.
    <br>
    <img src="/images/help/continue.png">
    <br>
    7) Continue answering and asking questions until there is only one character left.
    At that point, click on the character and you win. Be careful, Lingua might guess first who your character is!

    <br><br>    
    </div>
    <div style="text-align:center;">
      <a href="/" class="bg-purple-700 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded" :key="$route.fullPath">Play now!</a>
    </div>
  </div>
</template>

<style>
 img {
   border-color: #EEEEEE;
   border-width: 1px;
   border-style: solid;
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