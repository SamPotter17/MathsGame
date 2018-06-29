import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { timer } from 'rxjs'; // (for rxjs < 6) use 'rxjs/observable/timer'
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "The Maths Quiz";
  numberOne: number;
  numberTwo: number;
  answer: string;
  score:number = 0;
  questionNum:number = 0;
  question: string;
  name: string;
  operationNum: string;
  leaderboardOne: string;
  leaderboardTwo: string;
  leaderboardThree: string;
  totalScore: number;
  gamemode: string;
  difficultyChosen:boolean = false;
  divisionCheck: number;
  countDown;
  timeStarted:boolean = false;
  count:number = 120;
    constructor() {


    }
  startTimer(){
    this.timeStarted = true;
    this.newQuestion()
    this.countDown = timer(0,1000).pipe(
       take(this.count),
       map(()=> --this.count)
    );
  }

  resetGame() {
    this.answer = "";
    this.score =  0;
    this.questionNum = 0;
    this.question = "";
    this.name = "";
    this.count = 120;
    this.countDown = 0
    this.timeStarted = false;
    this.difficultyChosen = false;
    this.question = "";
  }

  getOperation(operationMax) {
     return Math.floor((Math.random() * operationMax) + 1);
  }

  getRandomInt(max) {
     return Math.floor(Math.random() * Math.floor(max) + 1);
  }

  easyMode(){
    this.gamemode = "Easy"
    this.difficultyChosen = true;
    this.startTimer();
  }

  normalMode(){
    this.gamemode = "Normal"
    this.difficultyChosen = true;
    this.startTimer();
  }

  hardMode(){
    this.gamemode = "Hard"
    this.difficultyChosen = true;
    this.startTimer();
  }

  timesUp(){
    if (this.score == 0){
      this.totalScore = this.count
    } else {
      this.totalScore = this.score + this.count
    }
    console.log("Game Over")
    console.log("Name: " + this.name + ", Score: " + this.score + ", Time Left: " + this.count)
    window.confirm("Congatulations " + this.name +  " you scored " + this.totalScore + " points")
    this.leaderboardThree = this.leaderboardTwo
    this.leaderboardTwo = this.leaderboardOne
    this.leaderboardOne = "Name: " + this.name + ", Total Score: " + this.totalScore + ", Difficulty: " + this.gamemode
    this.question = ""
    this.resetGame()
  }
  // generate 2 random number and produce sum
  newQuestion() {

      this.answer = "";
      var max: number;
      var operationMax: number;

      if (this.gamemode == "Easy"){
        max = 10
        operationMax = 2
      } else if (this.gamemode == "Normal"){
        max = 20
        operationMax = 3
      } else if (this.gamemode == "Hard"){
        max = 40
        operationMax = 4
      } else{
        console.log("No idea how you have got here")
      }

      this.setOperation(operationMax)

      if(this.count == 0){
          this.question = ""
          this.timesUp()
      }
      if (this.questionNum == 20 ){
        this.timesUp()
      } else {
        this.numberOne = this.getRandomInt(max)
        this.numberTwo = this.getRandomInt(max)
        if(this.operationNum == "/"){
          this.divisionCheck = this.numberOne / this.numberTwo
          while(this.divisionCheck % 1 != 0){
            console.log()
            this.numberOne = this.getRandomInt(max)
            this.numberTwo = this.getRandomInt(max)
            this.divisionCheck = this.numberOne / this.numberTwo
            this.question = "What is: " + this.numberOne + " " + this.operationNum + " " + this.numberTwo
          }
          // this.newQuestion()
          // if (this.divisionCheck % 1 == 0){
          //   this.question = "What is: " + this.numberOne + " " + this.operationNum + " " + this.numberTwo
          //   this.questionNum = this.questionNum + 1
          // } else{
          //   this.newQuestion()
          // }

        }


        this.question = "What is: " + this.numberOne + " " + this.operationNum + " " + this.numberTwo
        this.questionNum = this.questionNum + 1
      }
  }

  setOperation(operationMax){
    let operation = this.getOperation(operationMax)
    if(operation == 1){
      this.operationNum = "+"
    } else if (operation == 2){
      this.operationNum = "-"
    } else if (operation == 3){
      this.operationNum = "x"
    } else if (operation == 4){
      this.operationNum = "/"
    } else {
      console.log(operationMax, "for some reason not been handled in the if")
    }

  }
  checkAnswer(){
    if(this.operationNum == "+"){
      if(this.answer == (this.numberOne + this.numberTwo).toString()){
        console.log("Correct answer " + this.answer)
        this.score += 10
      } else {
        console.log("Incorrect answer" + this.answer + " answer should be: " + (this.numberOne + this.numberTwo))
      }
    } else if(this.operationNum == "-") {
      if(this.answer == (this.numberOne - this.numberTwo).toString()){
        console.log("Correct answer " + this.answer)
        this.score += 10
      } else {
        console.log("Incorrect answer" + this.answer + " answer should be: " + (this.numberOne - this.numberTwo))
      }
      } else if(this.operationNum == "x") {
          if(this.answer == (this.numberOne * this.numberTwo).toString()){
            console.log("Correct answer " + this.answer)
            this.score += 10
          } else {
            console.log("Incorrect answer" + this.answer + " answer should be: " + (this.numberOne * this.numberTwo))
          }
        }  else if(this.operationNum == "/") {
          if(this.answer == (this.numberOne / this.numberTwo).toString()){
            console.log("Correct answer " + this.answer)
            this.score +=10
          } else {
            console.log("Incorrect answer" + this.answer + " answer should be: " + (this.numberOne / this.numberTwo))
          }
        }
        this.answer = "";
        this.newQuestion()
        }


}
