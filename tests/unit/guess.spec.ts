import GuessClass from "../../src/classes/Guess";
import { IComputerGuess } from "../../src/interfaces/IComputerGuess";

describe('Guess.ts', () => {
  it('return message for wrongly answered question', async () => {
    const question = GuessClass.getComputerQuestion('test', 'test');
    const expectedQuestionObject = {
      'choice': 'test',
      'sentence': '<span style="color:red;">Wrong!</span><br />test'
    };
    const expectedQuestion: IComputerGuess = expectedQuestionObject as IComputerGuess;

    expect(question).resolves.toEqual(expectedQuestion);
  })
})
