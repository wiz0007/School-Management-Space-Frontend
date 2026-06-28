import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, output, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { SchoolProfile } from '../../../../core/school/school-profile.models';
import { SchoolProfileService } from '../../../../core/school/school-profile.service';

@Component({
  selector: 'app-school-profile-section',
  imports: [ReactiveFormsModule],
  templateUrl: './school-profile-section.html',
  styleUrl: './school-profile-section.scss'
})
export class SchoolProfileSection implements OnInit {
  private readonly schoolProfileService = inject(SchoolProfileService);
  private readonly formBuilder = inject(FormBuilder);

  readonly profileStateChange = output<boolean>();

  protected readonly schoolProfile = signal<SchoolProfile | null>(null);
  protected readonly isLoadingProfile = signal(false);
  protected readonly isSavingProfile = signal(false);
  protected readonly profileMessage = signal('');
  protected readonly profileError = signal('');

  protected readonly schoolProfileForm = this.formBuilder.nonNullable.group({
    schoolName: ['', [Validators.required, Validators.maxLength(160)]],
    address: ['', [Validators.required, Validators.maxLength(260)]],
    contactEmail: ['', [Validators.required, Validators.email, Validators.maxLength(180)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+()\-\s]{7,40}$/)]],
    academicYear: ['', [Validators.required, Validators.maxLength(40)]],
    principalName: ['', [Validators.required, Validators.maxLength(120)]],
    timezone: ['Asia/Calcutta', [Validators.required, Validators.maxLength(80)]],
    status: ['ACTIVE' as 'ACTIVE' | 'INACTIVE', [Validators.required]]
  });

  ngOnInit(): void {
    this.loadSchoolProfile();
  }

  protected saveSchoolProfile(): void {
    if (this.schoolProfileForm.invalid) {
      this.schoolProfileForm.markAllAsTouched();
      return;
    }

    this.profileError.set('');
    this.profileMessage.set('');
    this.isSavingProfile.set(true);

    this.schoolProfileService.saveProfile(this.schoolProfileForm.getRawValue())
      .pipe(finalize(() => this.isSavingProfile.set(false)))
      .subscribe({
        next: (response) => {
          this.schoolProfile.set(response.data);
          this.profileStateChange.emit(true);
          this.profileMessage.set('School profile saved.');
        },
        error: (error: HttpErrorResponse) => this.profileError.set(
          error.error?.message ?? 'Unable to save school profile.'
        )
      });
  }

  private loadSchoolProfile(): void {
    this.isLoadingProfile.set(true);
    this.schoolProfileService.loadProfile()
      .pipe(finalize(() => this.isLoadingProfile.set(false)))
      .subscribe({
        next: (response) => {
          this.schoolProfile.set(response.data);
          this.profileStateChange.emit(Boolean(response.data));
          if (response.data) {
            this.schoolProfileForm.patchValue(response.data);
          }
        },
        error: () => this.profileError.set('Unable to load school profile.')
      });
  }
}