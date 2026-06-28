import { Component } from '@angular/core';

@Component({
  selector: 'app-module-empty-states',
  templateUrl: './module-empty-states.html',
  styleUrl: './module-empty-states.scss'
})
export class ModuleEmptyStates {
  protected readonly modules = [
    { title: 'Classes', action: 'Create class structure' },
    { title: 'Attendance', action: 'Prepare attendance settings' },
    { title: 'Fees', action: 'Set up fee categories' },
    { title: 'Exams', action: 'Create exam structure' },
    { title: 'Reports', action: 'Connect real reporting data' }
  ];
}