import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChipOption } from '../../models/referral-form.model';

@Component({
  selector: 'app-chip-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chip-select.component.html',
  styleUrls: ['./chip-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ChipSelectComponent),
    multi: true
  }]
})
export class ChipSelectComponent implements ControlValueAccessor {
  @Input({ required: true }) options!: ChipOption[];
  @Input() multiple = false;
  @Input() groupLabel = 'Select option';

  selectedValues: string[] = [];
  isDisabled = false;

  private onChange: (val: string | string[] | null) => void = () => { };
  private onTouched: () => void = () => { };

  isSelected(value: string): boolean {
    return this.selectedValues.includes(value);
  }

  select(value: string): void {
    if (this.isDisabled) return;
    this.onTouched();
    if (this.multiple) {
      this.selectedValues = this.isSelected(value)
        ? this.selectedValues.filter(v => v !== value)
        : [...this.selectedValues, value];
      this.onChange(this.selectedValues);
    } else {
      this.selectedValues = this.isSelected(value) ? [] : [value];
      this.onChange(this.selectedValues[0] ?? null);
    }
  }

  writeValue(val: string | string[] | null): void {
    if (!val) { this.selectedValues = []; return; }
    this.selectedValues = Array.isArray(val) ? val : [val];
  }
  registerOnChange(fn: (val: string | string[] | null) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.isDisabled = isDisabled; }
}
