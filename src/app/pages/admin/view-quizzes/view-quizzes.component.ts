import { Component,OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit{

  quizzes=[
    {
      qId:'',
      title:'',
      description:'',
      maxMarks:'',
      numberOfQuestions:'',
      category:
      {
        title:''
      }

    }
  ];

  constructor(private _quiz:QuizService) {
    // this.getQuiz()
  }
  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);     
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error","Error in loading data",'error')
        
      }
    )
  }
//   getQuiz() {
//     this._quiz.quizzes().subscribe(
//       (data:any)=>
//       {
//         console.log(data);
//         this.quizzes=data;
        
//       },
//       (error)=>
//       {
//         console.log(error);
        
//       }
//     )
//   }

//delete quiz
deleteQuiz(qId:any){
  Swal.fire(
    {
      icon:'info',
      title:'Are You Sure?',
      confirmButtonText:'Delete',
      showCancelButton:true
    }
  ).then((result)=>{

    if(result.isConfirmed) {

    
       this._quiz.deleteQuiz(qId).subscribe(
      (data:any)=> {
    
        this.quizzes = this.quizzes.filter((quiz)=>quiz.qId != qId);
    
        Swal.fire("Deleted","Quiz is deleted","success")
      },
      (error)=>{
        console.log(error);
        
      }
    )}
  })

}

}


