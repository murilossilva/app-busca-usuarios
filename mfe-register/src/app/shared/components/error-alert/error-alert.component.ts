import { Component, Input, SimpleChanges } from '@angular/core';
import { faXmark, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ui-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss']
})
export class UiErrorAlertComponent {
  @Input() message: string | null = null;
  @Input() trigger: boolean = false;

  xMarkIcon: IconDefinition = faXmark;

  alertIsVisible: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['trigger']){
      this.alertIsVisible = true;
    }
  }

  closeAlert() {
    this.alertIsVisible = false;
  }
}
