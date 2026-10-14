import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})
export class EmailsComponent implements OnInit {

  constructor(private fb: UntypedFormBuilder) { }
  form!: UntypedFormGroup;
  ngOnInit(): void {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]]
      });
  }

  submit() {
    if (this.form.valid) {
      //console.log("EmailsComponent->submit", this.form.value);
    }
  }

}
