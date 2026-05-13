import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppTile } from '../../models/app-tile.model';
import { SafeHtmlPipe } from '../../../../shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-app-tile',
  standalone: true,
  imports: [CommonModule, RouterModule, SafeHtmlPipe],
  templateUrl: './app-tile.component.html',
  styleUrls: ['./app-tile.component.css']
})
export class AppTileComponent {
  @Input() tile!: AppTile;
}
