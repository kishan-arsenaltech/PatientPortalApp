import {
  Component, OnInit, OnDestroy, inject, signal, computed, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, interval } from 'rxjs';
import { takeUntil, debounceTime, startWith } from 'rxjs/operators';

import { ReferralFormService } from '../../services/referral-form.service';
import { SectionProgress, ChipOption, ReferralFormData } from '../../models/referral-form.model';
import { phoneValidator, npiValidator, dobValidator } from '../../validators/referral.validators';

import { SectionCardComponent } from '../../components/section-card/section-card.component';
import { ChipSelectComponent } from '../../components/chip-select/chip-select.component';
import { ProgressSidebarComponent } from '../../components/progress-sidebar/progress-sidebar.component';
import { FormFooterComponent } from '../../components/form-footer/form-footer.component';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { InfoBannerComponent } from '../../components/info-banner/info-banner.component';

@Component({
  selector: 'app-referral-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SectionCardComponent,
    ChipSelectComponent,
    ProgressSidebarComponent,
    FormFooterComponent,
    PageHeaderComponent,
    InfoBannerComponent,
  ],
  templateUrl: './referral-form.component.html',
  styleUrls: ['./referral-form.component.css']
})
export class ReferralFormComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  readonly formService = inject(ReferralFormService);

  private destroy$ = new Subject<void>();

  isSubmitting = signal(false);
  isSaving = signal(false);
  submitError = signal<string | null>(null);
  lastSavedLabel = signal('');

  form!: FormGroup;

  sections = signal<SectionProgress[]>([
    { id: 'patient', anchor: 'sec-patient', label: 'Patient information', completedFields: 0, totalFields: 7, isActive: true },
    { id: 'order', anchor: 'sec-order', label: 'Order details', completedFields: 0, totalFields: 5, isActive: false },
    { id: 'insurance', anchor: 'sec-insurance', label: 'Insurance & routing', completedFields: 0, totalFields: 3, isActive: false },
  ]);

  // Chip options
  readonly sexOptions: ChipOption[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Non-binary', value: 'non-binary' },
    { label: 'Decline', value: 'decline' },
  ];

  readonly orderTypeOptions: ChipOption[] = [
    { label: 'CPAP / BiPAP', value: 'cpap-bipap' },
    { label: 'Oxygen', value: 'oxygen' },
    { label: 'Diabetic supplies', value: 'diabetic-supplies' },
    { label: 'Mobility', value: 'mobility' },
    { label: 'Wound care', value: 'wound-care' },
    { label: 'Other', value: 'other' },
  ];

  readonly priorityOptions: ChipOption[] = [
    { label: 'Standard', value: 'standard' },
    { label: 'Expedited', value: 'expedited' },
    { label: 'STAT', value: 'stat' },
  ];

  readonly contactOptions: string[] = ['Phone (voice)', 'SMS', 'Email', 'Patient portal'];
  readonly payerOptions: string[] = ['BCBS · PPO', 'Aetna', 'Humana', 'UnitedHealthcare', 'Medicare'];
  readonly secondaryPayerOptions: string[] = ['None', 'Medicare', 'Medicaid'];
  readonly branchOptions: string[] = [
    'Austin, TX — North',
    'Austin, TX — Central',
    'Dallas, TX — DTX-01'
  ];

  requiredFieldsRemaining = computed(() => {
    if (!this.form) return 0;
    const requiredControls = [
      this.form.get('patient.firstName'),
      this.form.get('patient.lastName'),
      this.form.get('patient.dateOfBirth'),
      this.form.get('patient.phone'),
      this.form.get('patient.streetAddress'),
      this.form.get('order.orderType'),
      this.form.get('order.physicianNpi'),
      this.form.get('insurance.primaryPayer'),
      this.form.get('insurance.memberId'),
    ];
    return requiredControls.filter(c => c && c.invalid).length;
  });

  ngOnInit(): void {
    this.buildForm();
    this.setupAutoSave();
    this.setupProgressTracking();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      patient: this.fb.group({
        firstName: ['', Validators.required],
        middleName: [''],
        lastName: ['', Validators.required],
        dateOfBirth: ['', [Validators.required, dobValidator()]],
        sex: [null],
        phone: ['', [Validators.required, phoneValidator()]],
        email: ['', Validators.email],
        preferredContact: ['Phone (voice)'],
        streetAddress: ['', Validators.required],
      }),
      order: this.fb.group({
        orderType: [null, Validators.required],
        hcpcsCodes: [''],
        physicianNpi: ['', [Validators.required, npiValidator()]],
        clinicalNotes: ['', Validators.maxLength(2000)],
        fulfillmentDate: [''],
        priority: ['standard'],
      }),
      insurance: this.fb.group({
        primaryPayer: ['', Validators.required],
        memberId: ['', Validators.required],
        secondaryPayer: ['None'],
        assignedBranch: ['Austin, TX — North'],
        runEligibilityCheck: [true],
        hasPriorAuth: [false],
      }),
    });
  }

  private setupAutoSave(): void {
    // Auto-save every 30 seconds when form is dirty
    interval(30000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      if (this.form.dirty) this.doSaveDraft();
    });

    // Update last saved label every 15s
    interval(15000).pipe(
      takeUntil(this.destroy$),
      startWith(0)
    ).subscribe(() => {
      this.lastSavedLabel.set(this.formService.getLastSavedLabel());
    });
  }

  private setupProgressTracking(): void {
    this.form.valueChanges.pipe(
      debounceTime(200),
      takeUntil(this.destroy$)
    ).subscribe(() => this.updateSectionProgress());
  }

  private updateSectionProgress(): void {
    const patientGroup = this.form.get('patient');
    const orderGroup = this.form.get('order');
    const insuranceGroup = this.form.get('insurance');

    const countValid = (controls: string[], group: any): number =>
      controls.filter(c => group?.get(c)?.valid && group?.get(c)?.value).length;

    const updated = this.sections().map(s => {
      if (s.id === 'patient') {
        s.completedFields = countValid(
          ['firstName', 'lastName', 'dateOfBirth', 'phone', 'streetAddress', 'email', 'sex'],
          patientGroup
        );
      } else if (s.id === 'order') {
        s.completedFields = countValid(
          ['orderType', 'hcpcsCodes', 'physicianNpi', 'clinicalNotes', 'fulfillmentDate'],
          orderGroup
        );
      } else if (s.id === 'insurance') {
        s.completedFields = countValid(
          ['primaryPayer', 'memberId', 'assignedBranch'],
          insuranceGroup
        );
      }
      return { ...s };
    });
    this.sections.set(updated);
  }

  onSaveDraft(): void {
    this.doSaveDraft();
  }

  private doSaveDraft(): void {
    this.isSaving.set(true);
    const data = this.form.value as ReferralFormData;
    this.formService.saveDraft(data).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.lastSavedLabel.set(this.formService.getLastSavedLabel());
      },
      error: () => this.isSaving.set(false)
    });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.isSubmitting.set(true);
    this.submitError.set(null);
    const data = this.form.value as ReferralFormData;

    this.formService.submitReferral(data).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.router.navigate(['/inbox']);
      },
      error: (err: any) => {
        this.isSubmitting.set(false);
        this.submitError.set(err?.error?.Message || 'Submission failed. Please try again.');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }

  onDiscard(): void {
    this.router.navigate(['/dashboard']);
  }

  hasError(path: string, error: string): boolean {
    const ctrl = this.form.get(path);
    return !!(ctrl?.touched && ctrl?.hasError(error));
  }

  isDirty(path: string): boolean {
    return !!this.form.get(path)?.dirty;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
