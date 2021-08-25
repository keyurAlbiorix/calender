import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  dataStorage: any;
  onSave = new EventEmitter();
  food: any
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddTaskComponent, private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.dataStorage = this.data
    this.form = this.fb.group({
      eventName: ['', [Validators.required]],
    })
}
  addRowData() {
    // this.onSave.emit(this.data)
    this.dialogRef.close(this.form);
  }
}
