import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit{

  constructor(private router:Router, private _category:CategoryService, private s:MatSnackBar, private _quiz:QuizService ){}

  categories = [
    {
      cid:'',
      title:''
    }
  ]

    quizData = 
      {
      title:'',
      description:'',
      maxMarks:'',
      numberOfQuestions:'',
      active:'true',
      category:{
        cid:'',
      }
      }
    
    
  

  ngOnInit(): void {

    this._category.categories().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log(this.categories);
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
      
  }

  addQuiz()
  {
    if(this.quizData.title.trim() == '' || this.quizData.title == null) {
      this.s.open("Title is missing", "Ok", {duration:3000});
    return;
    }
      
    this._quiz.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        Swal.fire("Successful","Quiz is added Successfully", "success").then((e)=>{
          this.router.navigate(['/admin/quizzes'])
        });
        this.quizData = 
        {
        title:'',
        description:'',
        maxMarks:'',
        numberOfQuestions:'',
        active:'true',
        category:{
          cid:'',
        }
      }
  },
  (error)=> {
    console.log(error);
    
  });
  }

}
