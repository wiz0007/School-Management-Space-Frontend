import { Component } from '@angular/core';

@Component({
  selector: 'app-product-desks',
  templateUrl: './product-desks.html',
  styleUrl: './product-desks.scss'
})
export class ProductDesks {
  protected readonly modules = [
    { name: 'Admissions', detail: 'Move enquiries into enrolled profiles.', action: 'Open pipeline', tone: 'warm', size: 'hero' },
    { name: 'Students', detail: 'Records, guardians, class history.', action: 'Manage records', tone: 'blue', size: 'tall' },
    { name: 'Attendance', detail: 'Daily register from live rosters.', action: 'Run today', tone: 'ink', size: 'wide' },
    { name: 'Staff', detail: 'Roles, teachers, ownership.', action: 'Build team', tone: 'sand', size: 'base' },
    { name: 'Fees', detail: 'Dues, receipts, payment movement.', action: 'View desk', tone: 'brick', size: 'base' },
    { name: 'Reports', detail: 'Activity into fast decisions.', action: 'See reports', tone: 'paper', size: 'base' }
  ];

  protected readonly tickerItems = ['Admissions', 'Students', 'Staff', 'Classes', 'Attendance', 'Fees', 'Reports'];
}