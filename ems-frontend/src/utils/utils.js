
function addHyphenToPhoneNumber(phoneNumber) {
  const length = phoneNumber.length;

  if(length >= 9) {
      let numbers = phoneNumber.replace(/[^0-9]/g, "")
            .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
      return numbers
  }
}

export { addHyphenToPhoneNumber };
