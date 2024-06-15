import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question, Quiz, QuizResult } from './types';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  quizResult!:QuizResult;

  constructor(private http: HttpClient){}


  getQuizByCode(code:string){
    return this.http.get<Quiz[]>('http://localhost:3000/quizs?code='+code);

  }

  getQuestions(){
    return this.http.get<Question[]>('http://localhost:3000/questions');
  }

  joinQuiz(res:QuizResult){
    return this.http.post<QuizResult>('http://localhost:3000/quizResults',res);
  }

  getQuizById(id:number){
    return this.http.get<Quiz[]>('http://localhost:3000/quizs/'+id);
  }

  updateQuizResult(id:number,result:QuizResult){
    return this.http.put<any>('http://localhost:3000/quizResults/'+id,result);
  }
  getQuizResult(id:number){
    return this.http.get<QuizResult[]>('http://localhost:3000/quizResults/'+id);
  }
}

  

