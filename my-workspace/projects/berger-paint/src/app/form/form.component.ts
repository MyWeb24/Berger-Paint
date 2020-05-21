import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  //@ViewChild('user_form',{static:false}) user_form:ElementRef
  
  userForm : FormGroup;
  form_submitted : false;

  

  constructor(private form_builder : FormBuilder) 
  { }

  ngOnInit() {
   this.userForm = this.form_builder.group({
    name: ['',Validators.required],
     mob :  ['',Validators.required],
     email : ['',Validators.required],
     city :  ['',Validators.required],
     lang :  ['',Validators.required],
     msg :  [''],
     checkbox : [true]
   })

  }

  onSubmit()
  {
   
    if(this.userForm.status == "VALID")
    {
      console.log("forms submitted")
      this.SavePDF();
    }
    else
    {
      console.log("not submitted")
    }
  //  console.log(this.userForm.get('checkbox').value)

  }

  public SavePDF(): void {

    let doc = new jsPDF();
    doc.setLineWidth(0.5);
    doc.rect(35, 20, 150, 75);
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(12);

  
    
    doc.text(60,15,'Thank you for your registration...');
    doc.setFontSize(9);
    doc.text(60,30,'Your Registration Details is as follow ');
    
    doc.text(60,45,'Name  : ')
    doc.text(90,45,this.userForm.get('name').value)

    doc.text(60,60,'Mobile No: ')
    doc.text(90,60,this.userForm.get('mob').value)

    doc.text(60,75,'Email Id  : ')
    doc.text(90,75,this.userForm.get('email').value)

    doc.text(60,90,'City  : ')
    doc.text(90,90,this.userForm.get('city').value)

    /*let content=this.user_form.nativeElement;
    let doc = new jsPDF();
    let _elementHandlers =
    {
      '#editor':function(element,renderer){
        return true;
      }
    };
    doc.fromHTML(content.innerHTML,15,15,{

      'width':190,
      'elementHandlers':_elementHandlers
    });*/

    doc.save('UserRegistration.pdf');
  }

}
