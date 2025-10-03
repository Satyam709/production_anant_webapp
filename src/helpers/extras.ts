/**
 * Generates an email address for a student using their roll number and the institutional domain.
 *
 * @param roll_number - The student's roll number used as the email prefix
 * @returns The complete email address in the format: rollnumber@nitkkr.ac.in
 * If the roll number is invalid, returns an empty string.
 */
export function getMail(roll_number: string): string {
  if (!isRollNumberValid(roll_number)) {
    return "";
  }
  const domain = "nitkkr.ac.in";
  return `${roll_number}@${domain}`;
}

/**
 * Validates if a given roll number adheres to the expected format.
 * Currently, it checks if the roll number consists of exactly 9 digits.
 *
 * @param roll_number - The roll number string to validate.
 * @returns True if the roll number is valid, otherwise false.
 */
export function isRollNumberValid(roll_number: string): boolean {
    // 9 digit roll number
    const regex = /^\d{9}$/;
    return regex.test(roll_number);
}