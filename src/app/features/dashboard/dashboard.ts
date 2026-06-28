import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { ModuleEmptyStates } from './components/module-empty-states/module-empty-states';
import { SchoolProfileSection } from './components/school-profile-section/school-profile-section';
import { StaffSection } from './components/staff-section/staff-section';
import { StudentsSection } from './components/students-section/students-section';

@Component({
  selector: 'app-dashboard',
  imports: [SchoolProfileSection, StudentsSection, StaffSection, ModuleEmptyStates],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly currentUser = this.authService.currentUser;
  protected readonly hasSchoolProfile = signal(false);
  protected readonly studentReloadKey = signal(0);

  protected readonly navigationItems = [
    { code: 'DB', label: 'Dashboard', active: true },
    { code: 'SP', label: 'School Profile', active: false },
    { code: 'ST', label: 'Students', active: false },
    { code: 'SF', label: 'Staff', active: false },
    { code: 'CL', label: 'Classes', active: false },
    { code: 'AT', label: 'Attendance', active: false },
    { code: 'FE', label: 'Fees', active: false },
    { code: 'RP', label: 'Reports', active: false }
  ];

  protected onSchoolProfileStateChange(exists: boolean): void {
    this.hasSchoolProfile.set(exists);
    if (exists) {
      this.studentReloadKey.update((value) => value + 1);
    }
  }

  protected logout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigateByUrl('/home'),
      error: () => this.router.navigateByUrl('/home')
    });
  }
}