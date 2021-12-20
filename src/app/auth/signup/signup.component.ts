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
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  Router
} from '@angular/router';
import {
  ApiserviceService
} from 'src/app/apiservice.service';
import {
  AuthService
} from 'src/app/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  spinner: boolean;
  submitted: boolean;
  fieldTextType: boolean;
  countryCode: any;
  password: string;
  cpassword: string;
  confirmType: boolean;

  constructor(private apiService: ApiserviceService, private authService: AuthService, private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public router: Router, public dialog: MatDialog) {


    this.signUpForm = this.formBuilder.group({
      firstName: ['',
        [Validators.required, Validators.pattern("[A-Za-z ]*")]
      ],
      lastName: ['',
        [Validators.required, Validators.pattern("[A-Za-z ]*")]
      ],
      emailId: ['',
        [Validators.required, Validators.pattern(/(^(.+@.+\..+)$)|(\d{10})/)]
      ],
      password: ['',
        [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]
      ],
      cpassword: ['',
        [Validators.required]
      ],
      phone: ['',
        [Validators.required ,   Validators.pattern('^[56789]\\d{9}$'), Validators.maxLength(10), Validators.minLength(10)]
      ]
      ,
      countryCode: ['+91',
        [Validators.required ]
      ]
    });
  }


  get loginGetter() {
    return this.signUpForm.controls;
  }

  ngOnInit() {
    this.password = 'password';
    this.cpassword = 'password';
    this.countryList()
  }


  countryList() {
    this.apiService.counytryList().subscribe(
      (res:any) => {
        this.countryCode = res.countrycoderesponse

      }, (err:any) => {
        
      }
    );
  }

  register(data: any) {
    console.log(data)
    this.spinner = true;
    this.submitted = true;
    if (this.signUpForm.invalid) {
      this.spinner = false;
      return;
    } else {

      if (data.password === data.cpassword) {

      this.apiService.register(data).subscribe(
        (response: any) => {
          this.spinner = false
          console.log(response)
          this._snackBar.open("Registered Successfully", "Thanks");
          this.router.navigate(["/"])

        }, (error: any) => {
          this.spinner = false
          console.log(error)
          console.log(this.spinner)
          this._snackBar.open(error.error.message, "Try Again");

        }
      );
      } else {
        this._snackBar.open("Confirm password should be same as password", "Ok");
        this.signUpForm.controls.cpassword.reset()
        this.spinner = false
      }
    }

  }

  toggleFieldTextType() {
    console.log(this.password, this.fieldTextType); 
    this.fieldTextType = !this.fieldTextType;
        console.log(this.password); 
        if (this.password === 'password') {
          this.password = 'text';
          this.fieldTextType = true;
        } else {
          this.password = 'password';
          this.fieldTextType = false;
        }
  }

  confirmTextType() {
    console.log(this.cpassword, this.confirmType); 
    this.confirmType = !this.confirmType;
        console.log(this.password); 
        if (this.cpassword === 'password') {
          this.cpassword = 'text';
          this.confirmType = true;
        } else {
          this.cpassword = 'password';
          this.confirmType = false;
        }
  }

}
