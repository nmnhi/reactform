import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'reactform';
  reactiveForm: FormGroup;
  firstName: string = '';
  ngOnInit() {
    this.reactiveForm = new FormGroup({
      personDetails: new FormGroup({
        firstname: new FormControl(null, [
          Validators.required,
          this.noSpaceAllowed,
        ]),
        lastname: new FormControl(null, [
          Validators.required,
          this.noSpaceAllowed,
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),

      gender: new FormControl('male'),
      hobbies: new FormControl(null),
      country: new FormControl('usa'),
      skills: new FormArray([new FormControl(null, Validators.required)]),
    });
  }
  onSubmit() {
    console.log(this.reactiveForm);
    this.firstName = this.reactiveForm.value.personDetails.firstname;
  }
  addSkills() {
    (<FormArray>this.reactiveForm.get('skills')).push(
      new FormControl(null, Validators.required)
    );
  }
  noSpaceAllowed(control: FormControl) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { noSpaceAllowed: true };
    }
    return null;
  }
}
