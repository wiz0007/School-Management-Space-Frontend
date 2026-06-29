import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnChanges, SimpleChanges, inject, input, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AttendanceService } from '../../../../core/attendance/attendance.service';
import { AttendanceStatus } from '../../../../core/attendance/attendance.models';
import { SchoolClass } from '../../../../core/classes/school-class.models';
import { SchoolClassService } from '../../../../core/classes/school-class.service';

type AttendanceEntryFormValue = {
  studentId: string;
  studentName: string;
  admissionNumber: string;
  status: AttendanceStatus;
  remarks: string;
};

@Component({
  selector: 'app-attendance-section',
  imports: [ReactiveFormsModule],
  templateUrl: './attendance-section.html',
  styleUrl: './attendance-section.scss'
})
export class AttendanceSection implements OnChanges {
  private readonly attendanceService = inject(AttendanceService);
  private readonly schoolClassService = inject(SchoolClassService);
  private readonly formBuilder = inject(FormBuilder);

  readonly hasSchoolProfile = input(false);
  readonly reloadKey = input(0);

  protected readonly classes = signal<SchoolClass[]>([]);
  protected readonly isLoadingRoster = signal(false);
  protected readonly isSavingAttendance = signal(false);
  protected readonly attendanceMessage = signal('');
  protected readonly attendanceError = signal('');
  protected readonly statuses: AttendanceStatus[] = ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'];

  protected readonly attendanceForm = this.formBuilder.nonNullable.group({
    classId: ['', [Validators.required]],
    attendanceDate: [this.today(), [Validators.required]],
    entries: this.formBuilder.array([])
  });

  protected get entries(): FormArray {
    return this.attendanceForm.controls.entries;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['hasSchoolProfile'] || changes['reloadKey']) && this.hasSchoolProfile()) {
      this.loadClasses();
    }
  }

  protected loadRoster(): void {
    if (this.attendanceForm.controls.classId.invalid || this.attendanceForm.controls.attendanceDate.invalid) {
      this.attendanceForm.markAllAsTouched();
      return;
    }

    this.attendanceError.set('');
    this.attendanceMessage.set('');
    this.isLoadingRoster.set(true);
    this.entries.clear();

    const { classId, attendanceDate } = this.attendanceForm.getRawValue();
    this.attendanceService.loadRoster(classId, attendanceDate)
      .pipe(finalize(() => this.isLoadingRoster.set(false)))
      .subscribe({
        next: (response) => {
          response.data.forEach((student) => {
            this.entries.push(this.formBuilder.nonNullable.group({
              studentId: [student.studentId, [Validators.required]],
              studentName: [student.studentName],
              admissionNumber: [student.admissionNumber],
              status: [student.status, [Validators.required]],
              remarks: [student.remarks ?? '']
            }));
          });
          if (response.data.length === 0) {
            this.attendanceMessage.set('No students are assigned to this class yet.');
          }
        },
        error: (error: HttpErrorResponse) => this.attendanceError.set(
          error.error?.message ?? 'Unable to load attendance roster.'
        )
      });
  }

  protected saveAttendance(): void {
    if (this.attendanceForm.invalid || this.entries.length === 0) {
      this.attendanceForm.markAllAsTouched();
      if (this.entries.length === 0) {
        this.attendanceError.set('Load a class roster before saving attendance.');
      }
      return;
    }

    this.attendanceError.set('');
    this.attendanceMessage.set('');
    this.isSavingAttendance.set(true);

    const rawValue = this.attendanceForm.getRawValue();
    this.attendanceService.saveAttendance({
      classId: rawValue.classId,
      attendanceDate: rawValue.attendanceDate,
      entries: this.entries.controls.map((control) => {
        const entry = control.getRawValue() as AttendanceEntryFormValue;
        return {
          studentId: entry.studentId,
          status: entry.status,
          remarks: entry.remarks
        };
      })
    })
      .pipe(finalize(() => this.isSavingAttendance.set(false)))
      .subscribe({
        next: () => this.attendanceMessage.set('Attendance saved.'),
        error: (error: HttpErrorResponse) => this.attendanceError.set(
          error.error?.message ?? 'Unable to save attendance.'
        )
      });
  }

  protected markAll(status: AttendanceStatus): void {
    this.entries.controls.forEach((control) => control.patchValue({ status }));
  }

  private loadClasses(): void {
    this.schoolClassService.listClasses().subscribe({
      next: (response) => this.classes.set(response.data.filter((item) => item.status === 'ACTIVE')),
      error: () => undefined
    });
  }

  private today(): string {
    return new Date().toISOString().slice(0, 10);
  }
}