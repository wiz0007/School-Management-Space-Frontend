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

  protected readonly pageIndex = [
    { number: '01', label: 'Start', href: '#start' },
    { number: '02', label: 'Dayboard', href: '#dayboard' },
    { number: '03', label: 'Security', href: '#security' },
    { number: '04', label: 'Build Path', href: '#build-path' }
  ];

  protected readonly moduleStations = [
    { time: '08:00', title: 'School Profile', tone: 'foundation', description: 'Institution identity, academic year, timezone, status.' },
    { time: '08:30', title: 'Students', tone: 'students', description: 'Real student records with class assignment support.' },
    { time: '09:00', title: 'Staff', tone: 'staff', description: 'Employee records, roles, and update workflows.' },
    { time: '09:30', title: 'Classes', tone: 'classes', description: 'Class sections and optional teacher ownership.' },
    { time: '10:00', title: 'Attendance', tone: 'attendance', description: 'Daily marking from actual class rosters.' },
    { time: 'Next', title: 'Reports', tone: 'reports', description: 'Attendance summaries, histories, and exports.' }
  ];

  protected readonly visitorPaths = [
    {
      label: 'For a visitor',
      title: 'Understand the product before entering the workspace.',
      detail: 'The public site explains what SchoolSys does, where security lives, and which modules are already active.'
    },
    {
      label: 'For an admin',
      title: 'Move directly into protected daily work.',
      detail: 'Authenticated users can jump from the intro into the dashboard without seeing demo records or fake counters.'
    },
    {
      label: 'For development',
      title: 'Add features without tangling the whole product.',
      detail: 'Each school domain keeps its own backend service layer, Angular service, component, and SCSS surface.'
    }
  ];

  protected readonly securityLedger = [
    { label: 'Session', value: 'HttpOnly cookies only' },
    { label: 'Access JWT', value: '15 minute lifetime' },
    { label: 'Refresh JWT', value: '7 day rotation' },
    { label: 'Stolen token catch', value: 'Database hash verification' },
    { label: 'Resource access', value: 'Server-side ownership checks' },
    { label: 'Input boundary', value: 'Validated request DTOs' }
  ];

  protected readonly buildSteps = [
    'Create the administrator workspace',
    'Complete the school profile',
    'Add students, staff, and classes',
    'Run class attendance from real rosters',
    'Expand reports and export workflows'
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