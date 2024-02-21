import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseDataService } from '../../../servies/firebase-data.service';
import { EducationInfo } from '../../../interface/education.interface';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  myForm!: FormGroup;
  edit: FormControl = new FormControl();
  educationData: EducationInfo[] = []
  constructor(private formBuilder: FormBuilder, private firebaseDataServies: FirebaseDataService) { }
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      startingYear: ['', Validators.required],
      endYear: ['', Validators.required],
      mainTitle: ['', Validators.required],
      location: ['', Validators.required],
      listshow: this.formBuilder.array([])
    });
    this.firebaseDataServies.getMyExperienceCollection().subscribe((res: any) => {
      this.educationData = res
    })
  }

  get form() { return this.myForm.controls; }
  get listshow(): FormArray {
    return this.myForm.get('listshow') as FormArray;
  }

  addListItem() {
    this.listshow.push(this.formBuilder.control('', Validators.required));
  }

  removeListItem(index: number) {
    this.listshow.removeAt(index);
  }
  submit() {
    if (this.myForm.valid) {
      this.firebaseDataServies.addmyExperienceCollection(this.myForm.value).subscribe((res) => {
        this.edit.setValue(false)
      })
    } else {
    }
  }
}
