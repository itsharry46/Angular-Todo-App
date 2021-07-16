import { Directive, ElementRef, AfterViewInit, Input, SimpleChanges } from '@angular/core';
import tippy from 'tippy.js';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements AfterViewInit {

  @Input('appTooltip') tooltipContent!: string;

  public tippyInstance: any;

  constructor(private elRef: ElementRef) { 

  }

  ngAfterViewInit() {
    tippy(this.elRef.nativeElement, {
      content: this.tooltipContent
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tooltipContent']) {  // input content has changed
      this.updateToolTipContent()
    }
  }

  updateToolTipContent() {
    if (this.tippyInstance) {
      this.tippyInstance.setContent(this.tooltipContent)
    }
  }

}
