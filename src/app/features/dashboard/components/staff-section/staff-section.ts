import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnChanges, SimpleChanges, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { StaffMember } from '../../../../core/staff/staff.models';
import { StaffService } from '../../../../core/staff/staff.service';

@Component({
  selector: 'app-staff-section',
  imports: [ReactiveFormsModule],
  templateUrl: './staff-section.html',
  styleUrl: './staff-section.scss'
})
export class StaffSection implements OnChanges {
  private readonly staffService = inject(StaffService);
  private readonly formBuilder = inject(FormBuilder);

  readonly hasSchoolProfile = input(false);
  readonly reloadKey = input(0);

  protected readonly staffMembers = signal<StaffMember[]>([]);
  protected readonly editingStaffId = signal<string | null>(null);
  protected readonly isLoadingStaff = signal(false);
  protected readonly isSavingStaff = signal(false);
  protected readonly staffMessage = signal('');
  protected readonly staffError = signal('');

  protected readonly staffForm = this.formBuilder.nonNullable.group({
    fullName: ['', [Validators.required, Validators.maxLength(120)]],
    employeeCode: ['', [Validators.required, Validators.maxLength(40)]],
    role: ['', [Validators.required, Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(180)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+()\-\s]{7,40}$/)]],
    department: ['', [Validators.required, Validators.maxLength(100)]],
    joiningDate: ['', [Validators.required]],
    status: ['ACTIVE' as 'ACTIVE' | 'INACTIVE', [Validators.required]]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['hasSchoolProfile'] || changes['reloadKey']) && this.hasSchoolProfile()) {
      this.loadStaff();
    }
  }

  protected saveStaff(): void {
    if (!this.hasSchoolProfile()) {
      this.staffError.set('Create the school profile before adding staff.');
      return;
    }

    if (this.staffForm.invalid) {
      this.staffForm.markAllAsTouched();
      return;
    }

    this.staffError.set('');
    this.staffMessage.set('');
    this.isSavingStaff.set(true);

    const editingId = this.editingStaffId();
    const request = editingId
      ? this.staffService.updateStaff(editingId, this.staffForm.getRawValue())
      : this.staffService.createStaff(this.staffForm.getRawValue());

    request.pipe(finalize(() => this.isSavingStaff.set(false))).subscribe({
      next: (response) => {
        if (editingId) {
          this.staffMembers.update((members) => members.map((member) => member.id === response.data.id ? response.data : member));
          this.staffMessage.set('Staff record updated.');
        } else {
          this.staffMembers.update((members) => [response.data, ...members]);
          this.staffMessage.set('Staff record created.');
        }
        this.clearForm();
      },
      error: (error: HttpErrorResponse) => this.staffError.set(
        error.error?.message ?? 'Unable to save staff record.'
      )
    });
  }

  protected editStaff(member: StaffMember): void {
    this.editingStaffId.set(member.id);
    this.staffMessage.set('');
    this.staffError.set('');
    this.staffForm.patchValue({
      fullName: member.fullName,
      employeeCode: member.employeeCode,
      role: member.role,
      email: member.email,
      phone: member.phone,
      department: member.department,
      joiningDate: member.joiningDate,
      status: member.status
    });
  }

  protected cancelEdit(): void {
    this.clearForm();
  }

  private loadStaff(): void {
    this.isLoadingStaff.set(true);
    this.staffService.listStaff()
      .pipe(finalize(() => this.isLoadingStaff.set(false)))
      .subscribe({
        next: (response) => this.staffMembers.set(response.data),
        error: (error: HttpErrorResponse) => {
          if (error.status !== 428) {
            this.staffError.set(error.error?.message ?? 'Unable to load staff.');
          }
        }
      });
  }

  private clearForm(): void {
    this.editingStaffId.set(null);
    this.staffForm.reset({
      fullName: '',
      employeeCode: '',
      role: '',
      email: '',
      phone: '',
      department: '',
      joiningDate: '',
      status: 'ACTIVE'
    });
  }
}