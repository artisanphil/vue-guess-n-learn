<template>
  <div id="about">
    <h1 class="text-center text-4xl mt-2 mb-2">About AskLingua</h1>
    
    <div id="content">
      <p>AskLingua was created by Philip Perry (software developer and language geek) 
        in cooperation with Renton Perry (graphics).</p>

      <p>AskLingua is like the game "Guess Who", but for language learning. 
        Play a game against Lingua the clever cockatoo, by asking questions in the language you are learning.</p>

    <h2>How to play</h2>
    1) Start by choosing the language you want to learn.
    <br><br>
    2) Select a character for Lingua to guess
    <br>
    <img src="/images/help/choose-object.png">
    <br>
    3) Lingua will select a character for you to guess and then ask a question
    about your character in the language you are learning. Can you understand the question? 
    In this case Lingua is asking if Alexander has ginger hair (which he hasn't, so click "No").
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
    7) Click on "Continue", answer and ask questions until there is only one character left.
    At that point, click on the character and you win. Be careful, Lingua might guess first who your character is!

    <br><br>    
    </div>
    <router-link to="/" class="underline">Play now!</router-link>
  </div>
</template>

<style>

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