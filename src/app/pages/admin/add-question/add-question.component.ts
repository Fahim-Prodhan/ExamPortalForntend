import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  public Editor:any = ClassicEditor;


  qId = [];
  qTitle=[];

  quizzes={
    qId:'',
    title:''
  }

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

  constructor(
    private _route:ActivatedRoute,
    private _q:QuestionService,
    private router:Router
  ) {}

  ngOnInit(): void {
    
      this.qId = this._route.snapshot.params['qid'];
      this.qTitle = this._route.snapshot.params['title'];
      this.question.quiz.qId = this._route.snapshot.params['qid'];
      
      
      
     
  }

  formSubmit() {
    
    if(this.question.content.trim()=='' || this.question.content == null){
      return;
    }
    if(this.question.option1.trim()=='' || this.question.option1 == null){
      return;
    }
    if(this.question.option2.trim()=='' || this.question.option2 == null){
      return;
    }


    //form submit
    this._q.addQuestion(this.question).subscribe(
      (data:any)=> {
        
        
            Swal.fire({
            title: 'Successful',
            text: "Question is added successfully",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#fffff',
            confirmButtonText: 'OK!'
          }).then((restul)=>{
            if(restul.isConfirmed) {
              
                this.router.navigate([`/admin/view-questions/${this.qId}/${this.qTitle}`]);
                // window.location.href='/login'
            }
          })
        
        this.question = {
          
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

      },
      (error)=>{
        console.log(error);
        Swal.fire("Error","Error in loading data","error")
        
      }
    )
  }
  

}
