import {Component, OnInit} from '@angular/core';
import {Calculator} from "../../classes/calculator";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  data: Calculator;

  constructor() {
      this.data = new Calculator();
  }

  ngOnInit(): void {
  }
}
