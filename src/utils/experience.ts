/**
 * Calculate years of experience dynamically
 * Started professional journey on November 26, 2014
 */
export function calculateExperience(): number {
  const startDate = new Date('2014-11-26'); // Career start date
  const currentDate = new Date();
  
  const yearsDiff = currentDate.getFullYear() - startDate.getFullYear();
  const monthsDiff = currentDate.getMonth() - startDate.getMonth();
  const daysDiff = currentDate.getDate() - startDate.getDate();
  
  // Calculate exact years and round to nearest integer
  let totalYears = yearsDiff;
  if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
    totalYears--;
  }
  
  return Math.abs(totalYears);
}

/**
 * Get formatted experience string
 */
export function getExperienceText(): string {
  const years = calculateExperience();
  return `${years}+ Years`;
}

/**
 * Get total experience including internship (6 months before career start)
 */
export function getTotalExperience(): number {
  return calculateExperience() + 0.5; // Add 6 months internship
}
