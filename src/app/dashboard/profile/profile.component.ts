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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileData: any;
  updateProfileForm: FormGroup;
  spinner: boolean;
  submitted: boolean;
  fieldTextType: boolean;
  countryCode: any;
  password: string;
  cpassword: string;
  confirmType: boolean;
  loader: boolean;
  showCP: boolean = false;
  changePasswordForm: FormGroup;


  constructor(private apiService: ApiserviceService, private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public router: Router, public dialog: MatDialog) {


    this.updateProfileForm = this.formBuilder.group({
      firstName: ['',
        [Validators.pattern("[A-Za-z ]*")]
      ],
      lastName: ['',
        [Validators.pattern("[A-Za-z ]*")]
      ],
      emailId: ['',
        [Validators.pattern(/(^(.+@.+\..+)$)|(\d{10})/)]
      ],

      phone: ['',
        [Validators.pattern('^[56789]\\d{9}$'), Validators.maxLength(10), Validators.minLength(10)]
      ], countryCoded: ['' ,
      [Validators.required ]
    ]

    });


    this.changePasswordForm = this.formBuilder.group({
    
      password: ['',
        [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]
      ],
      cpassword: ['',
        [Validators.required]
      ]
    });

  }


  get loginGetter() {
    return this.updateProfileForm.controls;
  }

  get changeCP() {
    return this.changePasswordForm.controls;
  }

  ngOnInit(): void {
    this.getProfile()
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

  getProfile() {
    this.apiService.getProfile().subscribe(
      (res: any) => {
        console.log(res)
        this.loader = false
        this.profileData = res.data
        this.updateProfileForm.patchValue({
          firstName: this.profileData?.first_name,
          lastName: this.profileData?.last_name,
          emailId: this.profileData?.email_address,
          phone: this.profileData?.phone,
          countryCoded: this.profileData?.country_code
        });

      },
      (err: any) => {
        console.log(err)
      }
    );
  }

  updateProfile(data: any) {
    this.submitted = true
    this.loader = true

    
    this.apiService.updateProfile(data).subscribe(
      (res: any) => {
        console.log(res)
        this.profileData = res.data
        this._snackBar.open(res.message, "Thanks", {
          duration: 3000
        });
        this.loader = false
      },
      (err: any) => {
        this._snackBar.open(err.message, "Sorry", {
          duration: 3000
        });
        this.loader = false

      }
    );
  }


  change() {
    this.showCP = !this.showCP
    this.changePasswordForm.reset()
    this.submitted = false
  }


  changePassword(data: any) {
    this.spinner = true;
    this.submitted =  true

    if (this.changePasswordForm.invalid) {
      this.spinner =  false
      return
    }

    if(data.password === data.cpassword) {
    this._snackBar.open("New password should not be same as old password", "Ok" , {
      duration: 2000
    });
    this.changePasswordForm.controls.cpassword.reset()
    this.spinner = false
    return
    }

    this.apiService.changePassword(data).subscribe(
      (response: any) => {
        console.log(response)
        this._snackBar.open(response.message, "Thanks", {
          duration: 3000
        });
        this.spinner =  false
        this.showCP = !this.showCP
      }, (err: any) => {
        this._snackBar.open(err.error.message, "Try Again", {
          duration: 3000
        });
        this.spinner = false
      }
    );

  }

}
