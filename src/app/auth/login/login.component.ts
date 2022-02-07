import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  Router
} from '@angular/router';
import {
  ApiserviceService
} from 'src/app/apiservice.service';
import {
  AuthService
} from 'src/app/auth.service';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  spinner: boolean = false;
  submitted: boolean;
  durationInSeconds: number = 3;
  password: string;
  fieldTextType: any;

  constructor(private apiService: ApiserviceService, private authService: AuthService, private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public router: Router, public dialog: MatDialog) {

    if (localStorage.getItem("authToken") !== null) {
      this.router.navigate(['/dashboard/home/main'])
    }

    this.loginForm = this.formBuilder.group({
      emailId: ['',
        [Validators.required, Validators.pattern(/(^(.+@.+\..+)$)|(\d{10})/)]
      ],
      password: ['',
        [Validators.required, ]
      ],
    });
  }


  get loginGetter() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.password = 'password';
  }

  login(data: any) {

    this.spinner = true;
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.spinner = false;
      return;
    } else {
      this.apiService.login(data).subscribe(
        (response: any) => {
          this.spinner = false

          this._snackBar.open(response.message, "Thanks", {
            duration: 3000
          });
          var token = response.token
          var email = response.data.email_address
          var id = response.data.id
          localStorage.setItem("email", email)
          localStorage.setItem("id", id)
          localStorage.setItem("authToken", token)
          this.router.navigate(['/dashboard/home/main'])
        }, (error: any) => {
          this.spinner = false
          this._snackBar.open(error.error.message, "Cancel");

        }
      );
    }
  }


  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
    if (this.password === 'password') {
      this.password = 'text';
      this.fieldTextType = true;
    } else {
      this.password = 'password';
      this.fieldTextType = false;
    }
  }

}
