import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  navItems = [
    { label: 'DAILY LOGS', route: '/daily-log' },
    { label: 'PROGRESS', route: '/progress' },
    { label: 'GOALS', route: '/goals' },
    { label: 'LEARNING PLANS', route: '/learning-plan' },
    { label: 'NOTES', route: '/notes' },
    { label: 'DATA', route: '/data' },
  ];
}
