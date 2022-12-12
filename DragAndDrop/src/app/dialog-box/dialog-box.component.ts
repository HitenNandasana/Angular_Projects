import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  addTask: FormBuilder | any
  submit = false;
  fileHolder: File | undefined;

  ngOnInit(): void {
    this.addTask = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required]
    })
  }

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public name: FormControl,
    private fb: FormBuilder
  ) { }

  onFileSelect(event: any) {
    if (event.target.files && event.target.files.length) {
      this.fileHolder = event.target.files[0];
      this.addTask.get('image').setValue(this.fileHolder);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    this.submit = true;
    if (this.addTask.valid) {
      this.dialogRef.close(this.addTask);
    }
  }
}
