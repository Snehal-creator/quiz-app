import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import { Quiz, QuizResult } from '../types';
import {Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  code :any;
  name :any;
  quizinfo!: Quiz;
  quizresult!:QuizResult;
  displayWarning!:boolean;


  constructor(public service:HttpService,public  router: Router) {}

  ngOnInit(){


  }
  startQuiz(){
    if(this.code && this.name){
       this.service.getQuizByCode(this.code).subscribe((res:any)=>{
        console.log(res);
        let quiz = res[0];
        let quizResult:QuizResult={
          name:this.name,
          quizId:quiz.id,
          response:[]
        }
        this.service.joinQuiz(quizResult).subscribe((res:any)=>{
          this.service.quizResult = res;
          this.router.navigateByUrl("/tabs/tab2");
        //   console.log(res);
    
        })
      })
      this.code==' ';
      this.name==' ';
    }
  
    else{

    }
    this.code= ' ';
    this.name = ' ';
  }
}
