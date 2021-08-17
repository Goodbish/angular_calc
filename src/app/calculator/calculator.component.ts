import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  currentNumber: number = 0;
  newNumber: number = 0;
  newNumberTrigger: boolean = false;
  currentOperation: string = '';
  result: number = 0;

  getNumber(num:number) {
      if (this.newNumberTrigger) {
          let currentStringNumber = String(this.newNumber);
          let stringNumber = String(num);
          let resultString = currentStringNumber + stringNumber;
          this.newNumber = Number(resultString);
          this.getLogs();
      } else {
          if (this.currentOperation == 'C' || this.currentOperation == 'Del' || this.currentOperation == '%') {
              this.currentOperation = '';
          }
          let currentStringNumber = String(this.currentNumber);
          let stringNumber = String(num);
          let resultString = currentStringNumber + stringNumber;
          this.currentNumber = Number(resultString);
          this.result = this.currentNumber;
          this.getLogs();
      }
  }

  setOperation(operation:string) {
      switch (operation) {
          case 'C':
              this.currentNumber = 0;
              this.newNumber = 0;
              this.result = 0;
              break;
          case 'Del':
              if (this.newNumberTrigger) {
                  let stringNum = String(this.newNumber);
                  stringNum = stringNum.substring(0, stringNum.length - 1);
                  this.newNumber = Number(stringNum);
              } else {
                  let stringNum = String(this.currentNumber);
                  stringNum = stringNum.substring(0, stringNum.length - 1);
                  this.currentNumber = Number(stringNum);
                  this.result = this.currentNumber;
              }
              break;
          case '%':
              if (this.newNumberTrigger) {
                  this.result = (this.currentNumber / this.newNumber) * 100;
                  this.newNumberTrigger = false;
              } else {
                  this.currentNumber = this.currentNumber / 100;
                  this.result = this.currentNumber;
              }
              break;
          case '+':
          case 'X':
          case '-':
          case '/':
              this.newNumberTrigger = true;
              if (this.newNumber !== 0) {
                  this.currentNumber = this.result;
              }
              if (this.currentOperation !== '') {
                  this.getValue();
                  this.newNumberTrigger = true;
              }
              break;
      }
      this.currentOperation = operation;

      this.getLogs();
  }

  getValue() {
      switch (this.currentOperation) {
          case '+':
              this.result = this.currentNumber + this.newNumber;
              break;
          case 'X':
              this.result = this.currentNumber * this.newNumber;
              break;
          case '/':
              this.result = this.currentNumber / this.newNumber;
              this.result = Number(this.result.toFixed(11));
              break;
          case '-':
              this.result = this.currentNumber - this.newNumber;
              break;
      }
      this.currentNumber = this.result;
      this.newNumberTrigger = false;
      this.currentOperation = '';
      this.newNumber = 0;
      this.getLogs();
  }

  getLogs() {
      console.log(` currentNumber: ${this.currentNumber} \n newNumber: ${this.newNumber} \n newNumberTrigger: ${this.newNumberTrigger} \n currentOperation: ${this.currentOperation} \n result: ${this.result}`)
  }
}
