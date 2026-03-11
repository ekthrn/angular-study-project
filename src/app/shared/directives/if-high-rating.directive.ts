import {
  Directive,
  Input,
  TemplateRef, ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appIfHighRating]'
})
export class IfHighRatingDirective {
  private hasView: boolean = false;

  @Input() set appIfHighRating(rating: number) {
    const MIN_RATING = 4.0;

    if (rating >= MIN_RATING && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (rating < MIN_RATING && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }
}
