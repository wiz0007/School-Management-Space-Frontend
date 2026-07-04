import { Component } from '@angular/core';

@Component({
  selector: 'app-role-routes',
  templateUrl: './role-routes.html',
  styleUrl: './role-routes.scss'
})
export class RoleRoutes {
  protected readonly routes = [
    { role: 'Admin', title: 'Control setup, records, and access.', action: 'Create workspace', code: '01' },
    { role: 'Teacher', title: 'Open classes, students, and attendance.', action: 'Enter class desk', code: '02' },
    { role: 'Office', title: 'Move admissions, fees, and documents.', action: 'Open office flow', code: '03' },
    { role: 'Parent', title: 'See updates without calling the office.', action: 'View portal path', code: '04' }
  ];
}