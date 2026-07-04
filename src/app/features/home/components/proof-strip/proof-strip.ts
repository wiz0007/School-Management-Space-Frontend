import { Component } from '@angular/core';

@Component({
  selector: 'app-proof-strip',
  templateUrl: './proof-strip.html',
  styleUrl: './proof-strip.scss'
})
export class ProofStrip {
  protected readonly items = [
    { value: '01', label: 'Fast setup' },
    { value: '24/7', label: 'Protected access' },
    { value: 'Live', label: 'Daily workflows' },
    { value: 'All', label: 'Responsive surfaces' }
  ];
}