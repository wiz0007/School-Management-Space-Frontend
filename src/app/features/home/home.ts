import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  protected readonly sidebarItems = [
    { code: 'OV', label: 'Overview', active: true },
    { code: 'ST', label: 'Students', active: false },
    { code: 'TC', label: 'Teachers', active: false },
    { code: 'CL', label: 'Classes', active: false },
    { code: 'AT', label: 'Attendance', active: false },
    { code: 'FE', label: 'Fees', active: false },
    { code: 'EX', label: 'Exams', active: false },
    { code: 'RP', label: 'Reports', active: false }
  ];

  protected readonly summaryCards = [
    { label: 'Total students', value: '1,248', detail: '86 new this term' },
    { label: 'Staff members', value: '74', detail: '12 departments' },
    { label: 'Today attendance', value: '92%', detail: 'Updated 10 min ago' },
    { label: 'Pending fees', value: '38', detail: 'Follow-up required' }
  ];

  protected readonly activities = [
    'Grade 8 attendance marked by Priya Sharma',
    'New admission form submitted for Aarav Mehta',
    'Fee receipt generated for Class 10-B',
    'Science exam schedule drafted'
  ];
}
