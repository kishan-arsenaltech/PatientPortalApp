import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionProgress } from '../../models/referral-form.model';

@Component({
  selector: 'app-progress-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-sidebar.component.html',
  styleUrls: ['./progress-sidebar.component.css']
})
export class ProgressSidebarComponent implements OnInit, OnDestroy {
  @Input({ required: true }) sections!: SectionProgress[];
  @Output() sectionClick = new EventEmitter<string>();

  private observer?: IntersectionObserver;

  ngOnInit(): void {
    // Defer observer setup to ensure DOM is ready
    setTimeout(() => this.setupScrollSpy(), 100);
  }

  private setupScrollSpy(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            this.sections.forEach(s => s.isActive = s.anchor === id);
          }
        });
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );
    this.sections.forEach(s => {
      const el = document.getElementById(s.anchor);
      if (el) this.observer!.observe(el);
    });
  }

  scrollTo(anchor: string): void {
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.sectionClick.emit(anchor);
  }

  getStatusLabel(section: SectionProgress): string {
    if (section.completedFields === 0) return 'Not started';
    if (section.completedFields >= section.totalFields) return 'Complete';
    return `${section.completedFields} of ${section.totalFields} complete`;
  }

  isDone(section: SectionProgress): boolean {
    return section.totalFields > 0 && section.completedFields >= section.totalFields;
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
