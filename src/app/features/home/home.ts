import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly currentUser = this.authService.currentUser;

  protected readonly sidebarItems = [
    { code: 'HM', label: 'Home', active: true },
    { code: 'AD', label: 'Admissions', active: false },
    { code: 'AC', label: 'Academics', active: false },
    { code: 'AT', label: 'Attendance', active: false },
    { code: 'FN', label: 'Finance', active: false },
    { code: 'RP', label: 'Reports', active: false },
    { code: 'ST', label: 'Settings', active: false }
  ];

  protected readonly modules = [
    {
      title: 'Admissions',
      description: 'Build controlled student intake workflows with validation, review, and approval steps.'
    },
    {
      title: 'Academics',
      description: 'Organize classes, subjects, timetables, exams, and academic records from one workspace.'
    },
    {
      title: 'Attendance',
      description: 'Prepare daily attendance operations with role-based access and auditable updates.'
    },
    {
      title: 'Finance',
      description: 'Manage fee structures, payments, receipts, and follow-up workflows securely.'
    }
  ];

  protected readonly setupSteps = [
    'Create the first administrator account',
    'Configure school profile and academic year',
    'Add roles for staff access',
    'Start adding real school records'
  ];

  ngOnInit(): void {
    if (this.currentUser()) {
      return;
    }

    this.authService.loadCurrentUser().subscribe({
      error: () => {
        this.authService.refreshSession().subscribe({
          error: () => undefined
        });
      }
    });
  }

  protected logout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigateByUrl('/home'),
      error: () => this.router.navigateByUrl('/home')
    });
  }
}