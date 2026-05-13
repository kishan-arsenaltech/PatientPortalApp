import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardSummary } from '../../models/dashboard-summary.model';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent {
  @Input() summary: DashboardSummary | null = null;
}
