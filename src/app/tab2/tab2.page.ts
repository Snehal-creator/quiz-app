import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import { Question, Quiz, QuizResult } from '../types';
import {Router } from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  questions:Question[] = [];
  quizinfo!:Quiz;
  quizResult!:QuizResult;
  currentQuestionNo:number=0;
  selectedOptionId:any;
  constructor(public service:HttpService,public  router: Router) {}

  ngOnInit(){
    this.quizResult = this.service.quizResult;
    if(!this.quizResult){
      this.router.navigateByUrl('/');
      return;
    }
    this.service.getQuestions().subscribe((res:any)=>{
      this.questions = res;
      console.log(res);
    })
    this.service.getQuizById(this.quizResult.quizId).subscribe((res:any)=>{
      this.quizinfo = res;
      console.log(res);
    })
  }
 get currentQuestion(){
    let questionId = this.quizinfo?.questions[this.currentQuestionNo];
    return this.questions.find(x=>x.id==questionId)

  }

  next(){
    this.quizResult.response?.push({
      questionId:this.currentQuestion!.id,
      answerOptionId:this.selectedOptionId
    })
    console.log(this.selectedOptionId)
    this.currentQuestionNo++;
    this.selectedOptionId="";
  }

  submit(){
    this.next();
    this.calculateResult();
    this.service.updateQuizResult(this.quizResult.id!,this.quizResult).subscribe();
    this.router.navigateByUrl("/tabs/tab3")

  
  }

  calculateResult(){
    let score = 0;
    let correct = 0;
    let inCorrect = 0;
    let unAttempt = 0;
    let percentage = 0;
    let totalMark = 0;

    this.quizResult.response?.forEach((res:any)=>{
      let questionId = res.questionId;
      let selectedOptionId = res.answerOptionId;
      let question = this.questions.find(x=>x.id==questionId);
      let correctOption = question?.options.find(x=>x.isCorrect == true);
      totalMark += question!.marks;
      if(!selectedOptionId){
        unAttempt++;
      }else if(selectedOptionId == correctOption?.id){
        correct++;
        score += question!.marks;
      }else{
        inCorrect++;
        score -= question!.negativeMarks;
      }
    });
    percentage = Math.round((score/totalMark)*100);
    this.quizResult.correct=correct;
    this.quizResult.inCorrect=inCorrect;
    this.quizResult.unAttempt=unAttempt;
    this.quizResult.score=score;
    this.quizResult.percentage=percentage;
 

  }

}
