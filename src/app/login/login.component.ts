import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { WhiteSpaceValidators } from '../shared/validators/whiteSpaceValidators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginError: '';
  loginForm : FormGroup;
  constructor(private formBuider: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.logout();
    this.buildLoginForm();
  }

  buildLoginForm():void{
    this.loginForm= this.formBuider.group(
      {
        email:['', [Validators.required,Validators.email,WhiteSpaceValidators.cannotContaintSpace]],
        password:['', [Validators.required,Validators.minLength(2), Validators.maxLength(50),WhiteSpaceValidators.cannotContaintSpace]],
      });
  }

  login(submittedForm:FormGroup){
    this.authService.login(submittedForm.value.email, submittedForm.value.password)
        .subscribe(authResponse=>{
          this.router.navigate(['/home']);
          }, error=>this.loginError = error);
  }
}
