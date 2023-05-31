class Calculator {
  constructor(previousOperand, currentOperand) {
    this.previousOperand = previousOperand
    this.currentOperand = currentOperand
    this.clear()
  }

  clear() {
    this.currentOperation = '';
    this.previousOperation = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperation = this.currentOperation.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperation.includes('.')) return;
    this.currentOperation = this.currentOperation.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperation === '') return;
    if (this.previousOperation !== '') {
      this.compute()
    } 
    this.operation = operation
    this.previousOperation = this.currentOperation
    this.currentOperation = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperation)
    const current = parseFloat(this.currentOperation)
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+': 
        computation = prev + current
        break
      case '-': 
        computation = prev - current
        break
      case '*': 
        computation = prev * current
        break
      case '÷': 
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperation = computation
    this.operation = undefined
    this.previousOperation = ''
  }

  getDisplayNum(number) {
    const stringNumber = number.toString()
    const integerDigit = parseFloat(stringNumber.split('.')[0])
    const decimalDigit = stringNumber.split('.')[1]
    let integerDisplay 
    if (isNaN(integerDigit)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigit.toLocaleString('en', {maximumFractionDigits: 0})
    }
    if (decimalDigit != null) {
      return `${integerDisplay}.${decimalDigit}`
    } else {
      return integerDisplay
    }
    // const floatNumber = parseFloat(number)
    // if (isNaN(floatNumber)) return '';
    // return floatNumber.toLocaleString('en');
  }

  updateDisplay() {
    this.currentOperand.innerText = this.getDisplayNum(this.currentOperation)
    if (this.operation != null) {
      this.previousOperand.innerText = 
      `${this.getDisplayNum(this.previousOperation)} ${this.operation}`
    } else {
      this.previousOperand.innerText = ''
    }
  }
}


const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const clearBtn = document.querySelector('[data-all-clear]');
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');
const calculator = new Calculator(previousOperand, currentOperand)

numberBtns.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationBtns.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsBtn.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})

clearBtn.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteBtn.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})