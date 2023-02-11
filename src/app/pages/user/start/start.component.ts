import { LocationStrategy } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisableRightBtnService } from 'src/app/services/disable-right-btn.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{

  qid:any;
  questions:any;

  marksGot=0;
  correctAnswers=0;
  attempted=0

  timer:any;

  isSubmit=false;

  constructor(
    private locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _disableRightClick:DisableRightBtnService
    
  ){}

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    console.log(this.qid);
    // this._disableRightClick.disableRightClick();
    
    this.loadQuestion();
    
  }


  loadQuestion() {
    this.startTimer()
   this._question.getQuestionofQuizForTest(this.qid).subscribe(
    (data:any)=>{
      this.questions = data;
      this.timer = this.questions.length*2*60;
      // this.questions.forEach((q:any) => {
      //   q['givenAnswer'] = ''
      // });     

      // console.log(this.questions);   
    },
    (error)=>{
      console.log(error);
      alert("error")
      
    }
   )
  }



  preventBackButton()
  {
    history.pushState(null,'',location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,'',location.href)
    })
  }

  //submit quiz

  submitQuiz()
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to start the quiz",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      //calculation

      if(result.isConfirmed)
      {
        
        this.evalQuiz();
      }
      
    // console.log("Total correct answer " + this.correctAnswers);
    // console.log("Total mark " + this.marksGot);
    // console.log(this.attempted);
    
    

    })

  }

  //timer
  startTimer()
  {
    let t = window.setInterval(()=>{
      // code
      if(this.timer<=0)
      {
        this.evalQuiz();
        clearInterval(t);
      }
      else{
        this.timer--;
      }
    },1000)
    }

    //formate Timer
    formateTimer()
    {
      let hh = Math.floor(this.timer/(60*60));
      let mm = Math.floor(this.timer/60)-hh*60*60;
      let ss = this.timer - mm*60;

      return `${hh} hour : ${mm} min : ${ss} sec`;

    }

    //eval quiz
    evalQuiz()
    {

      // eval quiz from backend
      this.isSubmit=true;
      this._question.evalQuiz(this.questions).subscribe(
        (data:any)=>{
          this.marksGot=parseFloat( Number(data.marksGot).toFixed(2) );
          this.correctAnswers=data.correctAnswers;
          this.attempted = data.attempted;
          console.log(data); 
        },
        (error)=>{
          console.log(error);
          
        }

      )

      //eval quiz in forntend
      // this.isSubmit=true;
      // this.questions.forEach((q:any) => {
      //   if(q.givenAnswer == q.answer)
      //   {
      //     this.correctAnswers++;
      //     let marksSigle = this.questions[0].quiz.maxMarks/this.questions.length;
      //     this.marksGot += marksSigle;
      //   }

      //   if(q.givenAnswer.trim()!='') 
      //   {
      //     this.attempted++;
      //   }
        
      // });
    }

    //PrintPage
    printPage(){
      window.print();
    }


}
