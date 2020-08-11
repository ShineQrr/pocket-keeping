import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export class NumberValidation extends Vue {
    // validateDecimalPoint() 用于校验：1、小数点后最后2位；2、只能有一个小数点
    validateDecimalPoint(currentOutput: string, input: string) {
        return currentOutput.includes(".") && (input === "." || currentOutput.split(".")[1].length === 2)
    }

    // validateInputWithPlus（）用于output存在"+"时校验
    // 如果符合返回true, 否则返回false
    validateInputWithPlus(currentOutput: string, currentInput: string) {
        const toValidateElements = currentOutput.split("+");
        toValidateElements.some(item => {
            return this.validateDecimalPoint(item, currentInput)
        })

    }

    validateInputWithSubtraction(currentOutput: string, currentInput: string) {
        const toValidateElements = currentOutput.split("-");
        for (let index = 0; index < toValidateElements.length; index++) {
            if (this.validateDecimalPoint(toValidateElements[index], currentInput)) {
                return true;
            } else {
                return false;
            }

        }
    }
}
export default NumberValidation;
