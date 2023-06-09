import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Pokedex';

  constructor(private router: Router) {}

  viewFavorites(): void {
    this.router.navigate(['/favorites']);
  }

}
