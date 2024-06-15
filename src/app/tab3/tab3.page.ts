import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {Router } from '@angular/router';
import { QuizResult } from '../types';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit  {
  quizResult!:QuizResult;
  constructor(public service:HttpService,public  router: Router) {}

  ngOnInit(){
    this.quizResult = this.service.quizResult;
    if(!this.quizResult){
      this.router.navigateByUrl('/');
      return;
    }
    let quizResultid = this.service.quizResult.id;
    this.service.getQuizResult(quizResultid!).subscribe((res:any)=>{
      this.quizResult = res;
    })

  }

}
