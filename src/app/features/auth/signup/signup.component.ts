import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getFormControlErrors } from 'src/app/shared/utilityFunctions';


function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const confirmControl = c.get('confirmPassword');
  if (passwordControl?.pristine || confirmControl?.pristine) {
    return null;
  }
  if (passwordControl?.value === confirmControl?.value) {
    return null;
  }
  return { 'match': true };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  showLogin: boolean = true;
  changetype: boolean = true;
  visible: any;
  pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$";



  private router = inject(Router)
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', Validators.required]
      }, { validator: passwordMatcher }),
    })
  }

  openLogin() {
    this.router.navigate(['/login']);
  }
  signUp(): void {
    console.log(this.signUpForm);
    console.log('Saved: ' + JSON.stringify(this.signUpForm.value));
  }
  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  getFormControlErrors(controlName: string): boolean {
    const control = this.signUpForm.get(controlName);
    return getFormControlErrors(control!);
  }
  

}
