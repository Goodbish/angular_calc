export class Calculator {
    currentNumber: number = 0;
    newNumberTrigger: boolean = false;
    currentOperation: string = '';
    result: number = 0;
    displayNumber: number = 0;

    getNumber(num: number) {
        if (this.newNumberTrigger) {
            const currentStringNumber = String(this.currentNumber);
            const stringNumber = String(num);
            const resultString = currentStringNumber + stringNumber;
            this.currentNumber = Number(resultString);
            this.displayNumber = this.currentNumber;
        } else {
            if (this.currentOperation == 'C' || this.currentOperation == 'Del' || this.currentOperation == '%') {
                this.currentOperation = '';
            }
            const currentStringNumber = String(this.currentNumber);
            const stringNumber = String(num);
            const resultString = currentStringNumber + stringNumber;
            this.currentNumber = Number(resultString);
            this.displayNumber = this.currentNumber;
            this.result = this.currentNumber;
        }
    }

    setOperation(operation: string) {
        switch (operation) {
            case 'C':
                this.currentNumber = 0;
                this.result = 0;
                this.displayNumber = 0;
                break;
            case 'Del':
                if (this.newNumberTrigger) {
                    let stringNum = String(this.result);
                    stringNum = stringNum.substring(0, stringNum.length - 1);
                    this.result = Number(stringNum);
                    this.displayNumber = this.result;
                } else {
                    let stringNum = String(this.currentNumber);
                    stringNum = stringNum.substring(0, stringNum.length - 1);
                    this.currentNumber = Number(stringNum);
                    this.result = this.currentNumber;
                    this.displayNumber = this.result;
                }
                break;
            case '%':
                if (this.newNumberTrigger) {
                    this.result = (this.currentNumber / this.result) * 100;
                    this.displayNumber = this.result;
                    this.newNumberTrigger = false;
                } else {
                    this.currentNumber = this.currentNumber / 100;
                    this.result = this.currentNumber;
                    this.currentNumber = this.result;
                }
                break;
            case '+':
            case 'X':
            case '-':
            case '/':
                this.newNumberTrigger = true;
                if (this.result !== 0) {
                    this.currentNumber = 0;
                }
                if (this.currentOperation !== '') {
                    this.getValue();
                    this.newNumberTrigger = true;
                }
                break;
        }
        this.currentOperation = operation;
    }

    getValue() {
        switch (this.currentOperation) {
            case '+':
                this.result =  this.result + this.currentNumber;
                break;
            case 'X':
                this.result = this.result * this.currentNumber;
                break;
            case '/':
                this.result = this.result / this.currentNumber;
                this.result = Number(this.result.toFixed(11));
                break;
            case '-':
                this.result = this.result - this.currentNumber;
                break;
        }
        this.currentNumber = this.result;
        this.displayNumber = this.result;
        this.newNumberTrigger = false;
        this.currentOperation = '';
    }
}
