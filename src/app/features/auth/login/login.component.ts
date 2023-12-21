import { Component, inject } from '@angular/core';
import { JsonPipe, NgClass, NgIf } from '@angular/common';
import { FormBuilder, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { getFormControlErrors } from 'src/app/shared/utilityFunctions';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [JsonPipe, NgClass, NgIf, ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  changetype: boolean = true;
  visible: any;
  loginForm!: FormGroup;
  // Add this feature later 
  pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$";


  private router = inject(Router)
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  openSignup() {
    this.router.navigate(['/signup']);
  }
  Login() {
    console.log(this.loginForm);
    console.log('Saved: ' + JSON.stringify(this.loginForm.value));
  }

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  getFormControlErrors(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return getFormControlErrors(control!);
  }

}
