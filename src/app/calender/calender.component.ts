import { Component, NgZone, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  Days: any = [];
  time: any = ['12:00', '12:15', '12:30', '12:45', '01:00', '01:15', '01:30', '01:45', '02:00', '02:15', '02:30', '02:45', '03:00', '03:15', '03:30', '03:45', '04:00', '04:15', '04:30', '04:45', '05:00', '05:15', '05:30', '05:45', '06:00', '06:15', '06:30', '06:45', '07:00', '07:15', '07:30', '07:45', '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45', '22:00', '22:15', '22:30', '22:45', '23:00', '23:15', '23:30', '23:45', '24:00', '24:15', '24:30', '24:45', '00:00'];
  timeTemp: any = [];
  temp: any = [];
  currentDate: any;
  data: any
  eventData: any
  constructor(public dialog: MatDialog, public ngZone: NgZone) { }

  ngOnInit(): void {
    var startDate = moment();
    var endDate = moment().add(6, 'days');

    this.currentDate = startDate.format('DD/MM/YYYY')
    var day = startDate;
    var data = JSON.parse(localStorage.getItem("eventData")) || [];
    for (var i = 0; i < data.length; i++) {
      for (var j = data[i].days.length - 1; j >= 0; j--) {
        // console.log( data[i].days[j].day );
        // console.log(this.currentDate.split('/2021')[0]);

        if (data[i].days[j].day <= this.currentDate.split('/2021')[0]) {
          // if(data[i].days[j].day=='31/08' ){
          // console.log("hh")
          // console.log(data[i].days[j])
          // data[i].days.splice(j, 1);
          //   }

        }
      }
    }
    // console.log(data);

    while (day <= endDate) {
      this.Days.push(day.format('DD/MM'))
      day = day.clone().add(1, 'd')
    }

    this.timeTemp = []
    this.time.forEach((time, i) => {
      let demo = {
        'time': time,
        'days': []
      }
      this.timeTemp.push(demo);
      this.Days.forEach(day => {
        let days = {
          'day': day,
          meeting: []
        }
        this.timeTemp[i]['days'].push(days)
      });
    });
    // this.ngZone.run(() => {
    if (data?.length !== 0) {
      this.timeTemp = data;
    }
    // console.log(this.timeTemp);
    localStorage.setItem('eventData', JSON.stringify(this.timeTemp))
    // })
  }

  openDialog(dayIndex: any, timeIndex: any) {
    const dialog = this.dialog.open(AddTaskComponent, {
      data: { calendarData: this.timeTemp, dayRecordIndex: dayIndex, timeRecordIndex: timeIndex }
    })
    dialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.eventData = result.value;
      // localStorage.setItem('eventData', (this.eventData.eventName))
    });
  }
  stop(event) {
    event.stopPropagation();
    return false
  }
  removeMeeting(meetingId) {
    var data = JSON.parse(localStorage.getItem("eventData")) || [];
    data?.forEach(time => {
      time?.days.forEach(day => {
        day.meeting.forEach((meeting, i) => {
          if (meeting?.meetingId === meetingId) {
            day.meeting.splice(i, 1);
          }
        });
      });
    });
    this.timeTemp = [...data];
    localStorage.setItem('eventData', JSON.stringify(this.timeTemp))
  }
}
