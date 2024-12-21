import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],  
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

    constructor(private loginService: LoginService, private router: Router){}
  

  username: string = '';
  password1: string = '';
  password2: string = '';
  email: string = '';
  role: string = '';
  errorMsg: string = '';

  signup(){
    alert(this.role);
    if(this.username=='' || this.password1 == '' || this.password2 == '' || this.email == '' || this.role == ''){
      this.errorMsg = "All fields must be filled!";
      return;
    }
    if(this.password1 != this.password2){
      this.errorMsg = "Both passwords must match!";
      return;
    }
    this.loginService.signup(this.username, this.password1, this.email, this.role).subscribe({
      next: (user) => {
        alert(user);
        localStorage.setItem('user', JSON.stringify(user));
        if (user.role === 'USER') {
          this.router.navigate(['/user']);
        } else {
          this.router.navigate(['/admin']);
        }
      },
      error: () => {
        this.errorMsg = 'Invalid credentials!';
      }
    });
  }
}
