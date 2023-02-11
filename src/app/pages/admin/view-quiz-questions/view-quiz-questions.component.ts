import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit{

  qId=[];
  qTitle=[];
  
  questions = [
    {
      quesId:'',
      content:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      answer:''
    }
  ]

  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService
    ){}

  ngOnInit(): void {
    this.qId =  this._route.snapshot.params['qid']
    this.qTitle = this._route.snapshot.params['title']
    // console.log(this.qId);
    // console.log(this.qTitle);
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{
        this.questions = data;
        console.log(this.questions);        
      },
    (error)=> {
      console.log(error);
      
    }
    )
    
    
  }

  //delete question
  deleteQuestion(quesId:any){
    Swal.fire(
      {
        icon:'info',
        title:'Are You Sure?',
        confirmButtonText:'Delete',
        showCancelButton:true
      }
    ).then((result)=>{
  
      if(result.isConfirmed) {
  
      
         this._question.deleteQuestion(quesId).subscribe(
        (data:any)=> {
      
          this.questions = this.questions.filter((question)=>question.quesId != quesId);
      
          Swal.fire("Deleted","Quiz is deleted","success")
        },
        (error)=>{
          console.log(error);
          
        }
      )}
    })
  
  }

}
