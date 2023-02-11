import { Component,OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{


  categories=[
    {
      cid:'',
      title:'',
      description:'',
    }
  ]

  constructor(private _categroy:CategoryService){
  }
  ngOnInit(): void {
      this._categroy.categories().subscribe(
        (data:any)=>{
        this.categories=data;
        console.log(this.categories);   
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error!", "Error in loading data", 'error')
        
      }
      )
  }

}
