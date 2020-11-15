export default {
    shuffleArray(array) {
        let counter = array.length;
        let temp = null;
        let index = null;
        while (counter > 0) {
          index = Math.floor(Math.random() * counter);
          counter--;
          temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
        }
        return array;
    },
}