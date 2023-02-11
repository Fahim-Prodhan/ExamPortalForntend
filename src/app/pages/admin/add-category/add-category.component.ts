import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{

  category={
    title:'',
    description:''
  }

  constructor(private _route:Router,private _category:CategoryService, private _snack:MatSnackBar) {}

  ngOnInit(): void {}

  formSubmit(){
    if(this.category.title.trim()=='' || this.category.title==null)
    {
      this._snack.open("Title Required!",'Ok',{
        duration:3000
      })
      return;
    }

    //add 
    this._category.addCategory(this.category).subscribe(
      (data:any)=>{
        Swal.fire("Success!!","Category is add sucessfully", 'success').then((e)=>{
          this._route.navigate(['/admin/categories']); 
        })
        // window.location.href='/admin/add-category'
        
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error!!","Category is ont add ", 'error')

        
      }
    )
  }
}
