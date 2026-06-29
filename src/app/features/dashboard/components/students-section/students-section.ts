import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnChanges, SimpleChanges, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { SchoolClass } from '../../../../core/classes/school-class.models';
import { SchoolClassService } from '../../../../core/classes/school-class.service';
import { Student } from '../../../../core/students/student.models';
import { StudentService } from '../../../../core/students/student.service';

@Component({
  selector: 'app-students-section',
  imports: [ReactiveFormsModule],
  templateUrl: './students-section.html',
  styleUrl: './students-section.scss'
})
export class StudentsSection implements OnChanges {
  private readonly studentService = inject(StudentService);
  private readonly schoolClassService = inject(SchoolClassService);
  private readonly formBuilder = inject(FormBuilder);

  readonly hasSchoolProfile = input(false);
  readonly reloadKey = input(0);

  protected readonly students = signal<Student[]>([]);
  protected readonly classes = signal<SchoolClass[]>([]);
  protected readonly isLoadingStudents = signal(false);
  protected readonly isSavingStudent = signal(false);
  protected readonly studentMessage = signal('');
  protected readonly studentError = signal('');

  protected readonly studentForm = this.formBuilder.nonNullable.group({
    fullName: ['', [Validators.required, Validators.maxLength(120)]],
    admissionNumber: ['', [Validators.required, Validators.maxLength(40)]],
    classId: [''],
    className: ['', [Validators.required, Validators.maxLength(80)]],
    sectionName: ['', [Validators.required, Validators.maxLength(80)]],
    dateOfBirth: ['', [Validators.required]],
    gender: ['MALE' as 'MALE' | 'FEMALE' | 'OTHER', [Validators.required]],
    guardianName: ['', [Validators.required, Validators.maxLength(120)]],
    guardianPhone: ['', [Validators.required, Validators.pattern(/^[0-9+()\-\s]{7,40}$/)]],
    guardianEmail: ['', [Validators.email, Validators.maxLength(180)]],
    status: ['ACTIVE' as 'ACTIVE' | 'INACTIVE', [Validators.required]]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['hasSchoolProfile'] || changes['reloadKey']) && this.hasSchoolProfile()) {
      this.loadStudents();
      this.loadClasses();
    }
  }

  protected applySelectedClass(): void {
    const selectedClassId = this.studentForm.controls.classId.value;
    const selectedClass = this.classes().find((item) => item.id === selectedClassId);
    if (!selectedClass) {
      return;
    }

    this.studentForm.patchValue({
      className: selectedClass.className,
      sectionName: selectedClass.sectionName
    });
  }

  protected saveStudent(): void {
    if (!this.hasSchoolProfile()) {
      this.studentError.set('Create the school profile before adding students.');
      return;
    }

    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    this.studentError.set('');
    this.studentMessage.set('');
    this.isSavingStudent.set(true);

    const rawValue = this.studentForm.getRawValue();
    const payload = {
      ...rawValue,
      classId: rawValue.classId || null
    };

    this.studentService.createStudent(payload)
      .pipe(finalize(() => this.isSavingStudent.set(false)))
      .subscribe({
        next: (response) => {
          this.students.update((students) => [response.data, ...students]);
          this.studentMessage.set('Student record created.');
          this.studentForm.reset({
            fullName: '',
            admissionNumber: '',
            classId: '',
            className: '',
            sectionName: '',
            dateOfBirth: '',
            gender: 'MALE',
            guardianName: '',
            guardianPhone: '',
            guardianEmail: '',
            status: 'ACTIVE'
          });
        },
        error: (error: HttpErrorResponse) => this.studentError.set(
          error.error?.message ?? 'Unable to create student record.'
        )
      });
  }

  private loadStudents(): void {
    this.isLoadingStudents.set(true);
    this.studentService.listStudents()
      .pipe(finalize(() => this.isLoadingStudents.set(false)))
      .subscribe({
        next: (response) => this.students.set(response.data),
        error: (error: HttpErrorResponse) => {
          if (error.status !== 428) {
            this.studentError.set(error.error?.message ?? 'Unable to load students.');
          }
        }
      });
  }

  private loadClasses(): void {
    this.schoolClassService.listClasses().subscribe({
      next: (response) => this.classes.set(response.data.filter((item) => item.status === 'ACTIVE')),
      error: () => undefined
    });
  }
}