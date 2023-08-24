const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      if (!file) {
        reject('No file selected')
      }
      fileReader?.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

   const addCommasToNumber = (number: number) => {
    // Convert the number to a string
    const numStr = number.toString();
  
    // Split the number into integer and decimal parts
    const parts = numStr.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1] || '';
  
    // Add commas to the integer part
    const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    // Combine the integer and decimal parts
    const numberWithCommas = decimalPart ? `${integerWithCommas}.${decimalPart}` : integerWithCommas;
  
    return numberWithCommas;
  }

export {
    convertToBase64,
    addCommasToNumber
}
