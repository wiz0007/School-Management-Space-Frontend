import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-final-cta',
  templateUrl: './final-cta.html',
  styleUrl: './final-cta.scss'
})
export class FinalCta {
  @Input() isAuthenticated = false;
}