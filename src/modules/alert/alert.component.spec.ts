import { Component } from '@angular/core';
import {
  ComponentFixture,
  inject,
  TestComponentBuilder
} from '@angular/core/testing';

import { SkyAlertComponent } from './alert.component';
import { SkyResources } from '../resources/resources';

describe('Alert component', () => {
  let tcb: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    tcb = _tcb;
  }));

  it('should hide the close button if it is not cloesable', () => {
    return tcb.createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let closeAttrs: any;
        let cmp = fixture.componentInstance as TestComponent;
        let el = fixture.nativeElement as HTMLElement;

        cmp.closeable = true;

        fixture.detectChanges();

        closeAttrs = el.querySelector('.sky-alert-close').attributes;

        expect(closeAttrs['hidden']).toBe(undefined);

        cmp.closeable = false;

        fixture.detectChanges();

        expect(closeAttrs['hidden']).not.toBeNull();
      });
  });

  it('should be hidden when the close button is clicked', () => {
    tcb.createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let cmp = fixture.componentInstance as TestComponent;
        let el = fixture.nativeElement;

        cmp.closeable = true;

        fixture.detectChanges();

        el.querySelector('.sky-alert-close').click();

        expect(el.querySelector('.sky-alert').attributes.hidden).not.toBeNull();
        expect(cmp.closed).toBe(true);
      });
  });

  it('should allow the screen reader text for the close button to be localizable', () => {
    return tcb.createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let cmp = fixture.componentInstance as TestComponent;
        let el = fixture.nativeElement as HTMLElement;
        let closeEl: any;

        cmp.closeable = true;

        fixture.detectChanges();

        closeEl = el.querySelector('.sky-alert-close');

        expect(closeEl.getAttribute('aria-label')).toBe(SkyResources.getString('alert_close'));
      });
  });

  it('should add the appropriate styling when an alert type is specified', () => {
    return tcb.createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let cmp = fixture.componentInstance as TestComponent;
        let el = fixture.nativeElement as HTMLElement;

        cmp.alertType = 'success';

        fixture.detectChanges();

        let alertEl = el.querySelector('.sky-alert');

        expect(alertEl.classList.contains('sky-alert-success')).toBe(true);
      });
  });

  it('should default to "warning" when no alert type is specified', () => {
    return tcb.createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let cmp = fixture.componentInstance as TestComponent;
        let el = fixture.nativeElement as HTMLElement;

        cmp.alertType = undefined;

        fixture.detectChanges();

        let alertEl = el.querySelector('.sky-alert');

        expect(alertEl.classList.contains('sky-alert-warning')).toBe(true);
      });
  });
});

@Component({
  selector: 'sky-test-cmp',
  directives: [SkyAlertComponent],
  template: `
<sky-alert [closeable]="closeable" [(closed)]="closed" [alertType]="alertType">
  Alert
</sky-alert>
  `
})
class TestComponent {
  public closeable = false;

  public closed = false;

  public alertType = 'info';
}
