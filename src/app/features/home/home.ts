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

  protected readonly navigationItems = [
    { label: 'Promise', href: '#promise' },
    { label: 'Journey', href: '#journey' },
    { label: 'Modules', href: '#modules' },
    { label: 'People', href: '#people' },
    { label: 'Trust', href: '#trust' }
  ];

  protected readonly operatingPromises = [
    'Replace scattered registers with one school workspace',
    'Start each day with students, staff, classes, and attendance aligned',
    'Keep visitors informed and signed-in users focused on real work'
  ];

  protected readonly journeyStages = [
    {
      label: 'First setup',
      title: 'Create the school workspace',
      detail: 'Open the product with a clear public story, then register the administrator who will run the workspace.'
    },
    {
      label: 'Institution desk',
      title: 'Set the school identity',
      detail: 'Capture profile, academic year, contact details, timezone, and operating status once.'
    },
    {
      label: 'Records room',
      title: 'Bring people into order',
      detail: 'Build student and staff records with details that the daily workflow can reuse.'
    },
    {
      label: 'Academic floor',
      title: 'Shape classes and sections',
      detail: 'Connect students, staff, and class structures so the school day has a real operating map.'
    },
    {
      label: 'Morning bell',
      title: 'Run attendance from rosters',
      detail: 'Mark daily attendance from actual class assignments instead of disconnected lists.'
    }
  ];

  protected readonly moduleSuites = [
    {
      name: 'Student Office',
      summary: 'Student records, guardians, class assignment, and enrollment-ready details.',
      items: ['Student profile', 'Guardian contact', 'Class link', 'Status']
    },
    {
      name: 'Faculty Desk',
      summary: 'Staff records and the foundation for role-based school workflows.',
      items: ['Employee profile', 'Contact details', 'Teacher assignment', 'Updates']
    },
    {
      name: 'Academic Floor',
      summary: 'Class sections, capacity, teacher ownership, and academic year structure.',
      items: ['Classes', 'Sections', 'Class teacher', 'Capacity']
    },
    {
      name: 'Daily Register',
      summary: 'Attendance built around rosters, daily status, and future reporting.',
      items: ['Roster view', 'Present/absent', 'Late/excused', 'History-ready']
    }
  ];

  protected readonly audienceCards = [
    {
      audience: 'School owners',
      line: 'See whether the school is ready to operate digitally.',
      detail: 'The intro explains the product clearly, while the dashboard keeps actual operations private.'
    },
    {
      audience: 'Administrators',
      line: 'Move from setup to daily records without switching tools.',
      detail: 'School profile, students, staff, classes, and attendance follow one connected routine.'
    },
    {
      audience: 'Teachers',
      line: 'Start the day from clean class rosters.',
      detail: 'Attendance is designed around real class assignments instead of repeated manual lists.'
    }
  ];

  protected readonly trustPoints = [
    'Private workspace after login',
    'Clean public visitor experience',
    'Real records, not demo counters',
    'School-owned operational data',
    'Prepared for roles and reporting',
    'Built to grow module by module'
  ];

  protected readonly nextMoves = [
    'Attendance reports by class and date',
    'Student edit and profile history',
    'Parent communication layer',
    'Export-ready school summaries'
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