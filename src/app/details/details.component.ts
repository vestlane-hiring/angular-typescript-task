import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location.model';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup} from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article *ngIf="housingLocation">
      <img class="listing-photo" [src]="housingLocation.photo"
        alt="Exterior photo of {{housingLocation.name}}"/>
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation.name}}</h2>
        <p class="listing-location">{{housingLocation.city}}, {{housingLocation.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{housingLocation.availableUnits}}</li>
          <li>Does this location have wifi: {{housingLocation.wifi}}</li>
          <li>Does this location have laundry: {{housingLocation.laundry}}</li>
        </ul>
      </section>
      <section *ngIf="housingLocation.feedbacks?.length" class="feedbacks">
        <h2 class="section-heading">Feedbacks</h2>
        <dl *ngFor="let feedback of housingLocation.feedbacks">
          <dt>User</dt>
          <dd>{{feedback.firstName}} {{feedback.lastName}} ({{feedback.email}})</dd>
          <dt>Rating</dt>
          <dd>{{feedback.rating}}</dd>
          <dt>Comment</dt>
          <dd>{{feedback.comment}}</dd>
        </dl>
      </section>
      <br />
      
      <section class="listing-apply">
        <h2 class="section-heading">Leave a feedback</h2>
        <form [formGroup]="feedbackForm" (submit)="submitFeedback()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName">

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName">

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email">

          <label for="email">Rating</label>
          <input id="rating" type="text" formControlName="rating">

          <label for="comment">Comment</label>
          <textarea id="comment" rows="4" cols="50" formControlName="comment"></textarea>
          
          <br />
          <button type="submit" class="primary">Submit</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);

  housingLocation!: HousingLocation;
  feedbackForm = new UntypedFormGroup({
    firstName: new UntypedFormControl(''),
    lastName: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    rating: new UntypedFormControl(''),
    comment: new UntypedFormControl(''),
  });

  ngOnInit(): void {
    const housingLocationId = +this.route.snapshot?.params?.['id'];
    this.housingService.getHousingLocationById(housingLocationId).subscribe(housingLocation => {
      if (housingLocation) {
        this.housingLocation = housingLocation;
      }
    });
  }

  submitFeedback(): void {
    const formData = this.feedbackForm.value;

    if (this.feedbackForm.valid) {
      this.housingService.submitApplication(formData);
    }
  }
}
