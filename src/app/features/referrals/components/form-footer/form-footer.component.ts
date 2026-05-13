import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.css']
})
export class FormFooterComponent {
  @Input() requiredFieldsRemaining = 0;
  @Input() isSubmitting = false;
  @Input() isSaving = false;

  @Output() cancel = new EventEmitter<void>();
  @Output() saveDraft = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<void>();
}
