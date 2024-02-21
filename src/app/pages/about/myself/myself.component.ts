import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseDataService } from '../../../servies/firebase-data.service';
import { Profile } from '../../../interface/profile.interface';

@Component({
  selector: 'app-myself',
  templateUrl: './myself.component.html',
  styleUrl: './myself.component.scss'
})
export class MyselfComponent {
  myForm!: FormGroup;
  myselfData: Profile = {
    titles: [],
    profileImages: "",
    bannerImages: "",
    name: '',
    email: '',
    birthDay: {
      seconds: 0,
      nanoseconds: 0,
    },
    phoneNumber: 0,
    city: '',
    state: '',
    country: '',
    freelanceStatus: '',
    jobStatus: '',
    mainRoles: '',
    degree: '',
    aboutInformation: '',
    quotes: '',
    summary: '',
    id: '',
  };

  edit: FormControl = new FormControl();
  constructor(private formBuilder: FormBuilder, private firebaseDataService: FirebaseDataService) { }
  ngOnInit(): void {
    this.firebaseDataService.getmySelfCollection().subscribe((res: any) => {
      this.myselfData = res[0]
    })
    this.myForm = this.formBuilder.group({
      titles: ['', Validators.required],
      profileImages: [''],
      bannerImages: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDay: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      freelanceStatus: ['', Validators.required],
      jobStatus: ['', Validators.required],
      mainRoles: ['', Validators.required],
      quotes: ['', Validators.required],
      aboutInformation: ['', Validators.required],
      summary: ['', Validators.required],
      degree: ['', Validators.required]
    });
    this.edit.valueChanges.subscribe(value => {
      if (value) {
        this.patchValues();
      }
    });
  }
  patchValues() {
    this.myForm.patchValue({
      titles: this.myselfData.titles.join(', '),
      profileImages: this.myselfData.profileImages,
      bannerImages: this.myselfData.bannerImages,
      name: this.myselfData.name,
      email: this.myselfData.email,
      birthDay: this.myselfData.birthDay,
      phoneNumber: this.myselfData.phoneNumber,
      city: this.myselfData.city,
      state: this.myselfData.state,
      country: this.myselfData.country,
      freelanceStatus: this.myselfData.freelanceStatus,
      jobStatus: this.myselfData.jobStatus,
      mainRoles: this.myselfData.mainRoles,
      quotes: this.myselfData.quotes,
      aboutInformation: this.myselfData.aboutInformation,
      summary: this.myselfData.summary,
      degree: this.myselfData.degree
    });
  }
  getBrith(brith: any): string {
    return brith.toDate().toLocaleDateString('en-GB')
  }
  submit() {
    if (this.myForm.valid) {
      this.myForm.value.titles = this.myForm.value.titles.split(',')
      this.firebaseDataService.updateMySelfCollection(this.myForm.value, this.myselfData.id)
      this.edit.setValue(false)
    }
  }
}
