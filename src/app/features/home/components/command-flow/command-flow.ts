import { Component } from '@angular/core';

@Component({
  selector: 'app-command-flow',
  templateUrl: './command-flow.html',
  styleUrl: './command-flow.scss'
})
export class CommandFlow {
  protected readonly steps = [
    { number: '01', label: 'Workspace', title: 'Create the school shell', action: 'Start setup' },
    { number: '02', label: 'People', title: 'Pull students and staff in', action: 'Build records' },
    { number: '03', label: 'Classes', title: 'Shape sections and owners', action: 'Map classes' },
    { number: '04', label: 'Today', title: 'Run the live register', action: 'Open day desk' }
  ];

  protected readonly consoleItems = ['Profile', 'Students', 'Staff', 'Classes', 'Attendance'];
}