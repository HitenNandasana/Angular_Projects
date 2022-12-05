import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(private bottomSheet: MatBottomSheet,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: Router) { }

  myForm: FormBuilder | any;
  options: string[] = ['One', 'Two', 'Three', 'apple', 'banana', 'kiwi', 'mango'];
  filteredOptions: Observable<string[]> | undefined;
  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skills: any = ['Angular', 'Web', 'HTML'];

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      uname: ['', Validators.required],
      date: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['male', Validators.required],
      address: ['', Validators.required],
      status: ['', Validators.required],
      skill: [''],
      hobby: this.formBuilder.group({
        cricket: false,
        chess: false,
        carrom: false,
      })
    })
    this.filteredOptions = this.myForm.get('uname').valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value || '')),
    );
  }

  onNavigate(link: any) {
    this.activeLink = link;
    this.route.navigate(['dialog'])
  }
  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetComponent);
  }

  openDialog() {
    this.dialog.open(DialogBoxComponent);
  }

  openSnackBar() {
    this.snackBar.open('This is SnackBar!', 'Wohooo!!!!', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.skills.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(skills: any): void {
    const index = this.skills.indexOf(skills);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.myForm.value.skill = this.skills;
      console.log(this.myForm.value);
      localStorage.setItem('myData', JSON.stringify(this.myForm.value));
    }
  }

  private filter(value: any): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}

