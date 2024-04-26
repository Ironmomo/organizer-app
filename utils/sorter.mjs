/**
* **Pure Function**
* Sorts an array using the provided sort function.
* @param {Array} array - The array to be sorted.
* @param {Function} sortFunction - The function used to determine the order of elements. It should return a negative value if the first argument should come before the second, a positive value if the first argument should come after the second, and zero if they are equal.
* @returns {Array} - A new array with the elements sorted according to the specified sort function.
*/
export default function sortArray(array, sortFunction) {
    return [...array].sort(sortFunction)
}