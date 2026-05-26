import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule }
from '@angular/material/toolbar';

import { MatIconModule }
from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [FormsModule,RouterOutlet, Header,MatButtonModule,MatToolbarModule,
MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MyFood');
}
