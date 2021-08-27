import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import {v4 as uuidv4} from 'uuid';

let myuuid = uuidv4();

console.log('Your UUID is: ' + myuuid);
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
  dayIndex;
  timeIndex;
  public list: string[] = [];
  constructor(public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.dayIndex = this.data.dayRecordIndex;
    this.timeIndex = this.data.timeRecordIndex;
    this.dataStorage = this.data.calendarData;
    this.form = this.fb.group({
      eventName: ['', [Validators.required]],
    })
  }
  addRowData() {
    this.list.push(uuid());
    console.log("uuid ::",typeof uuid());
let meetingObje = {
  meetingId :uuid(),
  meeting:this.form.controls.eventName.value
}
    this.dataStorage[this.timeIndex].days[this.dayIndex]['meeting'].push(meetingObje);

    localStorage.setItem('eventData', JSON.stringify(this.dataStorage))
    // this.onSave.emit(this.data)
    this.dialogRef.close(this.dataStorage);
  }
}
