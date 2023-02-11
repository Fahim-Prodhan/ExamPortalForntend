import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz-question',
  templateUrl: './update-quiz-question.component.html',
  styleUrls: ['./update-quiz-question.component.css']
})
export class UpdateQuizQuestionComponent implements OnInit{


  constructor(
    private _question:QuestionService,
    private _route:ActivatedRoute,
    private _router:Router,
    private _quiz:QuizService
  ){}

  public Editor:any = ClassicEditor;

  quesId = null;
  question = {
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    quiz:{
      qId:''
    }
  }

  quiz={
    qId:'',
  }
 


  ngOnInit(): void {
      this.quesId = this._route.snapshot.params['quesid'];
      
      
      this._question.getSingleQuestion(this.quesId).subscribe(
        (data:any)=>{
          this.question = data;
          
          
        },
        (error)=>{
          console.log(error);
          
        }
      )

      this._quiz.quizzes().subscribe(
        (data:any)=>{
          this.quiz = data;
          // console.log(this.quiz);
          
        },
        (error)=>
        {
          console.log(error);
          
        }
      )
  }

//update question
  updateQuestion()
  {
    this._question.updateQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire("Updated","quiz is updated successfully","success").then((e)=>{
          this._router.navigate(['/admin/quizzes']);
        })
      },
      (error)=>{
        console.log(error);
        
      }

    )
  }
}




