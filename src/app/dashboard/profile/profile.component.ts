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
      ]

    });
  }


  get loginGetter() {
    return this.updateProfileForm.controls;
  }

  ngOnInit(): void {
    this.getProfile()
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
          phone: this.profileData?.phone
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

    console.log(data)
    this.apiService.updateProfile(data).subscribe(
      (res: any) => {
        console.log(res)
        this.profileData = res.data
        this._snackBar.open(res.message, "Thanks");
        this.loader = false
      },
      (err: any) => {
        this._snackBar.open(err.message, "Sorry");
        this.loader = false

      }
    );
  }

}
