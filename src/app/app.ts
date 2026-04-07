import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Breadcrumb } from './components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, Breadcrumb],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  router = inject(Router);
  route = inject(ActivatedRoute);

  hideLayout = false;
  hideBreadcrumb = false;

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let current = this.route.firstChild;

        while (current?.firstChild) {
          current = current.firstChild;
        }

        this.hideLayout = current?.snapshot.data['hideLayout'] ?? false;
        this.hideBreadcrumb = current?.snapshot.data['hideBreadcrumb'] ?? false;
      }
    });
  }
}

// const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

// if (nav?.type === 'reload') {
//   this.router.navigate(['/']);
// }
// if (performance.navigation.type === 1) {
//   this.router.navigate(['/']);
// }
