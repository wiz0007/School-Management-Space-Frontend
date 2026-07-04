import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { CommandFlow } from './components/command-flow/command-flow';
import { FinalCta } from './components/final-cta/final-cta';
import { ProductDesks } from './components/product-desks/product-desks';
import { ProofStrip } from './components/proof-strip/proof-strip';
import { RoleRoutes } from './components/role-routes/role-routes';

@Component({
  selector: 'app-home',
  imports: [CommandFlow, ProductDesks, RoleRoutes, ProofStrip, FinalCta],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly currentUser = this.authService.currentUser;

  protected readonly navigationItems = [
    { label: 'Product', href: '#product' },
    { label: 'Command', href: '#command' },
    { label: 'Modules', href: '#modules' },
    { label: 'Roles', href: '#roles' }
  ];

  protected readonly heroBanners = [
    { kicker: 'Start', title: 'Create school workspace', action: 'Create workspace', href: '/register', tone: 'green' },
    { kicker: 'Records', title: 'Add students and staff', action: 'Build records', href: '/register', tone: 'blue' },
    { kicker: 'Classes', title: 'Map sections and teachers', action: 'Open classes', href: '/register', tone: 'gold' },
    { kicker: 'Attendance', title: 'Run the daily register', action: 'Mark attendance', href: '/register', tone: 'brick' }
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