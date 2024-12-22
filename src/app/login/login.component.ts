import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router){}

  errorMsg: string = '';
  username: string = '';
  password: string = '';
  

  login(){
    if (!this.username || !this.password) {
      this.errorMsg = 'You must fill in all fields.';
      return;
    }

    this.loginService.getUser(this.username, this.password).subscribe({
      next: (user) => {
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
