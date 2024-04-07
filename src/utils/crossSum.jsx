
export function calculateCrossSum(number) {
    let sum = 0;
    // Check for negative numbers
    if (number < 0) {
        number *= -1; // Make number positive
    }
    // Handle the case when number is 0 separately to avoid an infinite loop
    if (number === 0) {
        return 0;
    }
    while (number > 0) {
        sum += number % 10; // Add the last digit to the sum
        number = Math.floor(number / 10); // Remove the last digit from the number
    }
    // Recursively call the function if the sum is greater than 9 to reduce it to a single digit
    if (sum > 9) {
        return calculateCrossSum(sum);
    }
    return sum;
}
