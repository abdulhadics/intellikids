import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  activeList: number | null = null;

  toggleListVisibility(listNumber: number) {
    if (this.activeList === listNumber) {
      // Clicking the same button again should hide the list
      this.activeList = null;
    } else {
      this.activeList = listNumber;
    }
  }

}
