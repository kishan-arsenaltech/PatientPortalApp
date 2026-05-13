import { Injectable, signal, computed } from '@angular/core';
import { Patient, SavedSearch, MarketStat } from '../models/adherence.model';

@Injectable({
  providedIn: 'root'
})
export class AdherenceService {
  private patients = signal<Patient[]>([
    {name:'Roberto Martinez', id:'P-284117', initials:'RM', market:'Austin, TX',  order:'SO-44218', orderAge:'2 mo ago', comp:92, status:{label:'Active', cls:'badge-success'}},
    {name:'Janice Alvarez',   id:'P-284032', initials:'JA', market:'Dallas, TX',  order:'SO-44103', orderAge:'6 wk ago', comp:74, status:{label:'At risk', cls:'badge-warning'}},
    {name:'Kenneth Brooks',   id:'P-283912', initials:'KB', market:'Phoenix, AZ', order:'SO-43891', orderAge:'3 mo ago', comp:41, status:{label:'Non-compliant', cls:'badge-danger'}},
    {name:'Mary Chen',        id:'P-284221', initials:'MC', market:'Denver, CO',  order:'SO-44310', orderAge:'1 wk ago', comp:88, status:{label:'Active', cls:'badge-success'}},
    {name:'Darius Powell',    id:'P-283744', initials:'DP', market:'Atlanta, GA', order:'SO-43610', orderAge:'4 mo ago', comp:68, status:{label:'Follow up',  cls:'badge-primary'}},
    {name:'Susan O\'Neill',   id:'P-284098', initials:'SO', market:'Austin, TX',  order:'SO-44180', orderAge:'5 wk ago', comp:95, status:{label:'Active', cls:'badge-success'}},
    {name:'Michael Tan',      id:'P-284204', initials:'MT', market:'Seattle, WA', order:'SO-44298', orderAge:'2 wk ago', comp:81, status:{label:'Active', cls:'badge-success'}},
    {name:'Elena Vasquez',    id:'P-283601', initials:'EV', market:'Miami, FL',   order:'SO-43455', orderAge:'5 mo ago', comp:52, status:{label:'At risk', cls:'badge-warning'}},
    {name:'James O\'Connor',  id:'P-284011', initials:'JO', market:'Chicago, IL', order:'SO-44022', orderAge:'8 wk ago', comp:77, status:{label:'Follow up', cls:'badge-primary'}},
    {name:'Priya Patel',      id:'P-284255', initials:'PP', market:'Austin, TX',  order:'SO-44345', orderAge:'4 d ago',  comp:99, status:{label:'Active', cls:'badge-success'}},
    {name:'Harold Jenkins',   id:'P-283488', initials:'HJ', market:'Dallas, TX',  order:'SO-43312', orderAge:'6 mo ago', comp:38, status:{label:'Non-compliant', cls:'badge-danger'}},
    {name:'Angela Liu',       id:'P-284167', initials:'AL', market:'Denver, CO',  order:'SO-44256', orderAge:'3 wk ago', comp:86, status:{label:'Active', cls:'badge-success'}},
    {name:'Marcus Webb',      id:'P-283823', initials:'MW', market:'Phoenix, AZ', order:'SO-43788', orderAge:'3 mo ago', comp:64, status:{label:'Follow up', cls:'badge-primary'}},
    {name:'Diana Ross',       id:'P-284287', initials:'DR', market:'Atlanta, GA', order:'SO-44401', orderAge:'2 d ago',  comp:91, status:{label:'Active', cls:'badge-success'}},
    {name:'Samuel Lee',       id:'P-283977', initials:'SL', market:'Seattle, WA', order:'SO-43944', orderAge:'7 wk ago', comp:58, status:{label:'At risk', cls:'badge-warning'}},
  ]);

  private savedLists = signal<SavedSearch[]>([
    { label: 'Patient Search', active: true, color: 'var(--primary-500)' },
    { label: 'Task List', count: 48, color: 'var(--brand-green)' },
    { label: 'Referral List', count: 12, color: 'var(--brand-magenta)' },
    { label: 'At-risk patients', count: 86, color: 'var(--warning)' },
    { label: 'Non-compliant (30d)', count: 22, color: 'var(--danger)' },
  ]);

  private stats = signal<MarketStat[]>([
    { 
      value: '87.2%', 
      label: 'Compliance — Austin, TX', 
      icon: '<path d="M4 10l4 4 8-8"/>', 
      colorClass: 'color-mix(in oklch, var(--success) 70%, black)', 
      bgColor: 'var(--success-soft)' 
    },
    { 
      value: '34', 
      label: 'Outreach due this week', 
      icon: '<path d="M10 3v10M10 16v.5"/><circle cx="10" cy="10" r="7.5"/>', 
      colorClass: 'color-mix(in oklch, var(--warning) 40%, black)', 
      bgColor: 'var(--warning-soft)' 
    },
    { 
      value: '+4.2%', 
      label: 'vs last month', 
      icon: '<path d="M3 15V8m4 7V6m4 9v-5m4 5v-8"/>', 
      colorClass: 'var(--primary-700)', 
      bgColor: 'var(--primary-50)' 
    },
  ]);

  getPatients() {
    return this.patients.asReadonly();
  }

  getSavedLists() {
    return this.savedLists.asReadonly();
  }

  getStats() {
    return this.stats.asReadonly();
  }
}
