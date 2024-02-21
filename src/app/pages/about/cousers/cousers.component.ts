import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EducationInfo } from '../../../interface/education.interface';
import { FirebaseDataService } from '../../../servies/firebase-data.service';

@Component({
  selector: 'app-cousers',
  templateUrl: './cousers.component.html',
  styleUrl: './cousers.component.scss'
})
export class CousersComponent {
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
    this.firebaseDataServies.getMyCourseCollection().subscribe((res: any) => {
      this.educationData = res
    })
  }
  submit() {
    if (this.myForm.valid) {
      this.firebaseDataServies.addmyCourseCollection(this.myForm.value).subscribe((res) => {
        this.edit.setValue(false)
      })
    } else {
    }
  }
}
