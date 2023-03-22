import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { subDays, startOfDay, addDays, endOfMonth, addHours, isSameMonth, isSameDay, endOfDay } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventColor } from 'calendar-utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'EventCalender';
  @ViewChild('addeditevent', { static: true }) addeditevent: TemplateRef<any> | undefined;
  @ViewChild('viewevent', { static: true }) viewevent: TemplateRef<any> | undefined;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  addEventForm: FormBuilder | any
  submitted = false;
  temp = false;
  isEdit = false;
  colors: Record<string, EventColor> = {}
  activeDayIsOpen: boolean = false;
  editData: any;
  refresh = new Subject<void>();
  events: any = [];
  modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;

  // actions: CalendarEventAction[] = [
  //   {
  //     label: '<i class="fas fa-fw fa-pencil-alt ms-3"></i>',
  //     a11yLabel: 'Edit',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.handleEvent('Edited', event);
  //     },
  //   },
  //   {
  //     label: '<i class="fas fa-fw fa-trash-alt ms-1 text-danger"></i>',
  //     a11yLabel: 'Delete',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.events = this.events.filter((iEvent: any) => iEvent !== event);
  //       this.handleEvent('Deleted', event);
  //     },
  //   },
  // ];

  constructor(private modal: NgbModal, private fb: FormBuilder) {
    if (localStorage.getItem('eventdata') !== null) {
      let array = JSON.parse(localStorage.getItem('eventdata') || '');
      array.map((obj: any) => {
        obj.start = new Date(obj.start);
        obj.end = new Date(obj.end);
        this.events.push(obj);
      })
      console.log(this.events);
    }
  }

  ngOnInit(): void {
    this.addEventForm = this.fb.group({
      title: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      color: ['']
    }, { validator: this.checkDates });
  }

  setFormData() {
    this.addEventForm.patchValue({
      title: this.editData.title,
      start_date: this.formatFormDate(new Date(this.editData.start)),
      end_date: this.formatFormDate(new Date(this.editData.end)),
      // start_date: this.editData.start.toISOString().substring(0, 10),
      // end_date: this.editData.end.toISOString().substring(0, 10),
      color: this.editData.color.primary
    })
  }

  formatFormDate(date: Date) {
    return formatDate(date, 'yyyy-MM-dd', 'en');
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent: any) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.editData = event;
    if (action === 'Deleted') {
      this.deleteEvent(event);
    } else if (action === 'Edited') {
      this.isEdit = true;
      this.setFormData();
      this.modal.open(this.addeditevent, { size: 'md' });
    } else {
      this.modal.open(this.viewevent, { size: 'md' });
    }
  }

  addEvent(): void {
    this.isEdit = false;
    this.temp = false;
    this.addEventForm.reset()
    this.modal.open(this.addeditevent, { size: 'md' });
  }

  editEvent() {
    this.isEdit = true;
    this.setFormData();
    this.modal.open(this.addeditevent, { size: 'md' });
  }

  save() {
    this.temp = true;
    this.colors = {
      color: {
        primary: this.addEventForm.get('color').value,
        secondary: this.addEventForm.get('color').value,
      }
    };
    if (this.addEventForm.valid) {
      this.submitted = true;
      let obj = {
        title: this.addEventForm.get('title').value,
        start: startOfDay(new Date(this.addEventForm.get('start_date').value)),
        end: endOfDay(new Date(this.addEventForm.get('end_date').value)),
        color: this.colors['color'],
        draggable: true,
        // actions: this.actions,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      }
      if (this.isEdit) {
        this.events = this.events.filter((event: any) => event !== this.editData);
        this.events.push(obj);
        localStorage.setItem('eventdata', JSON.stringify(this.events));
      } else {
        // this.events.push(obj);
        this.events = [...this.events, obj];
        localStorage.setItem('eventdata', JSON.stringify(this.events));
      }
      this.modal.dismissAll();
      this.temp = false;
    }
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    if (confirm('Are you sure you want to delete this?')) {
      this.events = this.events.filter((event: any) => event !== eventToDelete);
      localStorage.setItem('eventdata', JSON.stringify(this.events));
      this.activeDayIsOpen = false;
      this.modal.dismissAll()
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  checkDates(group: FormGroup) {
    if (group.controls['end_date'].value < group.controls['start_date'].value) {
      return { notValid: true }
    }
    return null;
  }
}
