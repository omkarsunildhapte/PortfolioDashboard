import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseDataService } from '../../../servies/firebase-data.service';
import { EducationInfo } from '../../../interface/education.interface';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent {
  myForm!: FormGroup;
  edit: FormControl = new FormControl();
  educationData: EducationInfo[] = []
  constructor(private formBuilder: FormBuilder, private firebaseDataServies: FirebaseDataService) { }
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      schoolName: ['', Validators.required],
      startingYear: ['', Validators.required],
      endYear: ['', Validators.required],
      course: ['', Validators.required],
      descriptionCourse: ['', Validators.required],
      projectName: [''],
      projectImg: [''],
      projectDescription: [''],
      participantName: ['']
    });
    this.firebaseDataServies.getMyEducationCollection().subscribe((res: any) => {
      this.educationData = res
    })
  }
  submit() {
    if (this.myForm.valid) {
      this.firebaseDataServies.addMyEducationCollection(this.myForm.value).subscribe((res) => {
        this.edit.setValue(false)
      })
    } else {
    }
  }
}
