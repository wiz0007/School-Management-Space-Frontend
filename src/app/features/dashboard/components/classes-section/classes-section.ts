import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnChanges, SimpleChanges, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { SchoolClass } from '../../../../core/classes/school-class.models';
import { SchoolClassService } from '../../../../core/classes/school-class.service';
import { StaffMember } from '../../../../core/staff/staff.models';
import { StaffService } from '../../../../core/staff/staff.service';

@Component({
  selector: 'app-classes-section',
  imports: [ReactiveFormsModule],
  templateUrl: './classes-section.html',
  styleUrl: './classes-section.scss'
})
export class ClassesSection implements OnChanges {
  private readonly schoolClassService = inject(SchoolClassService);
  private readonly staffService = inject(StaffService);
  private readonly formBuilder = inject(FormBuilder);

  readonly hasSchoolProfile = input(false);
  readonly reloadKey = input(0);

  protected readonly classes = signal<SchoolClass[]>([]);
  protected readonly staffMembers = signal<StaffMember[]>([]);
  protected readonly editingClassId = signal<string | null>(null);
  protected readonly isLoadingClasses = signal(false);
  protected readonly isSavingClass = signal(false);
  protected readonly classMessage = signal('');
  protected readonly classError = signal('');

  protected readonly classForm = this.formBuilder.nonNullable.group({
    className: ['', [Validators.required, Validators.maxLength(80)]],
    sectionName: ['', [Validators.required, Validators.maxLength(80)]],
    academicYear: ['', [Validators.required, Validators.maxLength(40)]],
    classTeacherId: [''],
    capacity: [40, [Validators.required, Validators.min(1), Validators.max(500)]],
    status: ['ACTIVE' as 'ACTIVE' | 'INACTIVE', [Validators.required]]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['hasSchoolProfile'] || changes['reloadKey']) && this.hasSchoolProfile()) {
      this.loadClasses();
      this.loadStaffOptions();
    }
  }

  protected saveClass(): void {
    if (!this.hasSchoolProfile()) {
      this.classError.set('Create the school profile before adding classes.');
      return;
    }

    if (this.classForm.invalid) {
      this.classForm.markAllAsTouched();
      return;
    }

    this.classError.set('');
    this.classMessage.set('');
    this.isSavingClass.set(true);

    const rawValue = this.classForm.getRawValue();
    const payload = {
      ...rawValue,
      classTeacherId: rawValue.classTeacherId || null
    };
    const editingId = this.editingClassId();
    const request = editingId
      ? this.schoolClassService.updateClass(editingId, payload)
      : this.schoolClassService.createClass(payload);

    request.pipe(finalize(() => this.isSavingClass.set(false))).subscribe({
      next: (response) => {
        if (editingId) {
          this.classes.update((classes) => classes.map((item) => item.id === response.data.id ? response.data : item));
          this.classMessage.set('Class updated.');
        } else {
          this.classes.update((classes) => [response.data, ...classes]);
          this.classMessage.set('Class created.');
        }
        this.clearForm();
      },
      error: (error: HttpErrorResponse) => this.classError.set(
        error.error?.message ?? 'Unable to save class.'
      )
    });
  }

  protected editClass(schoolClass: SchoolClass): void {
    this.editingClassId.set(schoolClass.id);
    this.classMessage.set('');
    this.classError.set('');
    this.classForm.patchValue({
      className: schoolClass.className,
      sectionName: schoolClass.sectionName,
      academicYear: schoolClass.academicYear,
      classTeacherId: schoolClass.classTeacherId ?? '',
      capacity: schoolClass.capacity,
      status: schoolClass.status
    });
  }

  protected cancelEdit(): void {
    this.clearForm();
  }

  private loadClasses(): void {
    this.isLoadingClasses.set(true);
    this.schoolClassService.listClasses()
      .pipe(finalize(() => this.isLoadingClasses.set(false)))
      .subscribe({
        next: (response) => this.classes.set(response.data),
        error: (error: HttpErrorResponse) => {
          if (error.status !== 428) {
            this.classError.set(error.error?.message ?? 'Unable to load classes.');
          }
        }
      });
  }

  private loadStaffOptions(): void {
    this.staffService.listStaff().subscribe({
      next: (response) => this.staffMembers.set(response.data.filter((member) => member.status === 'ACTIVE')),
      error: () => undefined
    });
  }

  private clearForm(): void {
    this.editingClassId.set(null);
    this.classForm.reset({
      className: '',
      sectionName: '',
      academicYear: '',
      classTeacherId: '',
      capacity: 40,
      status: 'ACTIVE'
    });
  }
}